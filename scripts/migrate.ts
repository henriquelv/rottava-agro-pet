import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL não configurada");
const sql = postgres(url, { prepare: false, max: 1 });
const files = fs.readdirSync(path.join(process.cwd(), "db")).filter((f) => f.endsWith(".sql")).sort();
for (const file of files) {
  const content = fs.readFileSync(path.join(process.cwd(), "db", file), "utf8");
  await sql.unsafe(content);
  console.log(`Aplicada: ${file}`);
}
await sql.end();
