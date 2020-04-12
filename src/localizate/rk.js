function rk(str) {

    const rmContext = (s) => (s || '').replace(/^.*@@s@/, '');

    if (rk.lang === 'en') {
        return rmContext(str);
    }
    const translateMap = window.translate || {};
    return translateMap[str] ? translateMap[str] : rmContext(str);
}

rk.lang = getLang();

const langs = {'ru' : 0, 'en' : 1};

function getLang() {
    return getCookie('lang') || 'ru';
}
