import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from '@/i18n/en'

void i18n.use(initReactI18next).init({
  resources: { en },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'customer', 'dashboard'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n
