let GameTable = null;
let currentGame = null;

const debugMode = localStorage.getItem('debug') === 'true';
const isLocalhost = /minesweeper.ru|localhost/.test(document.location.href);
const jsPath = `${isLocalhost ? '' : '/minesweeper'}${debugMode ? '/src' : '/dist'}`;

require.config({
    baseUrl: jsPath,
    paths: {
        lang: 'localizate/lang',
        utility: 'modules/utility',
        game: 'modules/game',
        maps: 'modules/maps',
        view: 'modules/view',
        main: 'modules/main',
        global: 'scripts/global',
        statistics: 'modules/statistics',
        longPressEvent: 'modules/longPressEvent',
        iPad: 'modules/iPad',
        zoom: 'modules/zoom',
        confirm: 'https://gagikpog.ru/confirm/confirm.min',
        quickSettings: 'https://gagikpog.ru/data/libs/quicksettings.min',

        // styles
        mainStyle: 'css!styles/main',
        leaderBoardStyle: 'css!styles/leaderBoard'
    },
    waitSeconds: 15
});

// https://github.com/requirejs/requirejs/wiki/Fine-grained-URL-control
const load = requirejs.load;
requirejs.load = (context, moduleId, url) => {
    // modify url here
    let newUrl = url;
    if (/css!/.test(newUrl)) {
        newUrl = newUrl.replace(/css!/, '').replace(/.js$/, '');
        newUrl = `${newUrl}.css`;
    }
    newUrl = `${newUrl}?${VERSION}`;

    return load(context, moduleId, newUrl);
};

requirejs.createNode = (config, moduleName, url) => {
    let node = null;
    // node for styles
    if (/.css/.test(url)) {
        node = config.xhtml ?
            document.createElementNS('http://www.w3.org/1999/xhtml', 'html:link') :
            document.createElement('link');
            node.rel = 'stylesheet';
            node.href = url;
    } else {
        node = config.xhtml ?
            document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
            document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
    }
    node.charset = 'utf-8';
    node.async = true;
    return node;
};

const resolver = new Promise((resolve) => setTimeout(resolve, 1000));

require(['modules/main', 'confirm', 'global', 'mainStyle', 'leaderBoardStyle'], (main, mainStyle, leaderBoardStyle) => {
    main.documentLoaded(resolver);

    if (isTouchDevice()) {
        require(['modules/zoom']);
    }

});

const platform = navigator.platform.toLowerCase();
if (platform.includes('mac') || platform.includes('ipad') ||  platform.includes('iphone')) {
    require(['longPressEvent', 'iPad']);
}
