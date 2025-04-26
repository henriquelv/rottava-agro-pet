const fs = require('fs');
const path = require('path');

const cachePaths = [
  path.join(__dirname, '.next'),
  path.join(__dirname, 'node_modules', '.cache'),
];

function clearDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Diretório limpo: ${dirPath}`);
    } catch (error) {
      console.error(`❌ Erro ao limpar ${dirPath}:`, error.message);
    }
  }
}

console.log('🧹 Iniciando limpeza completa...');

// Limpa todos os diretórios de cache
cachePaths.forEach(clearDirectory);

console.log('✨ Limpeza concluída! Agora você pode iniciar o servidor com npm run dev'); 