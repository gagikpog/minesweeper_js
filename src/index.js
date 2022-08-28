import '@/styles/index.scss';
window.GameTable = null;
window.currentGame = null;

const resolver = new Promise((resolve) => setTimeout(resolve, 1000));

Promise.all([
    import('./js/main.js'),
    import('./js/global.js')
]).then(([main]) => {
    main.documentLoaded(resolver);

    if (isTouchDevice()) {
        import('./js/zoom.js');
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`/sw.js?v=${VERSION}`).then(function(registration) {
        console.log('Service worker зарегистрирован:', registration);
    }).catch(function(error) {
        console.log('Ошибка при регистрации service worker-а:', error);
    });
}

const platform = navigator.platform.toLowerCase();
if (platform.includes('mac') || platform.includes('ipad') ||  platform.includes('iphone')) {
    import('./js/longPressEvent.js');
    import('./js/iPad.js');
}
