export const money = (cents: number | null | undefined) => cents == null
  ? "Preço sob consulta"
  : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

export const dateTime = (value: string | Date) => new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium", timeStyle: "short", timeZone: "America/Sao_Paulo",
}).format(new Date(value));
