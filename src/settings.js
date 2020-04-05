function initSettings() {
    loadSettings();
    const settings = QuickSettings.create(0, 0, 'Settings');
    settings.hide();
    settings.addBoolean('God mode', Game.godMode, (val) => {
        Game.godMode = val;
        window.localStorage.setItem('godMode', val);
    });

    settings.addBoolean('Animation', !!Game.animationSpeed, (val) => {
        Game.animationSpeed = val ? Game.defaultAnimationSpeed : 0;
        window.localStorage.setItem('animation', val);
    });

    settings.addNumber('Zoom', Game.blockSize.min, Game.blockSize.max, Game.blockSize.value, 1, (val) => {
        Game.blockSize.value = val;
        window.localStorage.setItem('blockSize', val);
        Game.setSize();
    });

    let show = false;
    initSettings.showSettings = () => {
        if (show) {
            settings.hide();
        } else {
            settings.setValue('Zoom',  Game.blockSize.value)
            settings.show();
        }
        show = !show;
    }
}

function loadSettings() {
    const godMode = window.localStorage.getItem('godMode') === 'true';
    const animation = window.localStorage.getItem('animation') !== 'false';
    const level = window.localStorage.getItem('level') || 'beginner';
    const blockSizeValue = +(window.localStorage.getItem('blockSize') || Game.blockSize.default);
    const userName = window.localStorage.getItem('userName') || '';

    document.querySelector('#level').value = level;
    levelItemChanged({value: level});

    const blocksOptimalSize = Math.floor(getOptimalSize());

    Game.blockSize.min = blocksOptimalSize;
    Game.blockSize.default = blocksOptimalSize;
    Game.blockSize.value = blockSizeValue;
    Game.godMode = godMode;
    Game.animationSpeed = animation ? Game.defaultAnimationSpeed : 0;
    Game.userName = userName;
}
