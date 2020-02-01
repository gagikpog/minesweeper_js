function waitToLoaded() {
    if (GameTable && GameTable.addEventListener) {
        GameTable.addEventListener('long-press', function(event){
            const item = event.target;
            itemClick(item, +item.dataset.row, +item.dataset.cell, 'rightClock');
        });
    } else {
        setTimeout(waitToLoaded, 100);
    }
}

waitToLoaded();