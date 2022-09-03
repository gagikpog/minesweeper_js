import { Game } from './game';

function waitToLoaded() {
    if (window.GameTable && window.GameTable.addEventListener) {
        window.GameTable.addEventListener('long-press', function(event){
            const item = event.target;
            Game.itemClick(item, +item.dataset.row, +item.dataset.cell, 'rightClock');
        });
    } else {
        setTimeout(waitToLoaded, 100);
    }
}

waitToLoaded();
