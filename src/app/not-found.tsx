import { EmptyState } from "@/components/ui";
export default function NotFound() { return <div className="page-wrap narrow"><EmptyState title="Página não encontrada" text="Este caminho não existe ou foi movido." action={{ href: "/", label: "Voltar ao início" }} /></div>; }
