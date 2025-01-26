module.exports = {
    siteUrl: 'https://www.xgirl.pt', // Coloque aqui o URL do seu site
    generateRobotsTxt: true, // Gera um arquivo robots.txt junto com o sitemap
    // Opcional: Configurações adicionais, como políticas do robots.txt
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/', disallow: ['/admin/', '/login/'] },
      ],
    },
    // Opcional: Configurações adicionais, como prioridades de URL
    // Exemplo:
    // priority: 0.8,
    // changefreq: 'daily',
  };