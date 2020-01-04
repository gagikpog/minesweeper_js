let GameTable = null;
document.addEventListener("DOMContentLoaded", function() {
    GameTable = document.querySelector('#game');

    tableGenerate(Game.width, Game.height);

    GameTable.onclick = function(e) {
        const item = e.target;
        itemClick(item, +item.dataset.row, +item.dataset.cell);
    }
});

function itemClick(item, row, cell) {
    if (item.nodeName === 'TD') {
        item.classList.add('open');
        Game.itemClick(item, row, cell);
    }
}