import { useSelector } from "react-redux";




const Email: React.FC = () => {
    const emailRedux = useSelector((state: any) => state.profile?.profile.email);



return (
    <div>
            <div className="bg-gray-700 p-6 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold mb-4">Email</h2>
              <p className="text-gray-300 mb-4">
                Seu email atual é: <span className="font-bold">{emailRedux || "Email não disponível"}</span>
              </p>

              <h3 className="text-xl font-semibold mb-2">Configurações de Email</h3>
              <p className="text-gray-300 mb-4">
                Você pode gerenciar suas preferências de comunicação e notificações abaixo:
              </p>

              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Receber notificações sobre novas mensagens e atualizações.
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Receber ofertas e promoções especiais.
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Receber lembretes sobre sua assinatura e pagamento.
                  </label>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Alterar Email</h3>
              <p className="text-gray-300 mb-4">
                Caso queira alterar seu endereço de email, clique no botão abaixo:
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4">
                Alterar Email
              </button>

              <h3 className="text-xl font-semibold mb-2">Verificação de Email</h3>
              <p className="text-gray-300 mb-4">
                Se você não recebeu o email de verificação, pode solicitar um novo:
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Reenviar Email de Verificação
              </button>
            </div>

    </div>
)}


export default Email 
