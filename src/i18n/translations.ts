// i18n translations for multiple language support

export const languages = {
  en: 'English',
  es: 'Español',
  zh: '中文'
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      categories: 'Categories',
      newGames: 'New Games',
      popular: 'Popular',
      search: 'Search'
    },
    common: {
      playNow: 'Play Now',
      playGame: 'Play Game',
      loading: 'Loading...',
      loadingGame: 'Loading Game...',
      rating: 'Rating',
      views: 'Views',
      featured: 'Featured',
      new: 'New',
      allGames: 'All Games',
      viewAll: 'View All',
      searchPlaceholder: 'Search for games...',
      noResults: 'No games found',
      tryDifferentKeywords: 'Try searching with different keywords'
    },
    game: {
      description: 'Description',
      howToPlay: 'How to Play',
      gameControls: 'Game Controls',
      tips: 'Tips & Tricks',
      relatedGames: 'Related Games',
      moreGames: 'More Games Like This',
      playTime: 'Play Time',
      category: 'Category',
      freeToPlay: '100% Free to Play',
      instantGaming: 'Instant Gaming',
      crossPlatform: 'Cross-Platform',
      noDownload: 'No downloads, no registration required',
      playInstantly: 'Start playing immediately in your browser',
      worksEverywhere: 'Works on desktop, tablet, and mobile devices'
    },
    footer: {
      quickLinks: 'Quick Links',
      categories: 'Categories',
      support: 'Support',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      dmca: 'DMCA',
      cookiePolicy: 'Cookie Policy',
      newsletter: 'Subscribe to Our Newsletter',
      newsletterText: 'Get the latest game updates and exclusive offers!',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      copyright: 'All rights reserved',
      madeWith: 'Made with ❤️ by'
    },
    seo: {
      homeTitle: 'Play Free Online Games',
      homeDescription: 'Play the best free online games instantly in your browser. No downloads, no registration required.',
      searchTitle: 'Search Games',
      searchDescription: 'Search through our collection of free online games. Find your favorite games instantly.'
    },
    categories: {
      title: 'All Game Categories',
      games: 'games',
      popular: {
        title: 'Popular Games',
        description: 'Check out our most popular games across all categories.'
      },
      adventure: {
        title: 'Adventure Games',
        description: 'Embark on thrilling journeys and explore new worlds in our adventure games collection.'
      },
      noGames: 'No games found in this category.',
      browseAll: 'Browse all categories'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      categories: 'Categorías',
      newGames: 'Juegos Nuevos',
      popular: 'Popular',
      search: 'Buscar'
    },
    common: {
      playNow: 'Jugar Ahora',
      playGame: 'Jugar',
      loading: 'Cargando...',
      loadingGame: 'Cargando Juego...',
      rating: 'Calificación',
      views: 'Vistas',
      featured: 'Destacado',
      new: 'Nuevo',
      allGames: 'Todos los Juegos',
      viewAll: 'Ver Todo',
      searchPlaceholder: 'Buscar juegos...',
      noResults: 'No se encontraron juegos',
      tryDifferentKeywords: 'Intenta buscar con diferentes palabras clave'
    },
    game: {
      description: 'Descripción',
      howToPlay: 'Cómo Jugar',
      gameControls: 'Controles del Juego',
      tips: 'Consejos y Trucos',
      relatedGames: 'Juegos Relacionados',
      moreGames: 'Más Juegos Como Este',
      playTime: 'Tiempo de Juego',
      category: 'Categoría',
      freeToPlay: '100% Gratis',
      instantGaming: 'Juego Instantáneo',
      crossPlatform: 'Multiplataforma',
      noDownload: 'Sin descargas, sin registro',
      playInstantly: 'Comienza a jugar inmediatamente en tu navegador',
      worksEverywhere: 'Funciona en escritorio, tablet y móvil'
    },
    footer: {
      quickLinks: 'Enlaces Rápidos',
      categories: 'Categorías',
      support: 'Soporte',
      aboutUs: 'Acerca de Nosotros',
      contactUs: 'Contáctanos',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      dmca: 'DMCA',
      cookiePolicy: 'Política de Cookies',
      newsletter: 'Suscríbete a Nuestro Boletín',
      newsletterText: '¡Recibe las últimas actualizaciones y ofertas exclusivas!',
      emailPlaceholder: 'Ingresa tu email',
      subscribe: 'Suscribirse',
      copyright: 'Todos los derechos reservados',
      madeWith: 'Hecho con ❤️ por'
    },
    seo: {
      homeTitle: 'Juega Juegos Gratis en Línea',
      homeDescription: 'Juega los mejores juegos gratuitos en línea al instante en tu navegador. Sin descargas, sin registro.',
      searchTitle: 'Buscar Juegos',
      searchDescription: 'Busca en nuestra colección de juegos gratuitos en línea. Encuentra tus juegos favoritos al instante.'
    },
    categories: {
      title: 'Todas las Categorías de Juegos',
      games: 'juegos',
      popular: {
        title: 'Juegos Populares',
        description: 'Echa un vistazo a nuestros juegos más populares en todas las categorías.'
      },
      adventure: {
        title: 'Juegos de Aventura',
        description: 'Embárcate en emocionantes viajes y explora nuevos mundos en nuestra colección de juegos de aventura.'
      },
      noGames: 'No se encontraron juegos en esta categoría.',
      browseAll: 'Explorar todas las categorías'
    }
  },
  zh: {
    nav: {
      home: '首页',
      categories: '分类',
      newGames: '新游戏',
      popular: '热门',
      search: '搜索'
    },
    common: {
      playNow: '立即玩',
      playGame: '开始游戏',
      loading: '加载中...',
      loadingGame: '游戏加载中...',
      rating: '评分',
      views: '浏览量',
      featured: '精选',
      new: '新',
      allGames: '所有游戏',
      viewAll: '查看全部',
      searchPlaceholder: '搜索游戏...',
      noResults: '未找到游戏',
      tryDifferentKeywords: '尝试使用不同的关键词搜索'
    },
    game: {
      description: '描述',
      howToPlay: '如何玩',
      gameControls: '游戏控制',
      tips: '技巧与窍门',
      relatedGames: '相关游戏',
      moreGames: '更多类似游戏',
      playTime: '游戏时间',
      category: '类别',
      freeToPlay: '100% 免费',
      instantGaming: '即时游戏',
      crossPlatform: '跨平台',
      noDownload: '无需下载，无需注册',
      playInstantly: '在浏览器中立即开始游戏',
      worksEverywhere: '支持桌面、平板和移动设备'
    },
    footer: {
      quickLinks: '快速链接',
      categories: '游戏分类',
      support: '支持',
      aboutUs: '关于我们',
      contactUs: '联系我们',
      privacyPolicy: '隐私政策',
      termsOfService: '服务条款',
      dmca: 'DMCA',
      cookiePolicy: 'Cookie政策',
      newsletter: '订阅我们的通讯',
      newsletterText: '获取最新游戏更新和独家优惠！',
      emailPlaceholder: '输入您的邮箱',
      subscribe: '订阅',
      copyright: '版权所有',
      madeWith: '用❤️制作'
    },
    seo: {
      homeTitle: '玩免费在线游戏',
      homeDescription: '在浏览器中即时玩最好的免费在线游戏。无需下载，无需注册。',
      searchTitle: '搜索游戏',
      searchDescription: '搜索我们的免费在线游戏集合。立即找到您喜欢的游戏。'
    },
    categories: {
      title: '所有游戏分类',
      games: '游戏',
      popular: {
        title: '热门游戏',
        description: '查看我们所有分类中最受欢迎的游戏。'
      },
      adventure: {
        title: '冒险游戏',
        description: '在我们的冒险游戏集合中踏上刺激的旅程，探索新世界。'
      },
      noGames: '此分类中未找到游戏。',
      browseAll: '浏览所有分类'
    }
  }
} as const;

export function getTranslations(lang: Language = defaultLang) {
  return translations[lang] || translations[defaultLang];
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}