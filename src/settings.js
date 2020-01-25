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
    let show = false;
    initSettings.showSettings = () => {
        if (show) {
            settings.hide();
        } else {
            settings.show();
        }
        show = !show;
    }
}

function loadSettings() {
    const godMode = window.localStorage.getItem('godMode') === 'true';
    const animation = window.localStorage.getItem('animation') !== 'false';
    const level = window.localStorage.getItem('level') || 'beginner';

    document.querySelector('#level').value = level;
    levelItemChanged({value: level});

    Game.godMode = godMode;
    Game.animationSpeed = animation ? Game.defaultAnimationSpeed : 0;
}
