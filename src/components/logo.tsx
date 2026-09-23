import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="logo" aria-label="Rottava — início">
    <span className="logo-mark" aria-hidden="true"><i /><i /><i /></span>
    {!compact && <span><b>ROTTAVA</b><small>PET · CASA · JARDIM</small></span>}
  </Link>;
}
