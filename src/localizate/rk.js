function rk(str) {

    const rmContext = (s) => (s || '').replace(/^.*@@s@/, '');

    if (rk.lang === 'en') {
        return rmContext(str);
    }
    const translateMap = window.translate || {};
    return translateMap[str] ? translateMap[str] : rmContext(str);
}

fetch('/minesweeper/api/en-ru.json').then((res) => {
    return res.json();
}).then((data) => {
    window.translate = data;
    rk.lang = getCookie('lang') || 'ru';
});