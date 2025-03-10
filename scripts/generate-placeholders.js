const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const generatePlaceholder = async (width, height, text, outputPath) => {
  try {
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 200, g: 200, b: 200, alpha: 1 }
      }
    })
    .jpeg()
    .toFile(outputPath);
    
    console.log(`Generated placeholder: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${outputPath}:`, error);
  }
};

const main = async () => {
  const publicDir = path.join(process.cwd(), 'public');
  const productsDir = path.join(publicDir, 'products');

  // Ensure directories exist
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  // Generate logo
  await generatePlaceholder(120, 48, 'Logo', path.join(publicDir, 'logo.png'));

  // Generate product images
  const products = [
    'racao.jpg',
    'coleira.jpg',
    'brinquedo.jpg',
    'shampoo.jpg'
  ];

  for (const product of products) {
    await generatePlaceholder(
      300,
      300,
      product,
      path.join(productsDir, product)
    );
  }
};

main().catch(console.error); 