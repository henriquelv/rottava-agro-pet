const fs = require('fs');
const path = require('path');

// Pastas que devem ser removidas
const pastasParaRemover = [
    'src/app/produtos/[id]',
    'src/app/categoria/[id]',
    'src/app/admin/produtos/[id]',
    'src/app/api/categorias/[id]',
    'src/app/api/produtos/[id]',
    'src/app/blog/[id]',
    'src/app/produtos/categoria/[id]',
    '.next'
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

console.log('Limpeza concluída!'); 