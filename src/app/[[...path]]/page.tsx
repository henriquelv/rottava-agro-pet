import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, PawPrint, ShoppingBag, Truck } from "@/components/icons";
import { getSession } from "@/lib/auth";
import { db, getProduct, hasDatabase, listProducts } from "@/lib/db";
import { demoMode, integrations, store } from "@/lib/config";
import { money, dateTime } from "@/lib/format";
import { ProductBuy, ProductCard, CartView, CheckoutView, ChatView, FavoritesView } from "@/components/storefront";
import { AuthForm } from "@/components/auth-forms";
import { AccountNav } from "@/components/account-nav";
import { AdminShell } from "@/components/admin-shell";
import { ConfigNotice, EmptyState, PageHero, Status } from "@/components/ui";
import { CatalogFilters, type CatalogFacet } from "@/components/catalog-filters";
import { CommerceAgent } from "@/components/commerce-agent";
import { GlyphPortalHero } from "@/components/glyph-portal-hero";
import { Reveal } from "@/components/motion-ui";
import { ProductDetails, ProductGallery } from "@/components/product-experience";

type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const segments = (await params).path || [];
  if (segments[0] === "produto" && segments[1]) {
    const product = await getProduct(segments[1]);
    if (product) return { title: product.name, description: product.description || `Conheça ${product.name} na Rottava.`, keywords: [product.brand, product.category_name, ...(product.metadata?.tags ?? [])].filter((item): item is string => Boolean(item)), alternates: { canonical: `/produto/${product.slug}` }, openGraph: { title: product.name, description: product.description || `Conheça ${product.name} na Rottava.`, images: product.images.length ? product.images : undefined, type: "website" } };
  }
  const titles: Record<string, string> = { produtos: "Produtos", favoritos: "Favoritos", "banho-e-tosa": "Banho e tosa", atendimento: "Atendimento", loja: "Nossa loja", entrar: "Entrar" };
  return { title: titles[segments[0] || ""] || undefined, alternates: { canonical: `/${segments.join("/")}` } };
}

export default async function RouterPage({ params, searchParams }: Props) {
  const segments = (await params).path || []; const path = "/" + segments.join("/"); const query = await searchParams; const session = await getSession();
  if (path === "/") return <Home signedIn={Boolean(session)} />;
  if (path === "/produtos") return <Catalog search={typeof query.busca === "string" ? query.busca : ""} category={typeof query.categoria === "string" ? query.categoria : ""} brand={typeof query.marca === "string" ? query.marca : ""} sort={typeof query.ordem === "string" ? query.ordem : ""} minPrice={typeof query.precoMin === "string" ? query.precoMin : ""} maxPrice={typeof query.precoMax === "string" ? query.precoMax : ""} available={query.disponivel === "1"} productType={typeof query.tipo === "string" ? query.tipo : ""} lifeStage={typeof query.fase === "string" ? query.fase : ""} size={typeof query.porte === "string" ? query.porte : ""} need={typeof query.necessidade === "string" ? query.necessidade : ""} page={typeof query.pagina === "string" ? Number(query.pagina) || 1 : 1} />;
  if (path === "/favoritos") { const products = await listProducts(); return <SimplePage eyebrow="SUA CURADORIA" title="Favoritos" text="Uma seleção guardada neste dispositivo para você retomar quando quiser."><FavoritesView products={products} /></SimplePage>; }
  if (segments[0] === "produto" && segments[1]) return <ProductPage slug={segments[1]} />;
  if (path === "/carrinho") return <SimplePage eyebrow="SUA SELEÇÃO" title="Carrinho" text="Revise cada escolha antes de seguir."><CartView signedIn={Boolean(session)} /></SimplePage>;
  if (path === "/checkout") { if (!session) redirect("/entrar?retorno=/checkout"); return <SimplePage eyebrow="COMPRA SEGURA" title="Finalizar pedido" text="Tudo claro, revisável e confirmado no servidor."><CheckoutView /></SimplePage>; }
  if (path === "/banho-e-tosa") return <Services />;
  if (path === "/atendimento") return <ChatPage />;
  if (path === "/entrar") return <AuthForm mode="login" />;
  if (path === "/cadastro") return <AuthForm mode="register" />;
  if (path === "/recuperar-senha") return <AuthForm mode="reset" />;
  if (path === "/loja") return <StorePage />;
  if (segments[0] === "informacoes") return <PolicyPage slug={segments[1] || "informacoes"} />;
  if (segments[0] === "minha-conta") { if (!session) redirect(`/entrar?retorno=${encodeURIComponent(path)}`); return <AccountPage path={path} session={session} segments={segments} />; }
  if (segments[0] === "pedido" && segments[1]) { if (!session) redirect("/entrar"); return <OrderConfirmation id={segments[1]} sessionId={session.sub} />; }
  if (segments[0] === "agendar") { if (!session) redirect("/entrar?retorno=/agendar"); return <AccountPage path="/minha-conta/agendamentos" session={session} segments={["minha-conta", "agendamentos"]} booking />; }
  if (segments[0] === "admin") { if (!session) redirect(`/entrar?retorno=${encodeURIComponent(path)}`); if (!["operator","attendant","services","finance","manager"].includes(session.role)) return <NoPermission />; return <AdminPage path={path} role={session.role} />; }
  if (segments[0] === "entregador") { if (!session) redirect("/entrar?retorno=/entregador"); if (!["driver","manager"].includes(session.role)) return <NoPermission />; return <DriverPage path={path} />; }
  if (path === "/sem-permissao") return <NoPermission />;
  notFound();
}

