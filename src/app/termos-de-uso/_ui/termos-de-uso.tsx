"use client";
import Link from 'next/link';

function Termos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto p-8 rounded-lg shadow-2xl bg-white dark:bg-[#1a0a10] text-gray-700 dark:text-gray-200 space-y-12">
        <h1 className="text-center text-4xl font-bold mb-12 border-b border-gray-300 dark:border-gray-700 pb-4 text-pink-600 dark:text-pink-400">
          Termos e Condições - XGirl.pt
        </h1>

        {/* Introdução */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            1. Introdução
          </h2>
          <p>
            Bem-vindo ao XGirl.pt, uma plataforma online dedicada à publicação de anúncios de serviços de entretenimento para adultos. Estes Termos e Condições ("T&C") regulam a utilização do site XGirl.pt, propriedade da XGirl.pt, LDA., e aplicam-se a todos os visitantes e anunciantes (coletivamente "Usuários"). Ao acessar ou utilizar o site, você aceita plenamente e sem reservas estes T&C. Caso não concorde com qualquer parte deste documento, recomendamos que não utilize nossos serviços.
          </p>
          <p>
            O XGirl.pt reserva-se o direito de modificar estes T&C a qualquer momento, sem aviso prévio, para adequá-los à legislação aplicável ou às necessidades operacionais. As alterações serão publicadas nesta página, e o uso contínuo do site após tais mudanças constitui aceitação das mesmas.
          </p>
        </section>

        {/* Identificação */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            2. Identificação
          </h2>
          <p>
            Em conformidade com a Lei 34/2002, de 11 de julho, sobre Serviços da Sociedade da Informação e Comércio Eletrônico, informamos:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Razão Social:</strong> XGirl.pt, LDA.</li>
            <li><strong>NIF:</strong> 123456789</li>
            <li><strong>Sede Social:</strong> Avenida da Liberdade, n.º 100, Lisboa, Portugal</li>
            <li><strong>Email:</strong> <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link></li>
            <li><strong>Telefone:</strong> +351 910 253 456</li>
          </ul>
        </section>

        {/* Condições de Idade */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            3. Condições de Idade
          </h2>
          <p>
            O XGirl.pt é um site destinado exclusivamente a maiores de 18 anos. Menores de idade, mesmo com autorização dos pais ou legalmente emancipados, não estão autorizados a acessar ou utilizar o site. Ao navegar no XGirl.pt, você declara ser maior de 18 anos e assume total responsabilidade por essa afirmação.
          </p>
          <p>
            Reservamo-nos o direito de solicitar documentos de identificação (ex.: RG, Passaporte) para verificar a idade dos usuários, especialmente em caso de suspeita de acesso por menores. Contas de usuários menores de 18 anos serão imediatamente bloqueadas ou removidas.
          </p>
        </section>

        {/* Condições de Acesso e Uso */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            4. Condições de Acesso e Uso
          </h2>
          <p>
            O acesso ao XGirl.pt é gratuito para visitantes, mas a publicação de anúncios está dividida em dois planos: <strong>Free</strong> e <strong>Premium</strong>. O plano Free permite a publicação de anúncios básicos sem custo, enquanto o plano Premium, mediante pagamento de uma mensalidade, oferece vantagens adicionais, como maior visibilidade, selos de autenticidade e funcionalidades exclusivas.
          </p>
          <p>
            O usuário garante a autenticidade e veracidade de todos os dados fornecidos ao XGirl.pt e será o único responsável por declarações falsas ou imprecisas. É obrigação do usuário utilizar o site de forma adequada, respeitando as leis, a boa-fé, a ordem pública e estes T&C.
          </p>
          <h3 className="text-xl font-medium">4.1. Regras de Publicação</h3>
          <p>O usuário pode:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Publicar anúncios ilimitados no plano Free, desde que respeitem estes T&C.</li>
            <li>Optar pelo plano Premium para maior visibilidade e funcionalidades adicionais.</li>
            <li>Gerenciar anúncios com uma única conta de usuário.</li>
            <li>Adicionar fotos reais, desde que sejam autorizadas e pertençam ao anunciante.</li>
          </ul>
          <p>O usuário <strong>não pode</strong>:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Publicar conteúdo ilegal, como pornografia infantil, tráfico humano, violência ou exploração sexual.</li>
            <li>Usar fotos de terceiros sem consentimento ou com marcas d’água de outros sites.</li>
            <li>Incluir atos sexuais explícitos ou nudez total em categorias como massagens.</li>
            <li>Publicar anúncios de menores de 18 anos ou com linguagem que sugira menores.</li>
            <li>Promover práticas sexuais não seguras ou o uso de drogas/álcool.</li>
            <li>Colocar links externos fora dos campos designados ou cidades fora do campo "local".</li>
          </ul>
          <h3 className="text-xl font-medium">4.2. Planos e Vantagens</h3>
          <p>
            - <strong>Plano Free:</strong> Publicação gratuita de até 3 anúncios por categoria com fotos reais ou sem fotos. Limitações incluem menor visibilidade e ausência de selos de destaque.
          </p>
          <p>
            - <strong>Plano Premium:</strong> Mediante mensalidade, oferece vantagens como selo "Fotos Reais", destaque na lista de anúncios, fundo colorido, opção "Voltar ao Início" e acesso prioritário em dispositivos móveis. A mensalidade é fixa e renovada automaticamente até cancelamento.
          </p>
        </section>

        {/* Revisão e Moderação */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            5. Revisão e Moderação
          </h2>
          <p>
            Todos os anúncios passam por revisão prévia (24-72 horas) antes da publicação. Utilizamos métodos automatizados e manuais para garantir conformidade com estes T&C e a legislação aplicável. Anúncios que violem as regras serão bloqueados ou removidos sem aviso prévio.
          </p>
          <p>
            Caso seja necessário, o XGirl.pt pode solicitar documentos de identificação para verificar a idade ou autenticidade do anunciante. Anúncios rejeitados incluem aqueles com:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Menores de 18 anos.</li>
            <li>Fotos falsas ou não autorizadas.</li>
            <li>Conteúdo violento, abusivo ou ilegal.</li>
          </ul>
          <p>
            Em caso de suspeita de crime, o XGirl.pt notificará as autoridades competentes, fornecendo informações conforme exigido por lei.
          </p>
        </section>

        {/* Pagamentos e Assinaturas */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            6. Pagamentos e Assinaturas
          </h2>
          <p>
            O plano Premium requer o pagamento de uma mensalidade, processada de forma segura via plataforma de pagamento integrada. Os preços atuais (IVA incluído) são:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>15 dias:</strong> 15,00 €</li>
            <li><strong>30 dias:</strong> 30,00 €</li>
            <li><strong>90 dias:</strong> 90,00 € (desconto de 25% por mês)</li>
          </ul>
          <p>
            A assinatura é renovada automaticamente até que o usuário solicite o cancelamento. Não há reembolso para períodos já pagos, exceto conforme exigido por lei (ver seção 6.1).
          </p>
          <h3 className="text-xl font-medium">6.1. Direito de Resolução</h3>
          <p>
            Nos termos do Decreto-Lei nº 24/2014, de 14 de fevereiro, o usuário tem 14 dias para cancelar a assinatura sem custos, desde que o pedido seja feito antes do início da publicação do anúncio Premium. Após esse período, não haverá reembolso.
          </p>
          <p>
            Para solicitar reembolso, envie um email para <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link> com os dados da conta e comprovante de pagamento. O reembolso será processado em até 30 dias via transferência bancária.
          </p>
        </section>

        {/* Sanções e Cancelamento de Conta */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            7. Sanções e Cancelamento de Conta
          </h2>
          <p>
            O XGirl.pt pode suspender ou cancelar contas de usuários que violem estes T&C, incluindo:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Comportamento inadequado (ex.: conteúdo ilegal, ofensivo ou racista).</li>
            <li>Publicação de conteúdo não autorizado (ex.: menores, violência, drogas).</li>
            <li>Solicitação direta do usuário para cancelamento.</li>
          </ul>
          <p>
            O cancelamento pode ocorrer sem aviso prévio, e o XGirl.pt reserva-se o direito de banir permanentemente usuários que façam mau uso do site ou do sistema de denúncias.
          </p>
        </section>

        {/* Propriedade Intelectual e Industrial */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            8. Propriedade Intelectual e Industrial
          </h2>
          <p>
            Todos os conteúdos do XGirl.pt (textos, imagens, logotipos, software, etc.) são propriedade da XGirl.pt, LDA. ou de seus licenciadores, protegidos pelas leis de propriedade intelectual de Portugal e da UE. O usuário não adquire direitos sobre esses conteúdos além do necessário para uso pessoal do site.
          </p>
          <p>
            É proibida a reprodução, distribuição ou modificação de qualquer conteúdo sem autorização expressa do XGirl.pt.
          </p>
        </section>

        {/* Exclusão de Garantias e Responsabilidade */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            9. Exclusão de Garantias e Responsabilidade
          </h2>
          <p>
            O XGirl.pt oferece seus serviços "como estão", sem garantias de exatidão ou disponibilidade contínua. Não nos responsabilizamos por:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Erros ou omissões no conteúdo dos anúncios.</li>
            <li>Danos causados por vírus ou mau uso do site.</li>
            <li>Interações entre usuários fora da plataforma.</li>
          </ul>
          <p>
            A responsabilidade do XGirl.pt é limitada a danos diretamente causados por nossa conduta dolosa.
          </p>
        </section>

        {/* Procedimento para Atividades Ilícitas */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            10. Procedimento para Atividades Ilícitas
          </h2>
          <p>
            Se um usuário ou terceiro identificar atividades ilícitas no site, deve notificar o XGirl.pt em <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link>, especificando as infrações. Tomaremos medidas imediatas para investigar e, se necessário, remover o conteúdo.
          </p>
        </section>

        {/* Legislação Aplicável e Jurisdição */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            11. Legislação Aplicável e Jurisdição
          </h2>
          <p>
            Estes T&C são regidos pela legislação portuguesa. Qualquer disputa será submetida aos tribunais competentes de Lisboa, Portugal, salvo disposição legal em contrário.
          </p>
        </section>

        {/* Resolução Alternativa de Litígios */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            12. Resolução Alternativa de Litígios
          </h2>
          <p>
            Em caso de litígio de consumo, os usuários podem recorrer ao:
          </p>
          <p>
            <strong>Centro de Arbitragem de Conflitos de Consumo de Lisboa</strong><br />
            Telefone: 218 807 030<br />
            Email: <Link href="mailto:juridico@centroarbitragemlisboa.pt" className="text-pink-600 hover:underline dark:text-pink-400">juridico@centroarbitragemlisboa.pt</Link><br />
            Site: <Link href="http://www.centroarbitragemlisboa.pt" className="text-pink-600 hover:underline dark:text-pink-400">www.centroarbitragemlisboa.pt</Link>
          </p>
          <p>
            Consulte o Portal do Consumidor em <Link href="http://www.consumidor.pt" className="text-pink-600 hover:underline dark:text-pink-400">www.consumidor.pt</Link> para mais informações (artigo 18.º da Lei n.º 144/2015).
          </p>
        </section>

        {/* Disposições Finais */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
            13. Disposições Finais
          </h2>
          <p>
            Estes T&C entram em vigor na data de sua publicação e substituem quaisquer versões anteriores. Recomendamos revisá-los periodicamente. Para dúvidas ou suporte, entre em contato em <Link href="mailto:info@xgirl.pt" className="text-pink-600 hover:underline dark:text-pink-400">info@xgirl.pt</Link>.
          </p>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            <em>Última atualização: 27 de março de 2025</em>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Termos;