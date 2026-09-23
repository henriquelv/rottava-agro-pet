import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Bath, CalendarDays, CheckCircle2, Clock3, Leaf, MapPin, PackageCheck, PawPrint, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { getSession } from "@/lib/auth";
import { db, getProduct, hasDatabase, listProducts } from "@/lib/db";
import { demoMode, integrations, store } from "@/lib/config";
import { money, dateTime } from "@/lib/format";
import { ProductBuy, ProductCard, CartView, CheckoutView, ChatView } from "@/components/storefront";
import { AuthForm } from "@/components/auth-forms";
import { AccountNav } from "@/components/account-nav";
import { AdminShell } from "@/components/admin-shell";
import { ConfigNotice, EmptyState, PageHero, Status } from "@/components/ui";

type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function RouterPage({ params, searchParams }: Props) {
  const segments = (await params).path || []; const path = "/" + segments.join("/"); const query = await searchParams; const session = await getSession();
  if (path === "/") return <Home />;
  if (path === "/produtos") return <Catalog search={typeof query.busca === "string" ? query.busca : ""} category={typeof query.categoria === "string" ? query.categoria : ""} brand={typeof query.marca === "string" ? query.marca : ""} sort={typeof query.ordem === "string" ? query.ordem : ""} />;
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

async function Home() {
  const products = await listProducts();
  return <>
    <section className="home-hero"><Image src="/images/hero-rottava.png" fill priority alt="Cão e gato descansando juntos em uma varanda com jardim" /><div className="hero-shade" /><div className="home-copy"><span className="eyebrow">PET · CASA · JARDIM · CAÇADOR</span><h1>Um mundo inteiro de <em>cuidado</em>, logo ali.</h1><p>Escolhas para os seus companheiros e para a vida que vocês constroem juntos.</p><div className="hero-actions"><Link className="button light" href="/produtos">Ver produtos <ArrowRight /></Link><Link className="button glass" href="/banho-e-tosa">Conhecer cuidados</Link></div></div><div className="hero-caption"><span>ROTTAVA</span><p>Presença que acolhe.<br />Cuidado que acompanha.</p></div>
    </section>
    <section className="trust-strip"><span><ShieldCheck /> Compra identificada e protegida</span><span><PackageCheck /> Retirada e entrega própria</span><span><PawPrint /> Cuidado para cada fase</span></section>
    <section className="editorial"><div className="section-intro"><span className="eyebrow">ESCOLHAS COM INTENÇÃO</span><h2>Para o pet.<br /><i>Para a casa.</i><br />Para a vida.</h2><p>A Rottava reúne o essencial da rotina com uma curadoria próxima, prática e cuidadosa.</p><Link className="text-link" href="/produtos">Explorar catálogo <ArrowRight /></Link></div><div className="category-cards"><Link href="/produtos?categoria=pets"><span>01</span><PawPrint /><h3>Pet</h3><p>Alimentação, conforto e bem-estar.</p></Link><Link href="/produtos?categoria=casa"><span>02</span><Leaf /><h3>Casa & jardim</h3><p>Uma rotina mais viva, dentro e fora.</p></Link><Link href="/banho-e-tosa"><span>03</span><Bath /><h3>Cuidados</h3><p>Banho e tosa com atenção aos detalhes.</p></Link></div></section>
    <section className="featured"><div className="section-heading"><div><span className="eyebrow">NOVIDADES DA LOJA</span><h2>Escolhidos para fazer bem</h2></div><Link className="text-link" href="/produtos">Ver todos <ArrowRight /></Link></div>{products.length ? <div className="product-grid">{products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div> : <EmptyState title="A vitrine está sendo preparada" text="O catálogo real ainda não foi conectado ou publicado. Nenhum produto fictício será exibido." action={{ href: "/atendimento", label: "Falar com a loja" }} />}</section>
    <section className="service-banner"><div><span className="eyebrow">BANHO & TOSA</span><h2>Cuidado que se percebe no olhar.</h2><p>Solicite um horário e acompanhe cada etapa com tranquilidade.</p><Link className="button light" href="/banho-e-tosa">Conhecer o serviço <ArrowRight /></Link></div><div className="service-orbit"><span><Sparkles /></span><b>PELOS · PATAS · CARINHO</b></div></section>
  </>;
}

async function Catalog({ search, category, brand, sort }: { search: string; category: string; brand: string; sort: string }) {
  const products = await listProducts(search, { category, brand, sort }); const brands = [...new Set((await listProducts()).map((p) => p.brand).filter(Boolean))] as string[];
  const query = (cat = category) => `/produtos?${new URLSearchParams(Object.entries({ busca: search, categoria: cat, marca: brand, ordem: sort }).filter(([,v]) => v)).toString()}`;
  return <div className="page-wrap"><PageHero eyebrow="CATÁLOGO ROTTAVA" title={search ? `Resultados para “${search}”` : "Boas escolhas começam aqui."} text="Preços públicos, variações claras e disponibilidade confirmada antes do pedido." actions={<form action="/produtos" className="catalog-search"><input name="busca" defaultValue={search} placeholder="Buscar por produto ou marca" /><button className="button primary">Buscar</button></form>} />{demoMode && <p className="demo-caption">Catálogo demonstrativo — os nomes, marcas, preços e estoques abaixo servem apenas para testar a experiência.</p>}<div className="catalog-tools"><div className="filter-row"><Link className={!category ? "active" : ""} href={query("")}>Todos</Link><Link className={category === "pet" ? "active" : ""} href={query("pet")}>Pet</Link><Link className={category === "casa-jardim" ? "active" : ""} href={query("casa-jardim")}>Casa & jardim</Link><Link className={category === "cuidados" ? "active" : ""} href={query("cuidados")}>Cuidados</Link></div><form action="/produtos" className="catalog-selects"><input type="hidden" name="busca" value={search} /><input type="hidden" name="categoria" value={category} /><select name="marca" defaultValue={brand} aria-label="Filtrar por marca"><option value="">Todas as marcas</option>{brands.map((item) => <option key={item}>{item}</option>)}</select><select name="ordem" defaultValue={sort} aria-label="Ordenar produtos"><option value="">Relevância</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select><button>Aplicar</button></form></div><p className="result-count">{products.length} {products.length === 1 ? "produto" : "produtos"}</p>{products.length ? <div className="product-grid catalog-grid">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <EmptyState title="Nenhum produto encontrado" text="Tente combinar outros filtros ou limpe a busca." action={{ href: "/produtos", label: "Limpar filtros" }} />}</div>;
}

async function ChatPage() { const products = await listProducts(); return <SimplePage eyebrow="SITE E WHATSAPP, A MESMA LÓGICA" title="Como podemos cuidar hoje?" text="Atendimento guiado, com preços e ações vindos dos mesmos serviços da loja."><ChatView products={products.slice(0, 3)} /></SimplePage>; }

async function ProductPage({ slug }: { slug: string }) {
  const product = await getProduct(slug); if (!product) notFound();
  return <div className="product-page"><div className="product-info"><Link className="back-link" href="/produtos">← Voltar ao catálogo</Link><span className="eyebrow">{product.category_name || "PRODUTO"}{product.brand && ` · ${product.brand}`}</span><h1>{product.name}</h1><p>{product.description || "As informações detalhadas deste produto ainda estão sendo revisadas pela loja."}</p><ProductBuy product={product} /><div className="product-accordions"><details open><summary>Compra e disponibilidade</summary><p>O carrinho não reserva estoque. A loja confirma preço, variante e disponibilidade na criação do pedido.</p></details><details><summary>Entrega e retirada</summary><p>A retirada depende de confirmação. A entrega só é oferecida após uma cotação válida para o endereço.</p></details></div></div><div className="product-visual">{product.image_url ? <Image unoptimized src={product.image_url} alt={product.name} fill sizes="50vw" /> : <div className="large-placeholder"><span>R</span><p>Imagem em preparação</p></div>}</div></div>;
}

function Services() { return <><section className="services-hero"><div><span className="eyebrow">BANHO & TOSA ROTTAVA</span><h1>Leveza no pelo.<br /><em>Tranquilidade</em> para você.</h1><p>Uma jornada de cuidado organizada, do pedido de horário até a hora de voltar para casa.</p><div className="hero-actions"><Link className="button primary" href="/agendar">Solicitar horário <ArrowRight /></Link><Link className="button secondary" href="/atendimento">Tirar uma dúvida</Link></div></div><div className="care-seal"><Sparkles /><span>CUIDADO<br />DE PERTO</span></div></section><section className="care-steps">{[["01","Conte sobre o seu pet","Cadastre as informações úteis para um atendimento cuidadoso."],["02","Escolha o cuidado","Serviços, duração e valores aparecem somente quando configurados."],["03","Confirme o horário","A equipe valida capacidade antes de confirmar sua agenda."],["04","Acompanhe tudo","O status fica registrado na sua conta."]].map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</section><div className="page-wrap narrow"><ConfigNotice>Os serviços, preços, durações, recursos e políticas de cancelamento ainda dependem de aprovação da loja. É possível solicitar atendimento, mas nenhum valor ou horário é prometido sem essa configuração.</ConfigNotice></div></>; }

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
    content = <><AdminTitle eyebrow="OPERAÇÃO EM TEMPO REAL" title="Bom trabalho. O que precisa de atenção?" /><div className="metric-grid"><article><span>Pedidos a validar</span><strong>{metrics.pending}</strong><small>Disponibilidade pendente</small></article><article><span>Pedidos registrados</span><strong>{metrics.total}</strong><small>Histórico persistente</small></article><article><span>Integrações ativas</span><strong>{Object.values(integrations).filter(Boolean).length}/5</strong><small>Veja os conectores</small></article></div><AdminReadiness /></>;
  } else if (path === "/admin/integracoes") content = <><AdminTitle eyebrow="SAÚDE DO SISTEMA" title="Integrações e reconciliação" /><div className="integration-list">{Object.entries(integrations).map(([name, active]) => <div key={name}><span className={active ? "dot active" : "dot"} /><div><b>{name}</b><small>{active ? "Configurada" : "Aguardando credenciais e homologação"}</small></div><Status tone={active ? "ok" : "warn"}>{active ? "Ativa" : "Pendente"}</Status></div>)}</div></>;
  else if (path === "/admin/pedidos") {
    const orders = sql ? await sql`SELECT o.*,a.name customer_name FROM orders o JOIN accounts a ON a.id=o.account_id ORDER BY o.created_at DESC LIMIT 100` : demoMode ? [{ id:"demo-order", number:1042, customer_name:"Cliente Demonstração", operational_state:"em_separacao", payment_state:"presencial_a_receber", total_cents:17670 }] : [];
    content = <><AdminTitle eyebrow="FILA OPERACIONAL" title="Pedidos" />{orders.length ? <div className="admin-table"><div className="table-head"><span>Pedido</span><span>Cliente</span><span>Operação</span><span>Financeiro</span><span>Total</span></div>{orders.map((o) => <Link href={`/admin/pedidos/${o.id}`} key={o.id}><span>#{o.number}</span><b>{o.customer_name}</b><Status>{String(o.operational_state).replaceAll("_", " ")}</Status><Status>{String(o.payment_state).replaceAll("_", " ")}</Status><strong>{money(o.total_cents)}</strong></Link>)}</div> : <EmptyState title="Nenhum pedido na fila" text="Pedidos reais aparecerão aqui quando forem criados." />}</>;
  } else content = <><AdminTitle eyebrow="MÓDULO OPERACIONAL" title={AdminLabel(path)} /><ConfigNotice>Este módulo está pronto para receber dados, mas depende das definições comerciais ou da integração correspondente. Nenhum dado de demonstração é usado.</ConfigNotice><AdminReadiness /></>;
  return <AdminShell role={role}>{content}</AdminShell>;
}

function AdminTitle({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="admin-title"><span>{eyebrow}</span><h1>{title}</h1><p>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeZone: "America/Sao_Paulo" }).format(new Date())}</p></div>; }
function AdminLabel(path: string) { return ({ "/admin/catalogo":"Catálogo integrado", "/admin/frete":"Frete e cobertura", "/admin/entregas":"Despacho e entregas", "/admin/agenda":"Agenda de cuidados", "/admin/servicos":"Serviços e capacidade", "/admin/atendimento":"Central de atendimento", "/admin/clientes":"Clientes", "/admin/financeiro":"Financeiro e conciliação", "/admin/conteudo":"Conteúdo e identidade", "/admin/equipe":"Equipe e permissões", "/admin/configuracoes":"Configurações da operação" } as Record<string,string>)[path] || "Operação do pedido"; }
function AdminReadiness() { return <div className="readiness"><h2>Prontidão para operar</h2>{[["Banco transacional",integrations.database],["Catálogo legado",integrations.legacy],["Pagamentos",integrations.payment],["WhatsApp",integrations.whatsapp],["Mapas",integrations.maps]].map(([label, ok]) => <div key={String(label)}><span>{ok ? <CheckCircle2 /> : <Clock3 />}{label}</span><b>{ok ? "Configurado" : "Pendente"}</b></div>)}</div>; }

function DriverPage({ path }: { path: string }) { return <div className="driver-shell"><header><span className="eyebrow">PORTAL DO ENTREGADOR</span><h1>{path === "/entregador" ? "Minhas entregas" : "Parada ativa"}</h1><Status tone="warn">Localização não iniciada</Status></header><EmptyState title="Nenhuma rota atribuída" text="Somente tarefas reais atribuídas ao entregador aparecem aqui. O rastreamento não simula posição e depende de permissão do dispositivo." action={{ href: "/loja", label: "Voltar para a loja" }} /><div className="driver-safety"><Truck /><div><b>Privacidade em primeiro lugar</b><p>O cliente recebe apenas a posição da entrega ativa; outras paradas e deslocamentos posteriores nunca são expostos.</p></div></div></div>; }
function NoPermission() { return <div className="page-wrap narrow"><EmptyState title="Acesso não autorizado" text="Sua conta não possui permissão para este conteúdo. Nenhum dado foi exibido." action={{ href: "/", label: "Voltar ao início" }} /></div>; }
