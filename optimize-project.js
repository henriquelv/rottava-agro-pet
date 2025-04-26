const fs = require('fs');
const path = require('path');

// Pastas e arquivos que serão removidos
const itensParaRemover = [
    'src/app/api/newsletter', // Remover newsletter
    'src/app/faq', // Remover FAQ
    'src/app/suporte', // Remover suporte
];

function removerItem(caminho) {
    if (fs.existsSync(caminho)) {
        console.log(`Removendo: ${caminho}`);
        fs.rmSync(caminho, { recursive: true, force: true });
    }
}

// Remover todos os itens listados
itensParaRemover.forEach(item => {
    removerItem(item);
});

console.log('Otimização concluída!'); 