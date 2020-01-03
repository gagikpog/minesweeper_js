function tableGenerate(width, height) {
    // clear table
    while (GameTable.hasChildNodes()) {
        GameTable.removeChild(GameTable.lastChild);
    }

    let i = 0;
    for(i = 0; i < height; i++){
        let tr = GameTable.insertRow();
        let j = 0;
        for(j = 0; j < width; j++){
            let td = tr.insertCell();
            td.classList.add('cell');
            td.dataset.row = i;
            td.dataset.cell = j;
        }
    }
}

function resetTable() {
    const data = document.querySelectorAll('table#game .cell');
    data.forEach(function (item) {
        item.classList = ['cell'];
    });
}