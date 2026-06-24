export const getDictionary = async (locale: string) => {
  try {
    switch (locale) {
      case 'hi':
        return await import('../locales/hi.json').then((m) => m.default)
      case 'ta':
        return await import('../locales/ta.json').then((m) => m.default)
      case 'te':
        return await import('../locales/te.json').then((m) => m.default)
      case 'kn':
        return await import('../locales/kn.json').then((m) => m.default)
      case 'ml':
        return await import('../locales/ml.json').then((m) => m.default)
      case 'mr':
        return await import('../locales/mr.json').then((m) => m.default)
      case 'gu':
        return await import('../locales/gu.json').then((m) => m.default)
      case 'bn':
        return await import('../locales/bn.json').then((m) => m.default)
      case 'pa':
        return await import('../locales/pa.json').then((m) => m.default)
      case 'en':
      default:
        return await import('../locales/en.json').then((m) => m.default)
    }
  } catch (err) {
    console.error(`Failed to load dictionary for locale: ${locale}`, err)
    return await import('../locales/en.json').then((m) => m.default)
  }
}
