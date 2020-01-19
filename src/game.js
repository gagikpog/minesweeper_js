const Game = {
    width: 10,
    height: 10,
    totalMines: 10,
    remainingMines: 10,
    map: null,
    status: 'newGame',
    animationSpeed: 50,
    remainingTime: 0,
    featureLeftToFlag: true,
    newGame: function() {
        this.status = 'newGame';
        resetTable();
        this.remainingTime = 0;
        this.remainingMines = this.totalMines;
        document.querySelector('#mines').textContent = Game.remainingMines;
    },
    start: function(pos) {
        clearTimeout(this.timerId);
        this.timerId = setInterval(this.timer, 1000);
        this._generateMap(pos);
    },
    end: function(isWin) {
        if (Game.status === 'endGame') {
            return;
        }
        Game.status = 'endGame';
        clearTimeout(this.timerId);
        setTimeout(function () {
            if (isWin) {
                showConfirm('Победа', '', {MBOK: true, theme: 'dark'}).then(function(){
                    displayBlocker(false);
                    Game.newGame()
                });
            } else {
                showConfirm('Проигрыш', '', {MBOK: true, theme: 'dark'}).then(function(){
                    displayBlocker(false);
                    Game.newGame()
                });
            }
        }, 2000);
    },
    _generateMap(pos) {
        for (let i = 0; i < this.totalMines; i++) {
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
    itemClick: function(item, row, cell, eventType) {
        if (this.status === 'newGame') {
            this.start({x: cell, y: row});
            this.status = 'game';
        }
        const val = this.map[row][cell].val;
        item.open(eventType === 'rightClock');
    },
    timer: function() {
        Game.remainingTime++;
        document.querySelector('#time').textContent = `Time ${Game.remainingTime}`;
    },
    checkEnd: function() {
        let i = 0, j = 0;
        const map = Game.map;
        let count = null;
        if (map.length && map[0].length) {
            count = map.length * map[0].length - Game.totalMines;
        }
        let openedCount = 0;
        for (i = 0; i < map.length; i++) {
            for (j = 0; j < map[i].length; j++) {
                openedCount += map[i][j].opened;
            }
        }
        return openedCount === count;
    },
    setSize: function(width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        setCellSize(getOptimalSize());
        tableGenerate(this.width, this.height);
        this.newGame();
    },
    setFlag(item, val = true) {
        if (item.flag === val) {
            return;
        }
        if (val) {
            item.classList.add('cellFlag');
            Game.remainingMines--;
        } else {
            item.classList.remove('cellFlag');
            Game.remainingMines++;
        }
        item.flag = val;
        document.querySelector('#mines').textContent = Game.remainingMines >= 0 ? Game.remainingMines : 0;
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

function initItem(item) {
    item.val = 0;
    item.opened = false;
    item.flag = false;
    item.open = function(isRightBtn) {
        if (!item.opened) {
            if (!isRightBtn) {
                if (!item.flag) {
                    item.classList.add('open', `cell${item.val}`);
                    if (item.val === 0) {
                        item.boom();
                    }
                    item.opened = true;
                    if (item.val === 9) {
                        displayBlocker(true);
                        Game.end(false);
                        item.classList.add('cellBoom');
                        item.classList.add('cellX');
                        Game.map.forEach(function(row) {
                            row.forEach(function(_item) {
                                if (_item.val === 9) {
                                    _item.classList.add('open', `cell${item.val}`);
                                } else {
                                    if (_item.flag) {
                                        _item.classList.add('cellX');
                                    }
                                }
                            });
                        });
                        setTimeout(function() {
                            item.classList.remove('cellBoom');
                        }, 1000);
                    }
                }
            } else {
                Game.setFlag(item, !item.flag);
            }
        } else {
            if (typeof(isRightBtn) === 'boolean') {
                item.neighborOpen();
            }
        }
        if (Game.checkEnd()) {
            Game.end(true);
            Game.map.forEach(function(row) {
                row.forEach(function(_item) {
                    if (_item.val === 9) {
                        _item.classList.add('cell9');
                    }
                });
            });
        }
    }

    item.neighborOpen = function() {
        const pos = {
            x: +item.dataset.cell,
            y: +item.dataset.row
        };
        const count = checkBlock(pos, Game.map, function(_item, res) {
            res.count = res.count || 0;
            res.count += _item.flag;
        }).count;
        if (count === item.val) {
            checkBlock(pos, Game.map, function(_item) {
                _item.open();
            });
        } else {
            let closedCount = null;
            if (Game.featureLeftToFlag) {
                closedCount = checkBlock(pos, Game.map, function(_item, res) {
                    res.count = res.count || 0;
                    res.count += !_item.opened;
                }).count;
            }
            checkBlock(pos, Game.map, function(_item) {
                if(!_item.opened && !_item.flag) {
                    if (Game.featureLeftToFlag && closedCount === item.val) {
                        Game.setFlag(_item, true);
                    } else {
                        _item.classList.add('pushed');
                        setTimeout(function(){
                            _item.classList.remove('pushed');
                        }, 300);
                    }
                }
            });
        }
    }

    item.boom = function() {
        if (!item.opened) {
            setTimeout(function() {
                item.open();
                const pos = {
                    x: +item.dataset.cell,
                    y: +item.dataset.row
                }
                checkBlock(pos, Game.map, function(_item) {
                    _item.open();
                });
            }, Game.animationSpeed);
        }
    }

    return item;
}

function getOptimalSize() {
    const totalWidth = window.innerWidth - 100;
    const totalHeight = window.innerHeight - 150;
    const kw = totalHeight / Game.height;
    const kh = totalWidth / Game.width;
    const k = kw < kh ? kw : kh;
    const minSize = 30;
    return k > minSize ? k : minSize;
}