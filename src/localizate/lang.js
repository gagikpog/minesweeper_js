define('localizate/lang', ['modules/utility'], function(utility) {
    'use strict';

    const getLang = () => utility.getCookie('lang') || 'ru';

    const currentLang = getLang();
    const rk = (str) => {

        const rmContext = (s) => (s || '').replace(/^.*@@s@/, '');

        if (currentLang === 'en') {
            return rmContext(str);
        }
        const translateMap = window.translate || {};
        return translateMap[str] ? translateMap[str] : rmContext(str);
    }

    const langs = {'ru' : 0, 'en' : 1};

    return {
        rk,
        langs,
        getLang
    }
});
