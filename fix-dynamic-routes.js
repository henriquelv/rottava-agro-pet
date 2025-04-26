const fs = require('fs');
const path = require('path');

const directories = [
    'src/app/admin/produtos',
    'src/app/api/categorias',
    'src/app/api/produtos',
    'src/app/blog',
    'src/app/produtos/categoria',
    'src/app/produtos'
];

function fixRouteConflicts(dir) {
    const idPath = path.join(dir, '[id]');
    const slugPath = path.join(dir, '[slug]');

    if (fs.existsSync(idPath) && fs.existsSync(slugPath)) {
        console.log(`\nResolvendo conflito em: ${dir}`);
        
        // Verificar qual pasta tem conteúdo mais recente
        const idStats = fs.statSync(idPath);
        const slugStats = fs.statSync(slugPath);
        
        const keepPath = idStats.mtimeMs > slugStats.mtimeMs ? idPath : slugPath;
        const removePath = keepPath === idPath ? slugPath : idPath;
        
        console.log(`Mantendo: ${keepPath}`);
        console.log(`Removendo: ${removePath}`);
        
        // Remover a pasta duplicada
        fs.rmSync(removePath, { recursive: true, force: true });
        
        // Renomear a pasta mantida para [slug]
        if (keepPath === idPath) {
            const newPath = path.join(dir, '[slug]');
            fs.renameSync(keepPath, newPath);
            console.log(`Renomeando ${keepPath} para ${newPath}`);
        }
    }
}

// Executar a correção para cada diretório
directories.forEach(dir => {
    if (fs.existsSync(dir)) {
        fixRouteConflicts(dir);
    }
});

console.log('\nCorreção de rotas dinâmicas concluída!'); 