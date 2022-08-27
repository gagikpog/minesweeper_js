import * as utility from './utility.js';

export const getLang = () => utility.getCookie('lang') || 'ru';

const currentLang = getLang();
export const rk = (str) => {

    const rmContext = (s) => (s || '').replace(/^.*@@s@/, '');

    if (currentLang === 'en') {
        return rmContext(str);
    }
    const translateMap = window.translate || {};
    return translateMap[str] ? translateMap[str] : rmContext(str);
}

export const langs = {'ru' : 0, 'en' : 1};
