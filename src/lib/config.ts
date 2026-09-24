export const store = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Rottava Pet Casa e Jardim",
  city: process.env.NEXT_PUBLIC_STORE_CITY || "Caçador",
  state: process.env.NEXT_PUBLIC_STORE_STATE || "SC",
  address: process.env.NEXT_PUBLIC_STORE_ADDRESS || "",
  phone: process.env.NEXT_PUBLIC_STORE_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  hours: process.env.NEXT_PUBLIC_STORE_HOURS || "",
};

export const demoMode = process.env.DEMO_MODE === "true" || process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const demoAccounts = [
  { email: "cliente@rottava.test", role: "Cliente", destination: "/minha-conta" },
  { email: "operador@rottava.test", role: "Operador", destination: "/admin" },
  { email: "atendimento@rottava.test", role: "Atendente", destination: "/admin/atendimento" },
  { email: "servicos@rottava.test", role: "Serviços", destination: "/admin/agenda" },
  { email: "entregador@rottava.test", role: "Entregador", destination: "/entregador" },
  { email: "financeiro@rottava.test", role: "Financeiro", destination: "/admin/financeiro" },
  { email: "gestor@rottava.test", role: "Gestor", destination: "/admin" },
] as const;

export const integrations = {
  database: Boolean(process.env.DATABASE_URL),
  assistant: Boolean(process.env.OPENAI_API_KEY),
  payment: Boolean(process.env.PAYMENT_PROVIDER && process.env.PAYMENT_WEBHOOK_SECRET),
  legacy: Boolean(process.env.LEGACY_CATALOG_API_URL && process.env.LEGACY_CATALOG_API_KEY),
  maps: Boolean(process.env.MAPS_PROVIDER && process.env.MAPS_API_KEY),
  whatsapp: Boolean(process.env.WHATSAPP_PROVIDER && process.env.WHATSAPP_ACCESS_TOKEN && store.whatsapp),
};
