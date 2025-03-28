"use client";
import Link from 'next/link';

function DadosSensíveis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto p-8 rounded-lg shadow-2xl bg-white dark:bg-[#1a0a10] text-gray-700 dark:text-gray-200 space-y-12">
        <h1 className="text-center text-4xl font-bold mb-12 border-b border-gray-300 dark:border-gray-700 pb-4 text-pink-600 dark:text-pink-400">
          Declaração de Proteção de Dados Sensíveis
        </h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            1. Introdução
          </h2>
          <p>
            No XGirl.pt, tratamos dados sensíveis relacionados à sua sexualidade com o maior cuidado e em conformidade com o Regulamento Geral de Proteção de Dados (RGPD) da União Europeia. Esta declaração explica como coletamos, processamos e protegemos esses dados.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            2. Dados Coletados
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Dados pessoais fornecidos no cadastro (nome, email, etc.).</li>
            <li>Informações de perfil, como descrições, fotos e preferências.</li>
            <li>Dados de interação com o site (mensagens, agendamentos, etc.).</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            3. Finalidade do Tratamento
          </h2>
          <p>
            Os dados sensíveis são processados para:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Permitir a criação e gestão do seu perfil na plataforma.</li>
            <li>Facilitar a comunicação entre usuários.</li>
            <li>Garantir a conformidade com as leis aplicáveis e prevenir atividades ilegais.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            4. Compartilhamento com Terceiros
          </h2>
          <p>
            Seus dados podem ser compartilhados com terceiros em países sem legislação de proteção de dados equivalente, mas apenas para verificar a legalidade do conteúdo e proteger os direitos de terceiros, conforme consentido no registro.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            5. Seus Direitos
          </h2>
          <p>
            Você tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento. Para exercer esses direitos, entre em contato conosco em <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default DadosSensíveis;