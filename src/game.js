const Game = {
    width: 10,
    height: 10,
    minesCount: 10,
    map: null,
    status: 'newGame',
    newGame: function(pos) {
        this._generateMap(pos);
    },
    _generateMap(pos) {
        for (let i = 0; i < this.minesCount; i++) {
            this.addMine(pos);
        }
    },
    addMine: function(pos) {
        const rand = () => {
            const x = Math.floor(Math.random()*1000) % this.width;
            const y = Math.floor(Math.random()*1000) % this.height;
            return {x, y};
        };
        let r = null;
        let n = 100;
        let done = false;
        do {
            r = rand();
            const inClick = Math.abs(r.x - pos.x) <= 1 && Math.abs(r.y - pos.y) <= 1;
            done = this.map[r.y][r.x].val >= 8 || inClick;
        } while(done && n--);

        if(n) {
            this.map[r.y][r.x].val = 9;
            checkBlock(r, this.map, a => {a.val < 8 && a.val++;});
        }
    },
    itemClick: function(item, row, cell) {
        if (this.status === 'newGame') {
            this.newGame({x: cell, y: row});
            this.status = 'game';
        }
        const val = this.map[row][cell].val;
        item.open();
    }
}

function checkBlock(point, map, callback) {
    const startX = point.x - 1 >= 0 ? point.x - 1 : point.x;
    const startY = point.y - 1 >= 0 ? point.y - 1 : point.y;
    let res = {};
    for (let i = startY; i < map.length && i <= point.y + 1; i++) {
        for (let j = startX; j < map[i].length && j <= point.x + 1; j++) {
            callback(map[i][j], res);
        }
    }
    return res;
}