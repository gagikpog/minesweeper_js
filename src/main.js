let GameTable = null;
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('contextmenu', event => event.preventDefault());
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
    const level = getCookie('level');
    if (level) {
        document.querySelector('#level').value = level;
        levelItemChanged({value: level});
    }
});

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
    document.cookie = `level=${event.value}`;
}

window.getCookie = function(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}