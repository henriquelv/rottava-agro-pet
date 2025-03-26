export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>

      <div className="prose max-w-3xl">
        <p className="text-lg mb-8">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
          <p>
            A Rottava Agropet está comprometida em proteger a privacidade dos nossos clientes.
            Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Informações Coletadas</h2>
          <p className="mb-4">Coletamos as seguintes informações:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Endereço para entrega</li>
            <li>Informações de pagamento</li>
            <li>Histórico de compras</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Uso das Informações</h2>
          <p className="mb-4">Utilizamos suas informações para:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Processar pedidos e pagamentos</li>
            <li>Enviar atualizações sobre pedidos</li>
            <li>Fornecer suporte ao cliente</li>
            <li>Enviar comunicações de marketing (com seu consentimento)</li>
            <li>Melhorar nossos produtos e serviços</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Proteção de Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger
            suas informações pessoais contra acesso não autorizado, alteração ou destruição.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar sua experiência de navegação. Você pode
            configurar seu navegador para recusar cookies, mas isso pode afetar algumas
            funcionalidades do site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Seus Direitos</h2>
          <p className="mb-4">Você tem direito a:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir informações incorretas</li>
            <li>Solicitar a exclusão de suas informações</li>
            <li>Retirar seu consentimento para marketing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Contato</h2>
          <p>
            Para questões sobre esta política ou suas informações pessoais, entre em
            contato conosco através do e-mail: privacidade@rottavaagropet.com.br
          </p>
        </section>
      </div>
    </div>
  )
} 