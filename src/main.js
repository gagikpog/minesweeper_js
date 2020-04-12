let GameTable = null;
document.addEventListener("DOMContentLoaded", documentLoaded);

function documentLoaded() {
    document.addEventListener('contextmenu', event => event.preventDefault(), false);
    GameTable = document.querySelector('#game');

    initSettings();
    initZoom();

    Game.setSize(null, null, true);

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
            Game.setSize(10, 10, true);
        break;
        case 'intermediate':
            Game.totalMines = 40;
            Game.setSize(16, 16, true);
        break;
        case 'advanced':
            Game.totalMines = 99;
            Game.setSize(30, 16, true);
        break;
        case 'custom':
        break;
    }
    window.localStorage.setItem('level', event.value);
}

function getLevel() {
    return  document.querySelector('#level').value;
}

function getCookie(name) {
    // https://stackoverflow.com/questions/10730362/get-cookie-by-name
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }