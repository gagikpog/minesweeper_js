function initSettings() {
    loadSettings();
    const settings = QuickSettings.create(0, 0, rk('Settings'));
    settings.hide();
    settings.addBoolean(rk('God mode'), Game.godMode, (val) => {
        Game.godMode = val;
        window.localStorage.setItem('godMode', val);
    });

    settings.addBoolean(rk('Animation'), !!Game.animationSpeed, (val) => {
        Game.animationSpeed = val ? Game.defaultAnimationSpeed : 0;
        window.localStorage.setItem('animation', val);
    });

    settings.addNumber(rk('Zoom'), Game.blockSize.min, Game.blockSize.max, Game.blockSize.value, 1, (val) => {
        Game.blockSize.value = val;
        window.localStorage.setItem('blockSize', val);
        Game.setSize();
    });

    settings.addDropDown(rk('language'), ['ru', 'en'], (val) => {

        if (getCookie('lang') !== val.value) {
            showConfirm('', rk('To change the language you need to reload the page'), {
                theme: 'dark',
                buttons: [{
                    id: 'MBRELOAD',
                    title: rk('Reload'),
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    order: 2
                }, {
                    id: 'MBCANCEL',
                    title: rk('Cancel'),
                    backgroundColor: '#28a745',
                    color: '#fff',
                    order: 3
                }],
            }).then((res) => {
                if (res.button === 'MBRELOAD') {
                    document.cookie = `lang=${val.value}`;
                    document.location.reload(true);
                } else {
                    const langs = {'ru' : 0, 'en' : 1};
                    settings.setValue(rk('language'), { index: langs[getCookie('lang')]});
                }
            });
        }

    });

    let show = false;
    initSettings.showSettings = () => {
        if (show) {
            settings.hide();
        } else {
            settings.setValue(rk('Zoom'), Game.blockSize.value);
            const langs = {'ru' : 0, 'en' : 1};
            settings.setValue(rk('language'), { index: langs[getCookie('lang')]});
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
