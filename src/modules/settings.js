define('modules/settings', ['modules/game', 'modules/utility', 'localizate/lang'], function(Game, utility, lang) {
    'use strict';
    const rk = lang.rk;
    const langs = lang.langs;
    const getLang = lang.getLang;
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

            if (getLang() !== val.value) {
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
                        settings.setValue(rk('language'), { index: langs[getLang()] });
                    }
                });
            }

        });

        settings.addButton(rk('Reset settings'), () => {
            showConfirm('', rk('Are you sure you want to reset the settings?'), {
                theme: 'dark',
                buttons: [{
                    id: 'MBYES',
                    title: rk('Yes'),
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    order: 2
                }, {
                    id: 'MBNO',
                    title: rk('No'),
                    backgroundColor: '#28a745',
                    color: '#fff',
                    order: 3
                }],
            }).then((res) => {
                if (res.button === 'MBYES') {
                    document.cookie = 'lang=ru';
                    window.localStorage.setItem('blockSize', 25);
                    window.localStorage.setItem('godMode', false);
                    window.localStorage.setItem('level', 'beginner');
                    window.localStorage.setItem('winConfirmRemember', '');
                    window.localStorage.setItem('userName', '');
                    document.location.reload(true);
                }
            });
        });

        let show = false;
        initSettings.showSettings = () => {
            if (show) {
                settings.hide();
            } else {
                settings.setValue(rk('Zoom'), Game.blockSize.value);
                settings.setValue(rk('language'), { index: langs[getLang()] });
                settings.show();
            }
            show = !show;
        }

        const titleBar = document.querySelector('.qs_title_bar');

        titleBar.addEventListener('click', function (e) {
            if (e.offsetX > titleBar.offsetWidth) {
                initSettings.showSettings();
            }
        });

    }

    function loadSettings() {
        const godMode = window.localStorage.getItem('godMode') === 'true';
        const animation = window.localStorage.getItem('animation') !== 'false';
        const level = window.localStorage.getItem('level') || 'beginner';
        const blockSizeValue = +(window.localStorage.getItem('blockSize') || Game.blockSize.default);
        const userName = window.localStorage.getItem('userName') || '';

        document.querySelector('#level').value = level;
        levelItemChanged({ value: level });

        const blocksOptimalSize = Math.floor(utility.getOptimalSize(Game));

        Game.blockSize.min = blocksOptimalSize;
        Game.blockSize.default = blocksOptimalSize;
        Game.blockSize.value = blockSizeValue;
        Game.godMode = godMode;
        Game.animationSpeed = animation ? Game.defaultAnimationSpeed : 0;
        Game.userName = userName;
    }

    return initSettings;

});