function SimplePage({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children: React.ReactNode }) { return <div className="page-wrap"><PageHero eyebrow={eyebrow} title={title} text={text} />{children}</div>; }

async function Home({ signedIn }: { signedIn: boolean }) {
  const products = await listProducts();
  const count = (pet: "cao" | "gato" | "geral") => products.filter((product) => product.metadata?.pet === pet).length;
  const brands = [...new Set(products.map((product) => product.brand).filter((brand): brand is string => Boolean(brand) && brand !== "MARCA NÃO IDENTIFICADA"))];
  return <>
    <GlyphPortalHero />
    <CommerceAgent products={products} signedIn={signedIn} />
    <Reveal><section className="category-journal" aria-labelledby="home-categories-title"><header><span className="eyebrow">ESCOLHA PELO UNIVERSO</span><h2 id="home-categories-title">Cada rotina pede<br /><em>um tipo de cuidado.</em></h2><p>Entre pelo contexto. Os resultados continuam vindo do mesmo catálogo que alimenta a busca e a assistente.</p></header><div className="category-collage">
      <Link className="category-photo category-photo-pet" href="/produtos?categoria=caes"><Image src="/images/hero-rottava.png" fill sizes="(max-width: 760px) 100vw, 50vw" alt="Cão e gato em uma casa com plantas" /><span><small>01 · COMPANHEIROS</small><b>Cães</b><i>{count("cao")} itens no catálogo</i></span></Link>
      <Link className="category-photo category-photo-care" href="/produtos?categoria=gatos"><Image src="/images/demo/sache-editorial.webp" fill sizes="(max-width: 760px) 50vw, 25vw" alt="Alimentação preparada para gatos" /><span><small>02 · ROTINA FELINA</small><b>Gatos</b><i>{count("gato")} itens</i></span></Link>
      <Link className="category-photo category-photo-garden" href="/produtos?categoria=pet-em-geral"><Image src="/images/demo/racao-detalhe.webp" fill sizes="(max-width: 760px) 50vw, 25vw" alt="Detalhe de produtos para a rotina dos animais" /><span><small>03 · DIA A DIA</small><b>Pet em geral</b><i>{count("geral")} itens</i></span></Link>
      <Link className="category-type" href="/banho-e-tosa"><small>04 · SERVIÇO</small><b>Banho<br />& tosa</b><ArrowRight aria-hidden="true" /></Link>
      <Link className="category-type category-type-dark" href="#assistente"><small>05 · ESCOLHA ASSISTIDA</small><b>Não sabe<br />por onde ir?</b><span>Volte à conversa e compare sem precisar decorar filtros.</span><ArrowRight aria-hidden="true" /></Link>
    </div></section></Reveal>
    {brands.length > 0 && <section className="partner-ribbon" aria-label="Marcas presentes no catálogo"><div className="partner-ribbon-heading"><span>MARCAS PRESENTES NO CATÁLOGO</span><p>Passe o mouse para pausar. Selecione uma marca para ver seus produtos.</p></div><div className="partner-ribbon-window"><div className="partner-ribbon-track">{[0, 1].map((copy) => <div className="partner-ribbon-set" aria-hidden={copy === 1} key={copy}>{brands.map((brand) => <Link key={`${copy}-${brand}`} href={`/produtos?marca=${encodeURIComponent(brand)}`}>{brand}<span aria-hidden="true">↗</span></Link>)}</div>)}</div></div></section>}
  </>;
}

