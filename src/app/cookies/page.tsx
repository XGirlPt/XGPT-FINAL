"use client";
import Link from 'next/link';

function Cookies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto p-8 rounded-lg shadow-2xl bg-white dark:bg-[#1a0a10] text-gray-700 dark:text-gray-200 space-y-12">
        <h1 className="text-center text-4xl font-bold mb-12 border-b border-gray-300 dark:border-gray-700 pb-4 text-pink-600 dark:text-pink-400">
          Política de Cookies - XGirl.pt
        </h1>

        {/* O que são Cookies */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            1. O que são Cookies?
          </h2>
          <p>
            Cookies são pequenos arquivos de texto inofensivos armazenados no seu dispositivo (computador, smartphone ou tablet) quando você visita o XGirl.pt. Eles permitem que o site lembre suas ações e preferências (como login, idioma ou tema) e coletem informações sobre seus hábitos de navegação, ajudando-nos a melhorar sua experiência e os serviços oferecidos.
          </p>
          <p>
            Os cookies não são vírus, trojans, worms, spam ou spyware, nem abrem pop-ups. Eles não armazenam informações sensíveis como dados bancários ou fotos pessoais, mas sim dados técnicos e preferências que facilitam a interação com o site.
          </p>
        </section>

        {/* Finalidades */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            2. Para que Usamos Cookies?
          </h2>
          <p>
            No XGirl.pt, utilizamos cookies para os seguintes propósitos:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Técnicos:</strong> Garantir o funcionamento básico do site, como autenticação de usuários e navegação entre páginas.</li>
            <li><strong>Análise:</strong> Medir o número de visitantes, analisar padrões de uso e melhorar a experiência do usuário.</li>
            <li><strong>Personalização:</strong> Adaptar o site às suas preferências, como tema (claro/escuro) ou idioma.</li>
          </ul>
          <p>
            Esses cookies podem ser próprios (gerados pelo XGirl.pt) ou de terceiros (gerados por serviços externos, como Google Analytics).
          </p>
        </section>

        {/* Tipos de Cookies */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            3. Tipos de Cookies Utilizados
          </h2>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">3.1. Cookies Técnicos (Essenciais)</h3>
            <p>
              Necessários para o funcionamento do site. Sem eles, certas funcionalidades, como login ou navegação, não estarão disponíveis.
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2">Nome</th>
                  <th className="border p-2">Finalidade</th>
                  <th className="border p-2">Duração</th>
                  <th className="border p-2">Fornecedor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">session_id</td>
                  <td className="border p-2">Manter a sessão do usuário ativa</td>
                  <td className="border p-2">Sessão (expira ao fechar o navegador)</td>
                  <td className="border p-2">XGirl.pt</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-medium">3.2. Cookies de Análise</h3>
            <p>
              Coletam dados estatísticos sobre o uso do site, como páginas mais visitadas e tempo de permanência, ajudando-nos a otimizar o serviço.
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2">Nome</th>
                  <th className="border p-2">Finalidade</th>
                  <th className="border p-2">Duração</th>
                  <th className="border p-2">Fornecedor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">_ga</td>
                  <td className="border p-2">Distinguir usuários no Google Analytics</td>
                  <td className="border p-2">2 anos</td>
                  <td className="border p-2">Google</td>
                </tr>
                <tr>
                  <td className="border p-2">_gid</td>
                  <td className="border p-2">Identificar usuários por 24 horas no Google Analytics</td>
                  <td className="border p-2">24 horas</td>
                  <td className="border p-2">Google</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-medium">3.3. Cookies de Personalização</h3>
            <p>
              Permitem lembrar suas escolhas para oferecer uma experiência personalizada.
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2">Nome</th>
                  <th className="border p-2">Finalidade</th>
                  <th className="border p-2">Duração</th>
                  <th className="border p-2">Fornecedor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">theme_preference</td>
                  <td className="border p-2">Salvar preferência de tema (claro/escuro)</td>
                  <td className="border p-2">1 ano</td>
                  <td className="border p-2">XGirl.pt</td>
                </tr>
                <tr>
                  <td className="border p-2">lang</td>
                  <td className="border p-2">Salvar preferência de idioma</td>
                  <td className="border p-2">1 ano</td>
                  <td className="border p-2">XGirl.pt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Nota:</strong> Cookies próprios são gerados pelo XGirl.pt, enquanto cookies de terceiros são gerados por serviços externos detalhados acima.
          </p>
        </section>

        {/* Impacto da Desativação */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            4. O que Acontece se Desativar os Cookies?
          </h2>
          <p>
            Desativar cookies pode limitar sua experiência no XGirl.pt. Alguns exemplos:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Não será possível manter-se logado ou acessar áreas pessoais como &quot;Meu Perfil&quot;.</li>
            <li>O site não adaptará conteúdos às suas preferências (ex.: tema ou idioma).</li>
            <li>Não poderemos analisar o tráfego para melhorar o site.</li>
            <li>Funcionalidades de compartilhamento em redes sociais podem não funcionar.</li>
          </ul>
          <p>
            Cookies essenciais não podem ser desativados, pois são indispensáveis ao funcionamento básico do site.
          </p>
        </section>

        {/* Gerenciamento de Cookies */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            5. Como Gerenciar ou Desativar Cookies?
          </h2>
          <p>
            Você pode gerenciar os cookies de várias maneiras:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Banner de Consentimento:</strong> Ao acessar o XGirl.pt, personalize suas preferências no banner de cookies.</li>
            <li><strong>Navegador:</strong> Configure seu navegador para aceitar, bloquear ou excluir cookies:
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li><Link href="https://support.google.com/chrome/answer/95647" className="text-pink-600 hover:underline dark:text-pink-400">Google Chrome</Link></li>
                <li><Link href="https://support.mozilla.org/pt-PT/kb/cookies-informacao-que-os-websites-armazenam-no-s" className="text-pink-600 hover:underline dark:text-pink-400">Mozilla Firefox</Link></li>
                <li><Link href="https://support.microsoft.com/pt-pt/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-pink-600 hover:underline dark:text-pink-400">Microsoft Edge</Link></li>
                <li><Link href="https://support.apple.com/pt-pt/HT201265" className="text-pink-600 hover:underline dark:text-pink-400">Safari (iOS)</Link></li>
                <li><Link href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" className="text-pink-600 hover:underline dark:text-pink-400">Safari (macOS)</Link></li>
                <li><Link href="https://help.opera.com/en/latest/web-preferences/#cookies" className="text-pink-600 hover:underline dark:text-pink-400">Opera</Link></li>
              </ul>
            </li>
            <li><strong>Google Analytics Opt-Out:</strong> Baixe o complemento para desativar o Google Analytics em <Link href="https://tools.google.com/dlpage/gaoptout" className="text-pink-600 hover:underline dark:text-pink-400">tools.google.com/dlpage/gaoptout</Link>.</li>
            <li><strong>Modo Anônimo:</strong> Use o modo anônimo do navegador para evitar o armazenamento de cookies após a sessão.</li>
          </ul>
          <p>
            Para excluir cookies específicos no Google Chrome, por exemplo:
          </p>
          <ol className="list-decimal list-inside ml-6 space-y-2">
            <li>Vá para &quot;Configurações&quot; - &quot;Privacidade e Segurança&quot; - &quot;Cookies e outros dados do site&quot;.</li>
            <li>Clique em &quot;Ver todos os cookies e dados do site&quot;.</li>
            <li>Pesquise por &quot;xgirl.pt&quot; e exclua os cookies desejados.</li>
          </ol>
        </section>

        {/* Cookies de Terceiros */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            6. Cookies de Terceiros
          </h2>
          <p>
            O XGirl.pt utiliza serviços de terceiros que instalam cookies:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento do usuário. Veja mais em <Link href="https://policies.google.com/privacy" className="text-pink-600 hover:underline dark:text-pink-400">policies.google.com/privacy</Link>.</li>
          </ul>
          <p>
            Esses cookies não coletam informações pessoais como nome ou endereço, mas sim dados anônimos sobre sua navegação.
          </p>
        </section>

        {/* Alterações */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            7. Alterações à Política de Cookies
          </h2>
          <p>
            Podemos atualizar esta Política de Cookies para refletir mudanças em nossas práticas ou na legislação aplicável, como o RGPD. As alterações serão publicadas nesta página, e recomendamos revisá-la regularmente.
          </p>
        </section>

        {/* Contato */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            8. Contato
          </h2>
          <p>
            Para dúvidas sobre esta política ou sobre os cookies utilizados, entre em contato:
          </p>
          <p>
            <strong>Email:</strong> <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link><br />
            <strong>Telefone:</strong> +351 910 253 456<br />
            <strong>DPO:</strong> <Link href="mailto:dpo@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">dpo@xgirl.pt</Link>
          </p>
        </section>

        {/* Atualização */}
        <section>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            <em>Última atualização: 27 de março de 2025</em>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Cookies;