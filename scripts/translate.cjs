const fs = require('fs');
const path = require('path');
const https = require('https');

const localesDir = path.join(__dirname, '../src/locales');
const enFilePath = path.join(localesDir, 'en.json');

// Supported target Indian locales
const targetLocales = ['hi', 'ta', 'te', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa'];

// Map locale codes to Google Translate language codes
const langCodeMap = {
  hi: 'hi',
  ta: 'ta',
  te: 'te',
  kn: 'kn',
  ml: 'ml',
  mr: 'mr',
  gu: 'gu',
  bn: 'bn',
  pa: 'pa'
};

function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodedText}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          // Google Translate response is a nested array. The translated pieces are in parsed[0]
          const translatedParts = parsed[0].map(item => item[0]).join('');
          resolve(translatedParts);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function translateObject(obj, targetLang) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = await translateObject(obj[key], targetLang);
    } else if (typeof obj[key] === 'string') {
      // Small delay to prevent rate limit hits
      await new Promise(r => setTimeout(r, 100));
      try {
        result[key] = await translateText(obj[key], targetLang);
        console.log(`Translated [${key}]: "${obj[key]}" -> "${result[key]}"`);
      } catch (err) {
        console.warn(`Translation failed for key ${key}:`, err.message);
        result[key] = obj[key]; // Fallback to English
      }
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

async function run() {
  console.log('Starting translation pipeline...');
  if (!fs.existsSync(enFilePath)) {
    console.error('Master English dictionary file (en.json) not found!');
    process.exit(1);
  }

  const enContent = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

  for (const locale of targetLocales) {
    const targetLang = langCodeMap[locale];
    console.log(`\n--- Auto Translating: [${locale.toUpperCase()}] ---`);
    const translatedDict = await translateObject(enContent, targetLang);
    
    const outputFilePath = path.join(localesDir, `${locale}.json`);
    fs.writeFileSync(outputFilePath, JSON.stringify(translatedDict, null, 2), 'utf8');
    console.log(`Successfully generated: src/locales/${locale}.json`);
  }
  console.log('\nTranslation pipeline completed successfully!');
}

run().catch(console.error);
