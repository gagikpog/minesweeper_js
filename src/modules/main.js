define('modules/main', [
    'modules/game',
    'modules/utility',
    'modules/settings',
    'modules/view',
    'quickSettings'], function (
        Game,
        utility,
        initSettings,
        view) {
    'use strict';

    function documentLoaded(resolver) {
        document.addEventListener('contextmenu', event => event.preventDefault(), false);
        GameTable = document.querySelector('#game');

        initSettings();

        Game.newGame();

        window.onbeforeunload = () => currentGame.status === 'Game' ? 'no reload' : void 0;

        window.addEventListener("resize", function () {
            view.setCellSize(utility.getOptimalSize(Game), {
                width: Game.width,
                height: Game.height
            });
        }, false);

        GameTable.onclick = function (e) {
            const item = e.target;
            itemClick(item, +item.dataset.row, +item.dataset.cell, 'leftClock');
        }
        GameTable.oncontextmenu = function (e) {
            const item = e.target;
            itemClick(item, +item.dataset.row, +item.dataset.cell, 'rightClock');
        }

        Promise.resolve(resolver).then(() => {
            document.querySelector('#stub').style.display = 'none';
            document.querySelector('#mainContent').style.display = 'flex';
        });

    }

    function itemClick(item, row, cell, eventType) {
        if (item.nodeName === 'TD') {
            const baseItem = currentGame.map[row][cell];
            currentGame.itemClick(baseItem, row, cell, eventType);
        }
    }

    return {
        documentLoaded
    };
});