async function Catalog({ search, category, brand, sort, minPrice, maxPrice, available, productType, lifeStage, size, need, page }: { search: string; category: string; brand: string; sort: string; minPrice: string; maxPrice: string; available: boolean; productType: string; lifeStage: string; size: string; need: string; page: number }) {
  const allProducts = await listProducts(); const products = await listProducts(search, { category, brand, sort, minPrice: Number(minPrice) || undefined, maxPrice: Number(maxPrice) || undefined, available, productType, lifeStage, size, need });
  const toSlug = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-");
  const categories = [...new Set(allProducts.map((item) => item.category_name).filter(Boolean))].map((label) => ({ label, value: toSlug(label!), count: allProducts.filter((item) => item.category_name === label).length })) as CatalogFacet[];
  const brands = [...new Set(allProducts.map((item) => item.brand).filter(Boolean))].map((label) => ({ label, value: label!, count: allProducts.filter((item) => item.brand === label).length })) as CatalogFacet[];
  const facet = (key: "productType" | "lifeStage" | "size", labels: Record<string, string>) => [...new Set(allProducts.map((item) => item.metadata?.[key]).filter(Boolean))].map((value) => ({ value: value!, label: labels[value!] || value!, count: allProducts.filter((item) => item.metadata?.[key] === value).length })) as CatalogFacet[];
  const types = facet("productType", { racao: "Ração seca", sache: "Alimento úmido", petisco: "Petiscos", outros: "Outros", "comedouro-bebedouro": "Comedouros" });
  const stages = facet("lifeStage", { filhote: "Filhote", adulto: "Adulto", senior: "Sênior" });
  const sizes = facet("size", { pequeno: "Porte pequeno", medio: "Porte médio", grande: "Porte grande" });
  const needValues = [...new Set(allProducts.flatMap((item) => item.metadata?.needs ?? []))];
  const needs = needValues.map((value) => ({ value, label: ({ "controle-de-peso": "Controle de peso" } as Record<string,string>)[value] || value, count: allProducts.filter((item) => item.metadata?.needs?.includes(value)).length })) as CatalogFacet[];
  const prices = allProducts.map((product) => product.min_price_cents).filter((price): price is number => price != null);
  const priceBounds = prices.length ? { min: Math.floor(Math.min(...prices) / 100), max: Math.ceil(Math.max(...prices) / 100) } : undefined;
  const pageSize = 24; const pageCount = Math.max(1, Math.ceil(products.length / pageSize)); const currentPage = Math.min(Math.max(1, page), pageCount); const visibleProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageHref = (target: number) => { const params = new URLSearchParams(); Object.entries({ busca: search, categoria: category, marca: brand, ordem: sort, precoMin: minPrice, precoMax: maxPrice, tipo: productType, fase: lifeStage, porte: size, necessidade: need }).forEach(([key,value]) => { if (value) params.set(key,value); }); if (available) params.set("disponivel","1"); if (target > 1) params.set("pagina",String(target)); return `/produtos${params.size ? `?${params}` : ""}`; };
  return <div className="page-wrap catalog-page"><nav className="catalog-breadcrumb" aria-label="Navegação estrutural"><Link href="/">Início</Link><span>/</span><span>Produtos</span></nav><PageHero eyebrow="CATÁLOGO" title={search ? `Resultados para “${search}”` : "Escolha pelo que a rotina pede."} text="Compare opções, pesos e preços usando informações do catálogo da loja." actions={<form action="/produtos" className="catalog-search"><label className="sr-only" htmlFor="catalog-search">Buscar produto ou marca</label><input id="catalog-search" name="busca" defaultValue={search} placeholder="Produto, marca, sabor ou peso…" autoComplete="off" /><button className="button primary">Buscar</button></form>} /><div className="catalog-layout"><CatalogFilters brands={brands} categories={categories} types={types} stages={stages} sizes={sizes} needs={needs} total={products.length} priceBounds={priceBounds} />{products.length ? <><div className="product-grid catalog-grid">{visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div>{pageCount > 1 && <nav className="catalog-pagination" aria-label="Paginação do catálogo"><Link className={currentPage === 1 ? "disabled" : ""} aria-disabled={currentPage === 1} href={pageHref(Math.max(1,currentPage - 1))}>Anterior</Link><span>Página <b>{currentPage}</b> de {pageCount}</span><Link className={currentPage === pageCount ? "disabled" : ""} aria-disabled={currentPage === pageCount} href={pageHref(Math.min(pageCount,currentPage + 1))}>Próxima <ArrowRight /></Link></nav>}</> : <div className="catalog-empty"><EmptyState title="Nada por aqui ainda" text="Remova um filtro ou use outro termo para voltar aos produtos disponíveis." action={{ href: "/produtos", label: "Limpar filtros" }} /></div>}</div></div>;
}

async function ChatPage() { const products = await listProducts(); return <SimplePage eyebrow="ORIENTAÇÃO COM O CATÁLOGO DA LOJA" title="Como podemos cuidar hoje?" text="Pergunte, compare e monte o carrinho com informações dos mesmos produtos usados no restante do site."><ChatView products={products} /></SimplePage>; }

async function ProductPage({ slug }: { slug: string }) {
  const product = await getProduct(slug); if (!product) notFound();
  const related = (await listProducts()).filter((item) => item.id !== product.id && item.category_name === product.category_name).slice(0, 4);
  const inStock = product.variants.some((variant) => variant.stock_quantity == null || variant.stock_quantity > 0);
  const schema = { "@context": "https://schema.org", "@type": "Product", name: product.name, image: product.images, description: product.description, sku: product.variants[0]?.sku, brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined, aggregateRating: product.demo?.rating ? { "@type": "AggregateRating", ratingValue: product.demo.rating, reviewCount: product.demo.reviewsCount } : undefined, offers: product.min_price_cents == null ? undefined : { "@type": "Offer", priceCurrency: "BRL", price: (product.min_price_cents / 100).toFixed(2), availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } };
  const details = [
    { title: "Sobre o produto", content: product.description || "A descrição detalhada ainda está sendo revisada pela loja." },
    { title: "Disponibilidade", content: "O carrinho não reserva estoque. Preço, opção e disponibilidade são revalidados quando o pedido é criado." },
    { title: "Retirada & entrega", content: "A retirada acontece depois da confirmação da loja. A entrega aparece somente quando houver cobertura e cotação válidas." },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll("<", "\\u003c") }} /><div className="product-breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href="/produtos">Produtos</Link><span>/</span><span>{product.name}</span></div><div className="product-page"><ProductGallery product={product} /><div className="product-info"><span className="eyebrow">{product.category_name || "PRODUTO"}{product.brand && ` · ${product.brand}`}</span>{product.demo?.rating && <div className="product-rating" aria-label={`Avaliação demonstrativa ${product.demo.rating} de 5`}><b>{product.demo.rating.toFixed(1)} / 5</b><small>{product.demo.reviewsCount} avaliações demonstrativas</small></div>}<h1>{product.name}</h1><p className="product-lead">{product.description || "As informações detalhadas deste produto ainda estão sendo revisadas pela loja."}</p><ProductBuy product={product} /><ProductDetails details={details} /></div></div>{related.length > 0 && <section className="related-products"><div className="section-heading"><div><span className="eyebrow">NA MESMA ROTINA</span><h2>Continue escolhendo.</h2></div><Link className="text-link" href="/produtos">Ver catálogo <ArrowRight aria-hidden="true" /></Link></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</>;
}

