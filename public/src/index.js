window.GameTable = null;
window.currentGame = null;

const resolver = new Promise((resolve) => setTimeout(resolve, 1000));

Promise.all([
    import('./js/main.js'),
    import('./js/global.js')
]).then(([main]) => {
    main.documentLoaded(resolver);

    import('./js/zoom.js');
});



const platform = navigator.platform.toLowerCase();
if (platform.includes('mac') || platform.includes('ipad') ||  platform.includes('iphone')) {
    import('./js/longPressEvent.js');
    import('./js/iPad.js');
}
