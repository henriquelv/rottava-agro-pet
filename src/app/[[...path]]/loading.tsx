export default function Loading() {
  return <div className="page-wrap" aria-busy="true" aria-label="Carregando conteúdo"><div className="skeleton skeleton-kicker" /><div className="skeleton skeleton-title" /><div className="skeleton skeleton-copy" /><div className="skeleton-grid">{Array.from({ length: 4 }, (_, index) => <div key={index}><div className="skeleton skeleton-card" /><div className="skeleton skeleton-line" /></div>)}</div></div>;
}