function Services() { return <><section className="services-hero"><div><span className="eyebrow">BANHO & TOSA ROTTAVA</span><h1>Um cuidado organizado do pedido à volta para casa.</h1><p>Envie as informações do seu pet. A equipe confirma serviço, valor e horário antes do agendamento.</p><div className="hero-actions"><Link className="button primary" href="/agendar">Solicitar horário <ArrowRight /></Link><Link className="button secondary" href="/atendimento">Tirar uma dúvida</Link></div><div className="service-proof"><span><b>01</b> Solicitação simples</span><span><b>02</b> Confirmação da equipe</span><span><b>03</b> Status na sua conta</span></div></div><div className="service-hero-media"><Image src="/images/demo/cama-editorial.webp" fill priority sizes="(max-width: 760px) 100vw, 42vw" alt="Espaço calmo e confortável para o cuidado do pet" /><span>ATENDIMENTO COM CONFIRMAÇÃO</span></div></section><section className="care-steps">{[["01","Conte sobre o seu pet","Cadastre as informações úteis para um atendimento cuidadoso."],["02","Escolha o cuidado","Serviços, duração e valores aparecem somente quando configurados."],["03","Confirme o horário","A equipe valida capacidade antes de confirmar sua agenda."],["04","Acompanhe tudo","O status fica registrado na sua conta."]].map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</section><div className="page-wrap narrow"><ConfigNotice>Os serviços, preços, durações, recursos e políticas de cancelamento ainda dependem de aprovação da loja. É possível solicitar atendimento, mas nenhum valor ou horário é prometido sem essa configuração.</ConfigNotice></div></>; }

function StorePage() { const ready = store.address && store.hours && store.phone; return <div className="page-wrap"><PageHero eyebrow="NOSSO LUGAR EM CAÇADOR" title="Perto para fazer a diferença." text="Encontre informações oficiais da loja, horários e os canais de atendimento." />{ready ? <div className="store-grid"><div><MapPin /><h2>{store.address}</h2><p>{store.city} · {store.state}</p></div><div><Clock3 /><h2>{store.hours}</h2><p>{store.phone}</p></div></div> : <EmptyState title="Dados da loja em revisão" text="Endereço, telefone e horário oficiais ainda precisam ser fornecidos e aprovados. Não publicamos dados de exemplo." action={{ href: "/atendimento", label: "Abrir atendimento" }} />}</div>; }

function PolicyPage({ slug }: { slug: string }) { const labels: Record<string,string> = { privacidade: "Privacidade", entregas: "Entregas e retirada", cancelamentos: "Cancelamentos", pagamentos: "Pagamentos", servicos: "Serviços" }; return <div className="page-wrap narrow"><PageHero eyebrow="INFORMAÇÕES DA LOJA" title={labels[slug] || "Informações"} text="Conteúdo versionado e aprovado pela operação." /><EmptyState title="Política ainda não publicada" text="Este texto comercial ou jurídico depende de revisão do responsável da loja. Nenhum prazo, direito ou condição será inventado." action={{ href: "/loja", label: "Voltar para a loja" }} /></div>; }

async function AccountPage({ path, session, booking = false }: { path: string; session: NonNullable<Awaited<ReturnType<typeof getSession>>>; segments: string[]; booking?: boolean }) {
  const sql = hasDatabase() ? db() : null; const is = (value: string) => path === value;
  let content: React.ReactNode;
  if (is("/minha-conta")) {
    const orders = sql ? await sql`SELECT * FROM orders WHERE account_id=${session.sub} ORDER BY created_at DESC LIMIT 1` : [];
    content = <><div className="account-title"><span className="eyebrow">OLÁ, {session.name.split(" ")[0].toUpperCase()}</span><h1>Sua rotina, em um só lugar.</h1></div><div className="account-cards"><Link href="/minha-conta/pedidos"><ShoppingBag /><span>Pedidos</span><b>{orders.length ? `#${orders[0].number}` : "Comece uma compra"}</b></Link><Link href="/minha-conta/agendamentos"><CalendarDays /><span>Cuidados</span><b>Ver agendamentos</b></Link><Link href="/minha-conta/pets"><PawPrint /><span>Companheiros</span><b>Meus pets</b></Link></div></>;
  } else if (is("/minha-conta/pedidos")) {
    const orders = sql ? await sql`SELECT * FROM orders WHERE account_id=${session.sub} ORDER BY created_at DESC` : [];
    content = <SectionTitle title="Meus pedidos" text="Compras do site e dos canais vinculados." />;
    content = <>{content}{orders.length ? <div className="record-list">{orders.map((o) => <Link href={`/minha-conta/pedidos/${o.id}`} key={o.id}><div><span>Pedido #{o.number}</span><b>{dateTime(o.created_at)}</b></div><Status>{String(o.operational_state).replaceAll("_", " ")}</Status><strong>{money(o.total_cents)}</strong><ArrowRight /></Link>)}</div> : <EmptyState title="Você ainda não tem pedidos" text="Quando fizer sua primeira compra, ela aparecerá aqui." action={{ href: "/produtos", label: "Explorar produtos" }} />}</>;
  } else if (is("/minha-conta/pets")) {
    const pets = sql ? await sql`SELECT * FROM pets WHERE account_id=${session.sub} AND archived_at IS NULL ORDER BY created_at` : [];
    content = <><SectionTitle title="Meus pets" text="Informações úteis para um cuidado mais atento." /><ConfigNotice>O cadastro de pets será liberado junto da configuração dos serviços. Seus dados não serão usados para diagnóstico.</ConfigNotice>{pets.length ? <div className="account-cards">{pets.map((p) => <div key={p.id}><PawPrint /><span>{p.species}</span><b>{p.name}</b></div>)}</div> : null}</>;
  } else if (is("/minha-conta/enderecos")) content = <><SectionTitle title="Endereços" text="Locais salvos para cotação e entrega." /><ConfigNotice>A entrega ainda não possui cobertura e regra de frete aprovadas. Cadastros serão habilitados depois dessa configuração.</ConfigNotice></>;
  else if (is("/minha-conta/agendamentos") || booking) content = <><SectionTitle title={booking ? "Solicitar um horário" : "Meus agendamentos"} text="Banho e tosa com confirmação real de capacidade." /><ConfigNotice>A agenda online aguarda serviços, duração, capacidade e políticas definidos pela loja. Use o atendimento para registrar seu interesse sem promessa de horário.</ConfigNotice><Link className="button secondary" href="/atendimento">Solicitar pelo atendimento</Link></>;
  else if (is("/minha-conta/dados")) content = <><SectionTitle title="Dados e segurança" text="Sua identidade e os vínculos da conta." /><div className="profile-card"><UserRow label="Nome" value={session.name} /><UserRow label="E-mail" value={session.email} /><UserRow label="Segurança" value="Sessão protegida por cookie seguro" /></div></>;
  else if (path.includes("/pedidos/")) return <OrderDetail id={path.split("/")[3]} accountId={session.sub} />;
  else content = <EmptyState title="Em preparação" text="Esta área depende de uma configuração operacional." />;
  return <div className="account-layout"><AccountNav /><section className="account-content">{content}</section></div>;
}

function SectionTitle({ title, text }: { title: string; text: string }) { return <div className="section-title"><h1>{title}</h1><p>{text}</p></div>; }
function UserRow({ label, value }: { label: string; value: string }) { return <div><span>{label}</span><b>{value}</b></div>; }

async function OrderDetail({ id, accountId }: { id: string; accountId: string }) {
  if (!hasDatabase()) return <EmptyState title="Banco não conectado" text="Não foi possível consultar este pedido." />;
  const sql = db(); const [order] = await sql`SELECT * FROM orders WHERE id=${id} AND account_id=${accountId}`; if (!order) return <NoPermission />;
  const items = await sql`SELECT * FROM order_items WHERE order_id=${id}`;
  return <div className="page-wrap narrow"><Link className="back-link" href="/minha-conta/pedidos">← Meus pedidos</Link><div className="order-heading"><div><span className="eyebrow">PEDIDO #{order.number}</span><h1>{money(order.total_cents)}</h1><p>{dateTime(order.created_at)}</p></div><div><Status tone="warn">{String(order.operational_state).replaceAll("_", " ")}</Status><Status>{String(order.payment_state).replaceAll("_", " ")}</Status></div></div><div className="order-items">{items.map((item) => <div key={item.id}><div><b>{item.name_snapshot}</b><span>{item.variant_snapshot} · {item.quantity} un.</span></div><strong>{money(item.line_total_cents)}</strong></div>)}</div><ConfigNotice>Pedido recebido. Aguarde a confirmação de disponibilidade da loja. O pagamento e a situação operacional são controlados separadamente.</ConfigNotice></div>;
}

async function OrderConfirmation({ id, sessionId }: { id: string; sessionId: string }) {
  if (id.startsWith("demo-")) return <div className="page-wrap narrow"><div className="demo-confirm"><CheckCircle2 /><span className="eyebrow">PEDIDO DEMONSTRATIVO</span><h1>Fluxo concluído.</h1><p>O pedido de teste foi criado uma única vez. Nenhuma cobrança, reserva ou comunicação real foi realizada.</p><div><Status tone="warn">aguardando disponibilidade</Status><Status>presencial a receber</Status></div><Link className="button primary" href="/produtos">Continuar testando <ArrowRight /></Link></div></div>;
  return <OrderDetail id={id} accountId={sessionId} />;
}

async function AdminPage({ path, role }: { path: string; role: string }) {
  const sql = hasDatabase() ? db() : null; let content: React.ReactNode;
  if (path === "/admin") {
    const [metrics] = sql ? await sql`SELECT count(*)::int total, count(*) FILTER (WHERE operational_state='aguardando_disponibilidade')::int pending FROM orders` : [{ total: demoMode ? 12 : 0, pending: demoMode ? 4 : 0 }];
    content = <><AdminTitle eyebrow="OPERAÇÃO EM TEMPO REAL" title="Bom trabalho. O que precisa de atenção?" /><div className="metric-grid"><article><span>Pedidos a validar</span><strong>{metrics.pending}</strong><small>Disponibilidade pendente</small></article><article><span>Pedidos registrados</span><strong>{metrics.total}</strong><small>Histórico persistente</small></article><article><span>Integrações ativas</span><strong>{Object.values(integrations).filter(Boolean).length}/{Object.keys(integrations).length}</strong><small>Veja os conectores</small></article></div><AdminReadiness /></>;
  } else if (path === "/admin/integracoes") content = <><AdminTitle eyebrow="SAÚDE DO SISTEMA" title="Integrações e reconciliação" /><div className="integration-list">{Object.entries(integrations).map(([name, active]) => <div key={name}><span className={active ? "dot active" : "dot"} /><div><b>{name}</b><small>{active ? "Configurada" : "Aguardando credenciais e homologação"}</small></div><Status tone={active ? "ok" : "warn"}>{active ? "Ativa" : "Pendente"}</Status></div>)}</div></>;
  else if (path === "/admin/pedidos") {
    const orders = sql ? await sql`SELECT o.*,a.name customer_name FROM orders o JOIN accounts a ON a.id=o.account_id ORDER BY o.created_at DESC LIMIT 100` : demoMode ? [{ id:"demo-order", number:1042, customer_name:"Cliente Demonstração", operational_state:"em_separacao", payment_state:"presencial_a_receber", total_cents:17670 }] : [];
    content = <><AdminTitle eyebrow="FILA OPERACIONAL" title="Pedidos" />{orders.length ? <div className="admin-table"><div className="table-head"><span>Pedido</span><span>Cliente</span><span>Operação</span><span>Financeiro</span><span>Total</span></div>{orders.map((o) => <Link href={`/admin/pedidos/${o.id}`} key={o.id}><span>#{o.number}</span><b>{o.customer_name}</b><Status>{String(o.operational_state).replaceAll("_", " ")}</Status><Status>{String(o.payment_state).replaceAll("_", " ")}</Status><strong>{money(o.total_cents)}</strong></Link>)}</div> : <EmptyState title="Nenhum pedido na fila" text="Pedidos reais aparecerão aqui quando forem criados." />}</>;
  } else content = <><AdminTitle eyebrow="MÓDULO OPERACIONAL" title={AdminLabel(path)} /><ConfigNotice>Este módulo está pronto para receber dados, mas depende das definições comerciais ou da integração correspondente. Nenhum dado de demonstração é usado.</ConfigNotice><AdminReadiness /></>;
  return <AdminShell role={role}>{content}</AdminShell>;
}

function AdminTitle({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="admin-title"><span>{eyebrow}</span><h1>{title}</h1><p>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeZone: "America/Sao_Paulo" }).format(new Date())}</p></div>; }
function AdminLabel(path: string) { return ({ "/admin/catalogo":"Catálogo integrado", "/admin/frete":"Frete e cobertura", "/admin/entregas":"Despacho e entregas", "/admin/agenda":"Agenda de cuidados", "/admin/servicos":"Serviços e capacidade", "/admin/atendimento":"Central de atendimento", "/admin/clientes":"Clientes", "/admin/financeiro":"Financeiro e conciliação", "/admin/conteudo":"Conteúdo e identidade", "/admin/equipe":"Equipe e permissões", "/admin/configuracoes":"Configurações da operação" } as Record<string,string>)[path] || "Operação do pedido"; }
function AdminReadiness() { return <div className="readiness"><h2>Prontidão para operar</h2>{[["Banco transacional",integrations.database],["Assistente OpenAI",integrations.assistant],["Catálogo legado",integrations.legacy],["Pagamentos",integrations.payment],["WhatsApp",integrations.whatsapp],["Mapas",integrations.maps]].map(([label, ok]) => <div key={String(label)}><span>{ok ? <CheckCircle2 /> : <Clock3 />}{label}</span><b>{ok ? "Configurado" : "Pendente"}</b></div>)}</div>; }

function DriverPage({ path }: { path: string }) { return <div className="driver-shell"><header><span className="eyebrow">PORTAL DO ENTREGADOR</span><h1>{path === "/entregador" ? "Minhas entregas" : "Parada ativa"}</h1><Status tone="warn">Localização não iniciada</Status></header><EmptyState title="Nenhuma rota atribuída" text="Somente tarefas reais atribuídas ao entregador aparecem aqui. O rastreamento não simula posição e depende de permissão do dispositivo." action={{ href: "/loja", label: "Voltar para a loja" }} /><div className="driver-safety"><Truck /><div><b>Privacidade em primeiro lugar</b><p>O cliente recebe apenas a posição da entrega ativa; outras paradas e deslocamentos posteriores nunca são expostos.</p></div></div></div>; }
function NoPermission() { return <div className="page-wrap narrow"><EmptyState title="Acesso não autorizado" text="Sua conta não possui permissão para este conteúdo. Nenhum dado foi exibido." action={{ href: "/", label: "Voltar ao início" }} /></div>; }
