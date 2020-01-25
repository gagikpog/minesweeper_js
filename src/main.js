let GameTable = null;
document.addEventListener("DOMContentLoaded", documentLoaded);

function documentLoaded() {
    document.addEventListener('contextmenu', event => event.preventDefault(), false);
    GameTable = document.querySelector('#game');

    Game.setSize();
    window.addEventListener("resize", function() {
        setCellSize(getOptimalSize());
    }, false);

    GameTable.onclick = function(e) {
        const item = e.target;
        itemClick(item, +item.dataset.row, +item.dataset.cell, 'leftClock');
    }
    GameTable.oncontextmenu = function (e) {
        const item = e.target;
        itemClick(item, +item.dataset.row, +item.dataset.cell, 'rightClock');
    }

    initSettings();
}

function itemClick(item, row, cell, eventType) {
    if (item.nodeName === 'TD') {
        Game.itemClick(item, row, cell, eventType);
    }
}

function levelItemChanged(event) {
    switch(event.value) {
        case 'beginner':
            Game.totalMines = 10;
            Game.setSize(10, 10);
        break;
        case 'intermediate':
            Game.totalMines = 40;
            Game.setSize(16, 16);
        break;
        case 'advanced':
            Game.totalMines = 99;
            Game.setSize(30, 16);
        break;
        case 'custom':
        break;
    }
    window.localStorage.setItem('level', event.value);
}
