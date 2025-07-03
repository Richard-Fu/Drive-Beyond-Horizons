import { translations, languages, defaultLang, type Language } from './translations';

/**
 * 从URL中提取语言代码
 */
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

/**
 * 获取指定语言的翻译函数
 */
export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 回退到默认语言
        value = translations[defaultLang];
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return key; // 如果都找不到，返回key本身
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}

/**
 * 生成带语言前缀的路径
 */
export function getLocalizedPath(path: string, lang: Language): string {
  // 如果是默认语言且不需要前缀，直接返回路径
  if (lang === defaultLang) {
    return path;
  }
  
  // 确保路径以/开头
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}

/**
 * 移除路径中的语言前缀
 */
export function removeLanguagePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] in languages) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

/**
 * 获取当前页面的所有语言版本URL
 */
export function getAlternateLanguageUrls(currentUrl: URL): Record<Language, string> {
  const pathWithoutLang = removeLanguagePrefix(currentUrl.pathname);
  const urls: Record<Language, string> = {} as any;
  
  for (const lang of Object.keys(languages) as Language[]) {
    urls[lang] = getLocalizedPath(pathWithoutLang, lang);
  }
  
  return urls;
}

/**
 * 简化的翻译函数，用于快速调用
 */
export function t(key: string, lang: Language = defaultLang): string {
  return useTranslations(lang)(key);
} 