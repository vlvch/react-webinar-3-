import translate from './translate';

class I18n {
  constructor(services, lang = 'ru') {
    this.services = services;
    this.lang = lang
    this.listeners = [];
  }

  setLang = (lang) => {
    if (this.lang === lang) return;
    this.lang = lang;
    this.listeners.forEach((listener) => listener(lang));
    this.services.api.setHeader('X-Lang', lang);
  }

  getLang = () => {
    return this.lang;
  }

  t = (text, number) => {
    return translate(this.lang, text, number)
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default I18n;
