"use client";
import Link from 'next/link';

function Privacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto p-8 rounded-lg shadow-2xl bg-white dark:bg-[#1a0a10] text-gray-700 dark:text-gray-200 space-y-12">
        <h1 className="text-center text-4xl font-bold mb-12 border-b border-gray-300 dark:border-gray-700 pb-4 text-pink-600 dark:text-pink-400">
          Política de Privacidade
        </h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            1. Introdução
          </h2>
          <p>
            A XGirl.pt valoriza a privacidade dos seus usuários e está comprometida em proteger os dados pessoais que você compartilha conosco. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.
          </p>
          <p>
            Ao utilizar nosso site, você concorda com as práticas descritas neste documento. Caso tenha dúvidas, entre em contato conosco.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            2. Entidade Responsável
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Nome:</strong> XGirl.pt</li>
            <li><strong>Responsável Legal:</strong> XGirl.pt, LDA.</li>
            <li><strong>Finalidade:</strong> Gestão de classificados eróticos e serviços associados.</li>
            <li><strong>Base Legal:</strong> Consentimento do usuário e cumprimento de obrigações legais.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            3. Dados da Empresa
          </h2>
          <p>
            <strong>Entidade:</strong> XGirl.pt, LDA.<br />
            <strong>NIF:</strong> 123456789<br />
            <strong>Endereço:</strong> Avenida da Liberdade, n.º 100, Lisboa, Portugal.<br />
            <strong>Email:</strong> <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link>
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            4. Tipos de Dados Coletados
          </h2>
          <ul className="list-disc list-inside ml-6 space-y-3">
            <li><strong>Dados de Identificação:</strong> Nome, email e informações de contato fornecidas no cadastro.</li>
            <li><strong>Dados de Perfil:</strong> Fotos, descrições e preferências pessoais adicionadas ao perfil.</li>
            <li><strong>Dados de Uso:</strong> Informações sobre como você interage com o site, como mensagens e agendamentos.</li>
            <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador e cookies para melhorar a experiência do usuário.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            5. Contato
          </h2>
          <p>
            Email: <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link><br />
            Telefone: +351 910253456
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            6. Referências Legais
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><Link href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679" className="text-pink-600 hover:underline dark:text-pink-400">Regulamento Geral de Proteção de Dados (RGPD)</Link></li>
            <li><Link href="https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations_en" className="text-pink-600 hover:underline dark:text-pink-400">Regras da UE para Empresas e Organizações</Link></li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            7. Alterações
          </h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou na legislação. Recomendamos que você revise este documento regularmente.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            8. Direitos do Usuário
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Direito de acessar, corrigir ou excluir seus dados pessoais.</li>
            <li>Direito de retirar o consentimento a qualquer momento, entrando em contato conosco.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            9. Segurança
          </h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou uso indevido.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            10. Cookies
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Utilizamos cookies para melhorar sua experiência no site. Você pode gerenciar suas preferências de cookies nas configurações do navegador.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            11. Links Úteis
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><Link href="https://ec.europa.eu/info/law/law-topic/data-protection/data-protection-eu_en" className="text-pink-600 hover:underline dark:text-pink-400">Proteção de Dados na UE</Link></li>
            <li><Link href="https://www.europarl.europa.eu/doceo/document/E-9-2019-003013-ASW_EN.html" className="text-pink-600 hover:underline dark:text-pink-400">Perguntas Frequentes do Parlamento Europeu</Link></li>
            <li><Link href="https://www.cnil.fr/en/home" className="text-pink-600 hover:underline dark:text-pink-400">Autoridade Francesa de Proteção de Dados</Link></li>
          </ul>
        </section>

        <section>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            <em>Última atualização: 27 de março de 2025</em>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacidade;