"use client";

import { useState, useTransition } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { Check, Filter, SlidersHorizontal, X } from "@/components/icons";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SelectMenu } from "@/components/select-menu";
import { Sheet } from "@/components/sheet";

export type CatalogFacet = { value: string; label: string; count: number };
type Filters = { categoria: string; marca: string; ordem: string; precoMin: string; precoMax: string; disponivel: string; tipo: string; fase: string; porte: string; necessidade: string };
type FacetKey = "categoria" | "marca" | "tipo" | "fase" | "porte" | "necessidade";

type FilterPanelProps = {
  active: number;
  facets: Array<{ title: string; key: FacetKey; items: CatalogFacet[]; allLabel: string }>;
  filters: Filters;
  priceBounds?: { min: number; max: number };
  scope: string;
  update: (values: Partial<Filters>) => void;
};

function FilterPanel({ active, facets, filters, priceBounds, scope, update }: FilterPanelProps) {
  const clear: Partial<Filters> = { categoria: "", marca: "", tipo: "", fase: "", porte: "", necessidade: "", precoMin: "", precoMax: "", disponivel: "" };
  return <div className="filter-panel">
    <div className="filter-panel-heading"><div><span className="eyebrow">REFINE A ESCOLHA</span><h2>Filtros</h2></div>{active > 0 && <button onClick={() => update(clear)}>Limpar tudo</button>}</div>
    {facets.filter((facet) => facet.items.length > 0).map((facet) => <fieldset key={facet.key}><legend>{facet.title}</legend><label><input type="radio" name={`${facet.key}-${scope}`} checked={!filters[facet.key]} onChange={() => update({ [facet.key]: "" })} /><span>{facet.allLabel}</span><small>{facet.items.reduce((sum, item) => sum + item.count, 0)}</small></label>{facet.items.map((item) => <label key={item.value}><input type="radio" name={`${facet.key}-${scope}`} checked={filters[facet.key] === item.value} onChange={() => update({ [facet.key]: item.value })} /><span>{item.label}</span><small>{item.count}</small></label>)}</fieldset>)}
    {priceBounds && <fieldset><legend>Faixa de preço</legend><div className="price-filter"><label><span>Mínimo</span><div><small>R$</small><input inputMode="numeric" type="number" min={priceBounds.min} max={priceBounds.max} placeholder={String(priceBounds.min)} value={filters.precoMin} onChange={(event) => update({ precoMin: event.target.value })} /></div></label><label><span>Máximo</span><div><small>R$</small><input inputMode="numeric" type="number" min={priceBounds.min} max={priceBounds.max} placeholder={String(priceBounds.max)} value={filters.precoMax} onChange={(event) => update({ precoMax: event.target.value })} /></div></label></div></fieldset>}
  </div>;
}

export function CatalogFilters({ brands, categories, types, stages, sizes, needs, total, priceBounds }: { brands: CatalogFacet[]; categories: CatalogFacet[]; types: CatalogFacet[]; stages: CatalogFacet[]; sizes: CatalogFacet[]; needs: CatalogFacet[]; total: number; priceBounds?: { min: number; max: number } }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const reduced = useReducedMotion();
  const [filters, setFilters] = useQueryStates({ categoria: parseAsString.withDefault(""), marca: parseAsString.withDefault(""), ordem: parseAsString.withDefault(""), precoMin: parseAsString.withDefault(""), precoMax: parseAsString.withDefault(""), disponivel: parseAsString.withDefault(""), tipo: parseAsString.withDefault(""), fase: parseAsString.withDefault(""), porte: parseAsString.withDefault(""), necessidade: parseAsString.withDefault("") }, { shallow: false, history: "push" });
  const facetGroups = [
    { title: "Para quem", key: "categoria" as const, items: categories, allLabel: "Todos" },
    { title: "Tipo de produto", key: "tipo" as const, items: types, allLabel: "Todos os tipos" },
    { title: "Fase de vida", key: "fase" as const, items: stages, allLabel: "Todas as fases" },
    { title: "Porte", key: "porte" as const, items: sizes, allLabel: "Todos os portes" },
    { title: "Necessidade", key: "necessidade" as const, items: needs, allLabel: "Todas" },
    { title: "Marca", key: "marca" as const, items: brands, allLabel: "Todas as marcas" },
  ];
  const activeKeys = facetGroups.map((item) => item.key).filter((key) => Boolean(filters[key]));
  const active = activeKeys.length + Number(Boolean(filters.precoMin || filters.precoMax));
  const update = (values: Partial<Filters>) => startTransition(() => { void setFilters(values); });
  const labels = new Map(facetGroups.flatMap((group) => group.items.map((item) => [`${group.key}:${item.value}`, item.label])));
  const sortOptions = [{ value: "", label: "Mais relevantes" }, { value: "price-asc", label: "Menor preço" }, { value: "price-desc", label: "Maior preço" }];

  return <>
    <div className="catalog-mobile-tools"><button onClick={() => setMobileOpen(true)}><Filter aria-hidden="true" /> Filtros {active > 0 && <b>{active}</b>}</button><div className="mobile-sort"><SlidersHorizontal aria-hidden="true" /><SelectMenu label="Ordenar produtos" value={filters.ordem} options={sortOptions} onChange={(value) => update({ ordem: value })} /></div></div>
    <motion.aside className="catalog-sidebar" animate={{ opacity: pending ? .55 : 1 }} transition={{ duration: reduced ? 0 : .18 }}><FilterPanel active={active} facets={facetGroups} filters={filters} priceBounds={priceBounds} scope="desktop" update={update} /></motion.aside>
    <div className="catalog-toolbar"><div className="catalog-count"><b>{total}</b><span>{total === 1 ? "produto encontrado" : "produtos encontrados"}</span></div><div className="active-filter-chips"><AnimatePresence initial={false}>{activeKeys.map((key) => <motion.button key={key} initial={reduced ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: .92 }} onClick={() => update({ [key]: "" })}>{labels.get(`${key}:${filters[key]}`) || filters[key]}<X aria-hidden="true" /></motion.button>)}{(filters.precoMin || filters.precoMax) && <motion.button initial={reduced ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: .92 }} onClick={() => update({ precoMin: "", precoMax: "" })}>R$ {filters.precoMin || priceBounds?.min}–{filters.precoMax || priceBounds?.max}<X aria-hidden="true" /></motion.button>}</AnimatePresence></div><div className="sort-control"><span>Ordenar por</span><SelectMenu label="Ordenar produtos" value={filters.ordem} options={sortOptions} onChange={(value) => update({ ordem: value })} /></div></div>
    <Sheet open={mobileOpen} onClose={() => setMobileOpen(false)} side="bottom" className="filter-drawer" title="Filtrar produtos" description="Use apenas os atributos presentes no catálogo."><div className="filter-drawer-scroll"><FilterPanel active={active} facets={facetGroups} filters={filters} priceBounds={priceBounds} scope="mobile" update={update} /></div><button className="button primary wide filter-drawer-apply" onClick={() => setMobileOpen(false)}><Check aria-hidden="true" /> Ver {total} produtos</button></Sheet>
  </>;
}
