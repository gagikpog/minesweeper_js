define('modules/game', [
    'modules/view',
    'modules/utility',
    'localizate/lang',
    'modules/statistics'
], function (view, utility, lang, statistics) {
    'use strict';

    const rk = lang.rk;
    const updatePanel = view.updatePanel;

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
            this.map = view.tableGenerate(Game.width, Game.height);
            view.resetTable();
            updatePanel();
        }
        destroy() {
            clearTimeout(this.timerId);

        }
        start(pos) {
            this.status = 'Game'
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
                            statistics.saveStatistics().then(() => {
                                view.displayBlocker(false);
                                Game.newGame()
                            })
                        } else {
                            view.displayBlocker(false);
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
                    showConfirm(rk('You lose'), '', { MBOK: true, theme: 'dark' }).then(() => {
                        view.displayBlocker(false);
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
                const x = Math.floor(Math.random() * 1000) % Game.width;
                const y = Math.floor(Math.random() * 1000) % Game.height;
                return { x, y };
                // return nextPos.next().value;
            };
            let r = null;
            let n = 100;
            let done = false;
            do {
                r = rand();
                const inClick = Math.abs(r.x - pos.x) <= 1 && Math.abs(r.y - pos.y) <= 1;
                done = this.map[r.y][r.x].val >= 8 || inClick;
            } while (done && n--);

            if (n) {
                this.map[r.y][r.x].val = 9;
                utility.checkBlock(r, this.map, a => { a.val < 8 && a.val++; });
            }
        }
        itemClick(item, row, cell, eventType) {
            if (this.status === 'newGame') {
                this.start({ x: cell, y: row });
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
            view.setCellSize(utility.getOptimalSize(this), {
                width: this.width,
                height: this.height
            });
        }
        static newGame() {
            currentGame && currentGame.destroy();
            currentGame = new Game();
            updatePanel();
        }
    }

    return Game;
});
