let GameTable = null;
let currentGame = null;

const resolver = new Promise((resolve) => setTimeout(resolve, 1000));

Promise.all([
    import('../modules/main.js'),
    import('./global.js')
]).then(([main]) => {
    main.documentLoaded(resolver);

    if (isTouchDevice()) {
        import('../modules/zoom.js');
    }
});

const platform = navigator.platform.toLowerCase();
if (platform.includes('mac') || platform.includes('ipad') ||  platform.includes('iphone')) {
    import('../modules/longPressEvent.js');
    import('../modules/iPad.js');
}
