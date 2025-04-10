export default function ConfirmacaoPage() {
  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Obrigado pela sua compra!</h1>
      <p className="text-lg">Seu pedido foi realizado com sucesso e em breve você receberá um email com os detalhes.</p>
      <p className="mt-4">Se tiver alguma dúvida, entre em contato com nosso suporte.</p>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Voltar para a Página Inicial
      </button>
    </div>
  )
} 