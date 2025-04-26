const fs = require('fs');
const path = require('path');

function verificarRotasDinamicas(dir) {
  const subpastas = fs.readdirSync(dir).filter((p) =>
    fs.lstatSync(path.join(dir, p)).isDirectory()
  );

  const rotasAgrupadas = {};

  for (const pasta of subpastas) {
    if (pasta.startsWith('[') && pasta.endsWith(']')) {
      const key = path.resolve(dir);
      rotasAgrupadas[key] = rotasAgrupadas[key] || [];
      rotasAgrupadas[key].push(pasta);
    }

    const proximo = path.join(dir, pasta);
    if (fs.lstatSync(proximo).isDirectory()) {
      const internos = verificarRotasDinamicas(proximo);
      Object.assign(rotasAgrupadas, internos);
    }
  }

  return rotasAgrupadas;
}

function listarConflitos(basePath = 'src/app') {
  const conflitos = verificarRotasDinamicas(basePath);
  let achou = false;

  for (const rota in conflitos) {
    const dinamicas = conflitos[rota];
    if (dinamicas.length > 1) {
      console.error(`❌ Conflito detectado em ${rota}:`);
      dinamicas.forEach((r) => console.error(`  → ${r}`));
      achou = true;
    }
  }

  if (achou) {
    console.error('\n⚠️ Corrija os conflitos acima antes de rodar o projeto.\n');
    process.exit(1);
  } else {
    console.log('✅ Nenhum conflito de rota dinâmica encontrado.');
  }
}

listarConflitos(); 