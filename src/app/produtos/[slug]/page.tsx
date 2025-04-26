export default function ProdutoPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg p-4">
          {/* Aqui virá a imagem do produto */}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Produto {params.slug}</h1>
          <p className="text-gray-600 mb-4">Descrição do produto</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">R$ 99,99</span>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 