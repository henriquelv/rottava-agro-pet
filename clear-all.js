const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirsToClean = [
  '.next',
  'node_modules/.cache',
  '.vercel/cache',
  '.swc',
  'node_modules',
];

console.log('🧹 Iniciando limpeza completa...');

// Limpa os diretórios
dirsToClean.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Diretório limpo: ${dir}`);
    } catch (error) {
      console.error(`❌ Erro ao limpar ${dir}:`, error.message);
      // No Windows, alguns arquivos podem precisar de uma segunda tentativa
      try {
        execSync(`rd /s /q "${fullPath}"`, { stdio: 'inherit' });
        console.log(`✅ Diretório limpo (segunda tentativa): ${dir}`);
      } catch (err) {
        console.error(`❌ Falha na segunda tentativa de limpar ${dir}:`, err.message);
      }
    }
  }
});

// Limpa o cache do npm
try {
  console.log('🧹 Limpando cache do npm...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ Cache do npm limpo');
} catch (error) {
  console.error('❌ Erro ao limpar cache do npm:', error.message);
}

// Limpa o cache do yarn se existir
if (fs.existsSync(path.join(__dirname, 'yarn.lock'))) {
  try {
    console.log('🧹 Limpando cache do yarn...');
    execSync('yarn cache clean', { stdio: 'inherit' });
    console.log('✅ Cache do yarn limpo');
  } catch (error) {
    console.error('❌ Erro ao limpar cache do yarn:', error.message);
  }
}

console.log('📦 Reinstalando dependências...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependências reinstaladas');
} catch (error) {
  console.error('❌ Erro ao reinstalar dependências:', error.message);
}

console.log('✨ Limpeza e reinstalação concluídas! Execute npm run dev para iniciar o servidor.'); 