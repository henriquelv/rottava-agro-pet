"use client";

import { useState, useTransition } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { Drawer } from "vaul";
import { Check, Filter, SlidersHorizontal, X } from "@/components/icons";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SelectMenu } from "@/components/select-menu";

export type CatalogFacet = { value: string; label: string; count: number };

type FilterPanelProps = {
  active: number;
  brands: CatalogFacet[];
  categories: CatalogFacet[];
  filters: { categoria: string; marca: string; ordem: string; precoMin: string; precoMax: string; disponivel: string };
  priceBounds?: { min: number; max: number };
  scope: string;
  update: (values: Partial<{ categoria: string; marca: string; ordem: string; precoMin: string; precoMax: string; disponivel: string }>) => void;
};

function FilterPanel({ active, brands, categories, filters, priceBounds, scope, update }: FilterPanelProps) {
  return <div className="filter-panel">
    <div className="filter-panel-heading"><div><span className="eyebrow">CATÁLOGO</span><h2>Filtrar</h2></div>{active > 0 && <button onClick={() => update({ categoria: "", marca: "", precoMin: "", precoMax: "", disponivel: "" })}>Limpar</button>}</div>
    <fieldset><legend>Categoria</legend><label><input type="radio" name={`categoria-${scope}`} checked={!filters.categoria} onChange={() => update({ categoria: "" })} /><span>Todos</span><small>{categories.reduce((sum, item) => sum + item.count, 0)}</small></label>{categories.map((item) => <label key={item.value}><input type="radio" name={`categoria-${scope}`} checked={filters.categoria === item.value} onChange={() => update({ categoria: item.value })} /><span>{item.label}</span><small>{item.count}</small></label>)}</fieldset>
    <fieldset><legend>Marca</legend><label><input type="radio" name={`marca-${scope}`} checked={!filters.marca} onChange={() => update({ marca: "" })} /><span>Todas</span><small>{brands.reduce((sum, item) => sum + item.count, 0)}</small></label>{brands.map((item) => <label key={item.value}><input type="radio" name={`marca-${scope}`} checked={filters.marca === item.value} onChange={() => update({ marca: item.value })} /><span>{item.label}</span><small>{item.count}</small></label>)}</fieldset>
    {priceBounds && <fieldset><legend>Faixa de preço</legend><div className="price-filter"><label><span>Mínimo</span><div><small>R$</small><input inputMode="numeric" type="number" min={priceBounds.min} max={priceBounds.max} placeholder={String(priceBounds.min)} value={filters.precoMin} onChange={(event) => update({ precoMin: event.target.value })} /></div></label><label><span>Máximo</span><div><small>R$</small><input inputMode="numeric" type="number" min={priceBounds.min} max={priceBounds.max} placeholder={String(priceBounds.max)} value={filters.precoMax} onChange={(event) => update({ precoMax: event.target.value })} /></div></label></div></fieldset>}
    <fieldset><legend>Disponibilidade</legend><label className="availability-filter"><input type="checkbox" checked={filters.disponivel === "1"} onChange={(event) => update({ disponivel: event.target.checked ? "1" : "" })} /><span>Somente disponíveis</span></label></fieldset>
  </div>;
}

export function CatalogFilters({ brands, categories, total, priceBounds }: { brands: CatalogFacet[]; categories: CatalogFacet[]; total: number; priceBounds?: { min: number; max: number } }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const reduced = useReducedMotion();
  const [filters, setFilters] = useQueryStates({ categoria: parseAsString.withDefault(""), marca: parseAsString.withDefault(""), ordem: parseAsString.withDefault(""), precoMin: parseAsString.withDefault(""), precoMax: parseAsString.withDefault(""), disponivel: parseAsString.withDefault("") }, { shallow: false, history: "push" });
  const active = Number(Boolean(filters.categoria)) + Number(Boolean(filters.marca)) + Number(Boolean(filters.precoMin || filters.precoMax)) + Number(filters.disponivel === "1");
  const update = (values: Partial<typeof filters>) => startTransition(() => { void setFilters(values); });
  const categoryLabel = categories.find((item) => item.value === filters.categoria)?.label;
  const sortOptions = [{ value: "", label: "Mais relevantes" }, { value: "price-asc", label: "Menor preço" }, { value: "price-desc", label: "Maior preço" }];

  return <>
    <div className="catalog-mobile-tools"><button onClick={() => setMobileOpen(true)}><Filter aria-hidden="true" /> Filtros {active > 0 && <b>{active}</b>}</button><div className="mobile-sort"><SlidersHorizontal aria-hidden="true" /><SelectMenu label="Ordenar produtos" value={filters.ordem} options={sortOptions} onChange={(value) => update({ ordem: value })} /></div></div>
    <motion.aside className="catalog-sidebar" animate={{ opacity: pending ? .55 : 1 }} transition={{ duration: reduced ? 0 : .18 }}><FilterPanel active={active} brands={brands} categories={categories} filters={filters} priceBounds={priceBounds} scope="desktop" update={update} /></motion.aside>
    <div className="catalog-toolbar"><div><b>{total}</b><span>{total === 1 ? "produto" : "produtos"}</span></div><AnimatePresence initial={false}>{filters.categoria && <motion.button initial={reduced ? false : { opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: .9 }} onClick={() => update({ categoria: "" })}>{categoryLabel}<X aria-hidden="true" /></motion.button>}{filters.marca && <motion.button initial={reduced ? false : { opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: .9 }} onClick={() => update({ marca: "" })}>{filters.marca}<X aria-hidden="true" /></motion.button>}{(filters.precoMin || filters.precoMax) && <motion.button initial={reduced ? false : { opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: .9 }} onClick={() => update({ precoMin: "", precoMax: "" })}>R$ {filters.precoMin || priceBounds?.min}–{filters.precoMax || priceBounds?.max}<X aria-hidden="true" /></motion.button>}{filters.disponivel === "1" && <motion.button initial={reduced ? false : { opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: .9 }} onClick={() => update({ disponivel: "" })}>Disponíveis<X aria-hidden="true" /></motion.button>}</AnimatePresence><div className="sort-control"><span>Ordenar por</span><SelectMenu label="Ordenar produtos" value={filters.ordem} options={sortOptions} onChange={(value) => update({ ordem: value })} /></div></div>
    <Drawer.Root open={mobileOpen} onOpenChange={setMobileOpen}><Drawer.Portal><Drawer.Overlay className="drawer-overlay" /><Drawer.Content className="filter-drawer" aria-describedby="filter-description"><header><div><Drawer.Title>Filtrar produtos</Drawer.Title><p id="filter-description">Refine o catálogo usando os dados disponíveis.</p></div><Drawer.Close aria-label="Fechar filtros"><X aria-hidden="true" /></Drawer.Close></header><FilterPanel active={active} brands={brands} categories={categories} filters={filters} priceBounds={priceBounds} scope="mobile" update={update} /><button className="button primary wide" onClick={() => setMobileOpen(false)}><Check aria-hidden="true" /> Ver {total} produtos</button></Drawer.Content></Drawer.Portal></Drawer.Root>
  </>;
}
