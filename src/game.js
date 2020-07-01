class Game {
    static width = 10;
    static height = 10;
    static blockSize = {
        value: 25,
        min: 25,
        max: 70,
        default: 25
    };
    static userName = '';
    static totalMines = 10;
    static godMode = true;
    static animationSpeed = 50;
    static defaultAnimationSpeed = 50;

    constructor() {
        this.remainingMines = Game.totalMines;
        this.status = 'newGame';
        this.remainingTime = 0;
        this.openedCount = 0;
        Game.setSize();
        this.map = tableGenerate(Game.width, Game.height);
        resetTable();
        updatePanel();
    }
    destroy() {
        clearTimeout(this.timerId);
        
    }
    start(pos) {
        clearTimeout(this.timerId);
        this.timerId = setInterval(this.timer.bind(this), 1000);
        this._generateMap(pos);
    }
    end(isWin) {
        if (this.status === 'endGame') {
            return;
        }
        this.status = 'endGame';
        clearTimeout(this.timerId);
        setTimeout(() => {
            if (isWin) {

                const winConfirmRemember = window.localStorage.getItem('winConfirmRemember');

                const resolveCallBack = (res) => {
                    if (res.formData && res.formData.remember) {
                        window.localStorage.setItem('winConfirmRemember', res.button);
                    }
                    if (res.button === 'MBYES') {
                        saveStatistics().then(() => {
                            displayBlocker(false);
                            Game.newGame()
                        })
                    } else {
                        displayBlocker(false);
                        Game.newGame()
                    }
                }

                let conformConfig = null;
                let message = '';

                if (winConfirmRemember) {
                    conformConfig = {
                        theme: 'dark',
                        buttons: [{
                            id: winConfirmRemember,
                            title: rk('OK'),
                            backgroundColor: '#6c757d',
                            color: '#fff',
                            order: 1
                        }]
                    };
                } else {
                    message = rk('Want to save the result?');
                    conformConfig = {
                        theme: 'dark',
                        buttons: [{
                            id: 'MBNO',
                            title: rk('No'),
                            backgroundColor: '#28a745',
                            color: '#fff',
                            order: 2
                        }, {
                            id: 'MBYES',
                            title: rk('Yes'),
                            backgroundColor: '#6c757d',
                            color: '#fff',
                            order: 1
                        }],
                        templateCallBack: () => {
                            const content = document.createElement('div');
                            content.classList.add('form-remember');
                            const label = document.createElement('label');
                            label.for = 'remember';
                            label.textContent = rk('Remember selection');
                            const input = document.createElement('input');
                            input.name = 'remember';
                            input.type = 'checkbox';
        
                            content.appendChild(label);
                            content.appendChild(input);
                            return content;
                        }
                    };
                }

                showConfirm(rk('You win'), message, conformConfig).then(resolveCallBack);

            } else {
                showConfirm(rk('You lose'), '', {MBOK: true, theme: 'dark'}).then(() => {
                    displayBlocker(false);
                    Game.newGame()
                });
            }
        }, 2000);
        this.showAllMines();
    }
    showAllMines() {
        this.map.forEach((row) => {
            row.forEach((_item) => {
                if (_item.val === 9) {
                    _item.view.classList.add('cell9');
                }
            });
        });
    }
    _generateMap(pos) {
        for (let i = 0; i < Game.totalMines; i++) {
            this.addMine(pos);
        }
    }
    addMine(pos) {
        // const nextPos = positions();
        const rand = () => {
            const x = Math.floor(Math.random()*1000) % Game.width;
            const y = Math.floor(Math.random()*1000) % Game.height;
            return {x, y};
            // return nextPos.next().value;
        };
        let r = null;
        let n = 100;
        let done = false;
        do {
            r = rand();
            const inClick = Math.abs(r.x - pos.x) <= 1 && Math.abs(r.y - pos.y) <= 1;
            done = this.map[r.y][r.x].val >= 8 || inClick;
        } while(done && n--);

        if (n) {
            this.map[r.y][r.x].val = 9;
            checkBlock(r, this.map, a => {a.val < 8 && a.val++;});
        }
    }
    itemClick(item, row, cell, eventType) {
        if (this.status === 'newGame') {
            this.start({x: cell, y: row});
            this.status = 'game';
        }
        item.open(eventType === 'rightClock');
    }
    timer() {
        this.remainingTime++;
        updatePanel();
    }
    checkEnd() {

        const map = this.map;
        let count = null;
        if (map.length && map[0].length) {
            count = map.length * map[0].length - Game.totalMines;
        }
        return this.openedCount === count;
    }
    static setSize(width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        setCellSize(getOptimalSize());
    }
    static newGame() {
        currentGame && currentGame.destroy();
        currentGame = new Game();
        updatePanel();
    }
}

