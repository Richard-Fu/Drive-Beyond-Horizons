// 主题配置文件 - 一键切换不同游戏站主题
// 只需修改这个文件，就能快速部署新的游戏站

export default {
  // 网站基础信息
  site: {
    name: 'GeoGuessr Free',
    url: 'https://geo-guessr.io', // 修改为实际域名
    description: 'The best free GeoGuessr alternative with unlimited gameplay',
    author: 'GameHub Team',
    language: 'en',
  },

  // 主关键词配置
  mainKeyword: {
    primary: 'geoguessr',
    variants: ['geoguessr free', 'geoguessr unlimited', 'geoguessr alternative'],
    branded: 'GeoGuessr Free',
  },

  // 主游戏配置
  featuredGame: {
    title: 'GeoGuessr Free - Unlimited Geography Game',
    description: 'Play free GeoGuessr alternative! Guess the world from anywhere - explore stunning locations across USA, Europe, Asia, Africa and test your geography skills with our unblocked unlimited game.',
    embedUrl: 'https://openguessr.com',
    image: 'https://geoguessr.io/data/image/posts/geoguessr-free-banner2.jpg',
    category: 'Geography',
    rating: 9.5,
    playTime: '15-30 min',
    tips: [
      '🔍 Look for road signs and license plates for clues',
      '🏛️ Architecture styles can reveal geographic regions',
      '🌿 Vegetation types indicate climate zones',
      '🚗 Car models and driving sides help identify countries',
      '📡 Power lines and infrastructure give location hints',
      '🏔️ Mountain ranges and landscapes are unique identifiers',
      '🌍 Pay attention to the sun position for hemisphere clues',
      '🛣️ Road markings and signs vary by country'
    ]
  },

  // SEO配置
  seo: {
    titleTemplate: '%s | Play Free Online Games',
    defaultImage: '/images/social-card.png',
    twitterHandle: '@gamehub',
    ogType: 'website',
  },

  // 颜色主题
  colors: {
    primary: '#4fad82',
    secondary: '#b44541',
    accent: '#f59e0b',
    dark: '#1f2937',
    light: '#f8f8f7',
    // 渐变色
    gradients: {
      primary: 'from-green-500 to-emerald-600',
      secondary: 'from-blue-500 to-purple-600',
      accent: 'from-orange-400 to-red-500',
      dark: 'from-gray-800 to-gray-900',
    }
  },

  // 分类配置
  categories: {
    action: {
      title: 'Action Games',
      description: 'Fast-paced action games that test your reflexes and skills',
      icon: '⚔️',
      color: 'red',
      gradient: 'from-red-500 to-orange-600'
    },
    puzzle: {
      title: 'Puzzle Games',
      description: 'Challenge your mind with brain teasers and logic puzzles',
      icon: '🧩',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600'
    },
    sports: {
      title: 'Sports Games',
      description: 'Experience the thrill of sports competition',
      icon: '⚽',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    racing: {
      title: 'Racing Games',
      description: 'High-speed racing action and driving challenges',
      icon: '🏎️',
      color: 'yellow',
      gradient: 'from-yellow-400 to-orange-500'
    }
  },

  // 社交媒体
  social: {
    facebook: 'https://facebook.com/gamehub',
    twitter: 'https://twitter.com/gamehub',
    instagram: 'https://instagram.com/gamehub',
    youtube: 'https://youtube.com/gamehub',
  },

  // 广告位配置（预留）
  ads: {
    enabled: false,
    slots: {
      header: '',
      sidebar: '',
      footer: '',
      inContent: ''
    }
  },

  // 功能开关
  features: {
    comments: true,
    ratings: true,
    relatedGames: true,
    newsletter: false,
    darkMode: true,
    pwa: true,
    analytics: false,
  }
}