import { FaCreditCard } from "react-icons/fa";

const Billing: React.FC = () => {

    return (
    <div className="bg-gray-800 p-6 rounded-lg mb-4 shadow-lg h-full">
      <h2 className="text-2xl font-semibold mb-6 text-pink-500 flex items-center">
        <FaCreditCard className="mr-2 text-3xl" /> Métodos de Pagamento
      </h2>
      
      <p className="text-gray-300 mb-6">
        Para acessar todas as funcionalidades do nosso site, é necessária uma assinatura mensal de 
        <span className="font-bold text-pink-500"> 10 EUR</span>. Os pagamentos são processados através do <span className="font-bold text-pink-500">Verotel</span>.
      </p>
      
      <h3 className="text-xl font-semibold mb-4">Informações da Assinatura</h3>
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <ul className="list-disc list-inside text-gray-300">
          <li>Subscrição: <span className="font-bold">10 EUR</span></li>
          <li>Faturamento mensal no dia da assinatura.</li>
          <li>Cancelamento a qualquer momento sem taxas adicionais.</li>
        </ul>
      </div>
  
      <h3 className="text-xl font-semibold mb-4">Status do Pagamento</h3>
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <p className="text-gray-300 mb-2">
          Seu pagamento está <span className="font-bold text-green-500">em dia</span>.
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Data da Assinatura: <span className="font-bold">15 de Outubro de 2024</span></li>
          <li>Data da Próxima Mensalidade: <span className="font-bold">15 de Novembro de 2024</span></li>
        </ul>
      </div>
  
      <h3 className="text-xl font-semibold mb-4">Métodos de Pagamento Aceitos</h3>
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <p className="text-gray-300 mb-2">Aceitamos os seguintes métodos de pagamento:</p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Cartões de Crédito (Visa, Mastercard, etc.)</li>
          <li>Transferências Bancárias</li>
          <li>PayPal (se disponível)</li>
        </ul>
      </div>
  
      <div className="mt-4 flex justify-between">
        <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors shadow-md">
          Adicionar Método de Pagamento
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md">
          Remover Método de Pagamento
        </button>
      </div>
  
      <h3 className="text-xl font-semibold mt-6 mb-2">Histórico de Pagamentos</h3>
      <p className="text-gray-300 mb-4">
        Aqui você pode visualizar seu histórico de pagamentos e status de assinatura. 
        <span className="text-pink-500 underline cursor-pointer"> Clique aqui</span> para acessar o histórico.
      </p>
    </div>
  )}


  export default Billing;
