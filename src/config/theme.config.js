// 主题配置文件 - 一键切换不同游戏站主题
// 只需修改这个文件，就能快速部署新的游戏站

export default {
  // 网站基础信息
  site: {
    name: 'Drive Beyond Horizons',
    url: 'https://drivebeyondhorizon.com', // 修改为实际域名
    description: 'Experience epic racing adventures with realistic driving physics and stunning landscapes',
    author: 'Racing Games Hub',
    language: 'en',
  },

  // 主关键词配置
  mainKeyword: {
    primary: 'drive beyond horizons',
    variants: ['drive beyond horizons free', 'racing game', 'driving simulation'],
    branded: 'Drive Beyond Horizons',
  },

  // 主游戏配置
  featuredGame: {
    title: 'Drive Beyond Horizons - Epic Racing Adventure',
    description: 'Experience the most thrilling racing game with realistic driving physics! Master high-speed racing, navigate challenging tracks, and conquer diverse terrains in this free online driving simulation.',
    embedUrl: 'https://drivebeyondhorizon.com',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2625420/header.jpg?t=1746031041',
    category: 'Racing',
    rating: 4.5,
    playTime: '20-45 min',
    tips: [
      '🏎️ Master the racing lines for optimal lap times',
      '🎮 Use WASD or arrow keys for smooth control',
      '🚙 Choose the right vehicle for each track',
      '🏁 Brake before corners to maintain control',
      '⚡ Learn the track layouts to improve times',
      '🌟 Practice makes perfect - repeat challenging sections',
      '🛣️ Watch for track conditions and weather changes',
      '🏆 Complete races for the best possible times'
    ]
  },

  // SEO配置
  seo: {
    titleTemplate: '%s | Drive Beyond Horizons Racing Games',
    defaultImage: '/images/drive-beyond-horizons-social.jpg',
    twitterHandle: '@drivebeyond',
    ogType: 'website',
  },

  // 颜色主题 (赛车主题 - 黑色、红色、银色)
  colors: {
    primary: '#dc2626', // 赛车红
    secondary: '#1f2937', // 深灰黑
    accent: '#f59e0b', // 金黄色
    dark: '#111827',
    light: '#f8fafc',
    // 渐变色
    gradients: {
      primary: 'from-red-600 to-red-700',
      secondary: 'from-gray-800 to-gray-900',
      accent: 'from-yellow-400 to-orange-500',
      dark: 'from-gray-900 to-black',
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
      gradient: 'from-red-500 to-red-600'
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
    facebook: 'https://facebook.com/drivebeyondhorizons',
    twitter: 'https://twitter.com/drivebeyond',
    instagram: 'https://instagram.com/drivebeyondhorizons',
    youtube: 'https://youtube.com/drivebeyondhorizons',
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