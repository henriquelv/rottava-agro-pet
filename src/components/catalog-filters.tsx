"use client";

import { useState } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { Drawer } from "vaul";
import { Filter, SlidersHorizontal, X } from "lucide-react";

const categories = [["", "Todos"], ["pet", "Pet"], ["casa-jardim", "Casa & jardim"], ["cuidados", "Cuidados"]] as const;

export function CatalogFilters({ brands, total }: { brands: string[]; total: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useQueryStates({ categoria: parseAsString.withDefault(""), marca: parseAsString.withDefault(""), ordem: parseAsString.withDefault("") }, { shallow: false });
  const active = Number(Boolean(filters.categoria)) + Number(Boolean(filters.marca)) + Number(Boolean(filters.ordem));
  const panel = <div className="filter-panel">
    <div className="filter-panel-heading"><div><span className="eyebrow">REFINE A BUSCA</span><h2>Filtros</h2></div>{active > 0 && <button onClick={() => setFilters({ categoria: "", marca: "", ordem: "" })}>Limpar tudo</button>}</div>
    <fieldset><legend>Universo</legend>{categories.map(([value, label]) => <label key={label}><input type="radio" name="categoria" checked={filters.categoria === value} onChange={() => setFilters({ categoria: value })} /><span>{label}</span></label>)}</fieldset>
    <fieldset><legend>Marca</legend><label><input type="radio" name="marca" checked={!filters.marca} onChange={() => setFilters({ marca: "" })} /><span>Todas as marcas</span></label>{brands.map((brand) => <label key={brand}><input type="radio" name="marca" checked={filters.marca === brand} onChange={() => setFilters({ marca: brand })} /><span>{brand}</span></label>)}</fieldset>
  </div>;
  return <>
    <div className="catalog-mobile-tools"><button onClick={() => setMobileOpen(true)}><Filter /> Filtrar {active > 0 && <b>{active}</b>}</button><label><SlidersHorizontal /><select aria-label="Ordenar" value={filters.ordem} onChange={(event) => setFilters({ ordem: event.target.value })}><option value="">Mais relevantes</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select></label></div>
    <aside className="catalog-sidebar">{panel}</aside>
    <div className="catalog-list-head"><span>{total} {total === 1 ? "produto" : "produtos"}</span><label>Ordenar por <select value={filters.ordem} onChange={(event) => setFilters({ ordem: event.target.value })}><option value="">Mais relevantes</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select></label></div>
    <Drawer.Root open={mobileOpen} onOpenChange={setMobileOpen}><Drawer.Portal><Drawer.Overlay className="drawer-overlay" /><Drawer.Content className="filter-drawer"><header><Drawer.Title>Filtrar produtos</Drawer.Title><Drawer.Close aria-label="Fechar"><X /></Drawer.Close></header>{panel}<button className="button primary wide" onClick={() => setMobileOpen(false)}>Ver {total} produtos</button></Drawer.Content></Drawer.Portal></Drawer.Root>
  </>;
}
