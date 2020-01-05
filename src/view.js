function tableGenerate(width, height) {
    // clear table
    while (GameTable.hasChildNodes()) {
        GameTable.removeChild(GameTable.lastChild);
    }

    Game.map = Array(height).fill().map(() => []);

    let i = 0;
    for(i = 0; i < height; i++) {
        let tr = GameTable.insertRow();
        let j = 0;
        for(j = 0; j < width; j++) {
            let td = tr.insertCell();
            td.classList.add('cell');
            td.id = `ts${i}_${j}`;
            td.dataset.row = i;
            td.dataset.cell = j;
            Game.map[i][j] = initItem(td);
        }
    }
}

function resetTable() {
    const data = document.querySelectorAll('table#game .cell');
    data.forEach(function (item) {
        item.classList = ['cell'];
        item.opened = false;
        item.val = 0;
        item.flag = false;
    });
}

function setCellSize(size = 50) {
    const ssList = document.styleSheets;
    let ss = null;
    for (let i = 0; i< ssList.length; i++) {
        
        if (ssList[i].title === 'dynamic') {
            ss = ssList[i];
            break;
        }
    }
    if (ss) {
        ss.cssRules[0].style.height = `${size}px`;
        ss.cssRules[0].style.width = `${size}px`;
    }
}