class Item {

    constructor(tdItem) {
        this.val = 0;
        this.opened = false;
        this.flag = false;
        this.view = tdItem;
    }

    open(isRightBtn) {
        if (!this.opened) {
            if (!isRightBtn) {
                if (!this.flag) {
                    if (this.val === 9) {
                        this.checkNeedSave();
                    }
                    currentGame.openedCount++;
                    this.view.classList.add('open', `cell${this.val}`);
                    if (this.val === 0) {
                        this.boom();
                    }
                    this.opened = true;
                    if (this.val === 9) {
                        displayBlocker(true);
                        currentGame.end(false);
                        this.view.classList.add('cellBoom');
                        this.view.classList.add('cellX');
                        currentGame.map.forEach((row) => {
                            row.forEach((_item) => {
                                if (_item.val === 9) {
                                    _item.view.classList.add('open', `cell${this.val}`);
                                } else {
                                    if (_item.flag) {
                                        _item.view.classList.add('cellX');
                                    }
                                }
                            });
                        });
                        setTimeout(() => {
                            this.view.classList.remove('cellBoom');
                        }, 1000);
                    }
                }
            } else {
                this.setFlag(!this.flag);
            }
        } else {
            // if left button pressed and godMode enabled check neighbors
            if (typeof(isRightBtn) === 'boolean' && (!isRightBtn || Game.godMode)) {
                this.neighborOpen();
            }
        }
        if (currentGame.checkEnd()) {
            currentGame.end(true);
        }
    }

    neighborOpen() {
        const pos = {
            x: +this.view.dataset.cell,
            y: +this.view.dataset.row
        };

        const count = checkBlock(pos, currentGame.map, (_item, res) => {
            res.count = res.count || 0;
            res.count += _item.flag;
        }).count;

        if (count === this.val) {
            checkBlock(pos, currentGame.map, (_item) => {
                _item.open();
            });
        } else {
            let closedCount = null;
            if (Game.godMode) {
                closedCount = checkBlock(pos, currentGame.map, (_item, res) => {
                    res.count = res.count || 0;
                    res.count += !_item.opened;
                }).count;
            }

            if (Game.godMode || Game.animationSpeed) {
                checkBlock(pos, currentGame.map, (_item) => {
                    if(!_item.opened && !_item.flag) {
                        if (Game.godMode && closedCount === this.val) {
                            _item.setFlag(true);
                        } else {
                            // push animation
                            if (Game.animationSpeed) {
                                // check animation enabled
                                _item.view.classList.add('pushed');
                                setTimeout(() => {
                                    _item.view.classList.remove('pushed');
                                }, Game.animationSpeed * 6);
                            }
                        }
                    }
                });
            }

        }
    }

    boom() {
        if (!this.opened) {
            setTimeout(() => {
                this.open();
                const pos = {
                    x: +this.view.dataset.cell,
                    y: +this.view.dataset.row
                }
                checkBlock(pos, currentGame.map, (_item) => {
                    _item.open();
                });
            }, Game.animationSpeed);
        }
    }

    checkNeedSave() {

        let map = 0;
        const x = +this.view.dataset.cell;
        const y = +this.view.dataset.row;

        let n = 16777216;

        for (let i = y - 2; i <= y + 2; i++) {
            for (let j = x - 2; j <= x + 2; j++) {
                let itemVal = currentGame.map[i] && currentGame.map[i][j] && currentGame.map[i][j].val;
                itemVal = itemVal === undefined ? 9 : itemVal;
                map = map | (itemVal === 9 ? n : 0);
                n /= 2;
            }
        }

        const index = maps.findIndex((v) => v === (v & map))

        const caseId = maps[index];

        const inversed = swapMap[caseId] && swapMap[caseId].inversed || map;

        return (index >= 0 && (inversed & map) === 0) ? changeMap(currentGame.map, {x, y}, caseId) : false;
    }

    setFlag(item, val = true) {
        if (this.flag === val) {
            return;
        }
        if (val) {
            this.view.classList.add('cellFlag');
            currentGame.remainingMines--;
        } else {
            this.view.classList.remove('cellFlag');
            currentGame.remainingMines++;
        }
        this.flag = val;
        updatePanel();
    }

}

