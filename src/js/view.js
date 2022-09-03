import { rk } from './lang.js';
import { Item } from './item.js';

/**
 * 
 * @param { number } width
 * @param { number } height
 * @returns { Item[][] }
 */
export function tableGenerate(width, height) {
    // clear table
    while (window.GameTable.hasChildNodes()) {
        window.GameTable.removeChild(window.GameTable.lastChild);
    }

    const map = Array(height).fill().map(() => []);

    let i = 0;
    for (i = 0; i < height; i++) {
        let tr = window.GameTable.insertRow();
        let j = 0;
        for (j = 0; j < width; j++) {
            let td = tr.insertCell();
            td.classList.add('cell');
            td.id = `ts${i}_${j}`;
            td.dataset.row = i;
            td.dataset.cell = j;
            map[i][j] = new Item(td);
        }
    }
    return map;
}

export function resetTable() {
    const data = document.querySelectorAll('table#game .cell');
    data.forEach(function (item) {
        item.classList = ['cell'];
        item.opened = false;
        item.val = 0;
        item.flag = false;
    });
}

export function setCellSize(size, mapSize = {}) {

    mapSize.width = mapSize.width || 1;
    mapSize.height = mapSize.height || 1;
    const newSize = size || 50;
    const padding = 2;

    window.GameTable.style.width = `${newSize * (mapSize.width + padding)}px`;
    window.GameTable.style.height = `${newSize * mapSize.height}px`;

    const ssList = document.styleSheets;
    let ss = null;
    for (let i = 0; i < ssList.length; i++) {

        if (ssList[i].title === 'dynamic') {
            ss = ssList[i];
            break;
        }
    }
    if (ss) {
        ss.cssRules[0].style.height = `${size}px`;
        ss.cssRules[0].style.width = `${size}px`;
        ss.cssRules[0].style['line-height'] = `${size}px`;
        ss.cssRules[1].style['font-size'] = `${size * 0.7}px`;
        ss.cssRules[1].style.height = `${size}px`;
        ss.cssRules[1].style.width = `${size}px`;
    }
}

export function displayBlocker(enabled = true) {
    document.querySelector('#blocker').style.display = enabled ? 'block' : 'none';
}

export function updatePanel() {
    if (window.currentGame) {
        document.querySelector('#mines').textContent = window.currentGame.remainingMines;
        document.querySelector('#time').textContent = `${rk('Time')} ${window.currentGame.remainingTime}`;
    }
}
