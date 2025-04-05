import fs from 'fs';
import path from 'path';

const migrationsDir = path.join(__dirname, 'migrations');

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

const timestamp = new Date().getTime();
const migrationName = process.argv[2] || 'new-migration';
const fileName = `${timestamp}-${migrationName}.ts`;

const migrationContent = `import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Implemente suas alterações aqui
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Implemente a reversão das alterações aqui
}
`;

fs.writeFileSync(path.join(migrationsDir, fileName), migrationContent);
console.log(`Migração criada: ${fileName}`); 