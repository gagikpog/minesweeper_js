let GameTable = null;
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    GameTable = document.querySelector('#game');

    tableGenerate(Game.width, Game.height);

    GameTable.onclick = function(e) {
        const item = e.target;
        itemClick(item, +item.dataset.row, +item.dataset.cell, 'leftClock');
    }
    GameTable.oncontextmenu = function (e) {
        const item = e.target;
        itemClick(item, +item.dataset.row, +item.dataset.cell, 'rightClock');
    }
});

function itemClick(item, row, cell, eventType) {
    if (item.nodeName === 'TD') {
        Game.itemClick(item, row, cell, eventType);
    }
}