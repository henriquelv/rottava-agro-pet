export const store = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Rottava Pet Casa e Jardim",
  city: process.env.NEXT_PUBLIC_STORE_CITY || "Caçador",
  state: process.env.NEXT_PUBLIC_STORE_STATE || "SC",
  address: process.env.NEXT_PUBLIC_STORE_ADDRESS || "",
  phone: process.env.NEXT_PUBLIC_STORE_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  hours: process.env.NEXT_PUBLIC_STORE_HOURS || "",
};

export const integrations = {
  database: Boolean(process.env.DATABASE_URL),
  payment: Boolean(process.env.PAYMENT_PROVIDER && process.env.PAYMENT_WEBHOOK_SECRET),
  legacy: Boolean(process.env.LEGACY_CATALOG_API_URL && process.env.LEGACY_CATALOG_API_KEY),
  maps: Boolean(process.env.MAPS_PROVIDER && process.env.MAPS_API_KEY),
  whatsapp: Boolean(process.env.WHATSAPP_PROVIDER && process.env.WHATSAPP_ACCESS_TOKEN && store.whatsapp),
};
