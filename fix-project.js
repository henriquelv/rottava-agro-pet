const fs = require('fs');
const path = require('path');

// Pastas que devem ser removidas ou verificadas
const pastasParaRemover = [
    'src/app/teste-admin',
    'src/app/api/imagens', // Remover pois já existe api/image
    'src/app/api/user',    // Remover pois já existe api/usuarios
    'src/app/produtos/categoria' // Remover pois já existe categoria
];

function removerPasta(caminho) {
    if (fs.existsSync(caminho)) {
        console.log(`Removendo: ${caminho}`);
        fs.rmSync(caminho, { recursive: true, force: true });
    }
}

// Remover todas as pastas listadas
pastasParaRemover.forEach(pasta => {
    removerPasta(pasta);
});

console.log('Correções concluídas!'); 