import * as utility from './utility.js';
import * as Maps from './maps.js';

const checkBlock = utility.checkBlock;
const changeMap = utility.changeMap;
let Game = null;
let view = null;
const maps = Maps.maps;
const swapMap = Maps.swapMap

Promise.all([import('./game.js'), import('./view.js')]).then(([game, _view]) => {
    Game = game.Game;
    view = _view;
});

export class Item {

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
                        view.displayBlocker(true);
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
            if (typeof (isRightBtn) === 'boolean' && (!isRightBtn || Game.godMode)) {
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
                    if (!_item.opened && !_item.flag) {
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

        const inversed = swapMap[caseId] && swapMap[caseId].inversed;

        const mask = inversed === void 0 ? map : inversed;

        return (index >= 0 && (mask & map) === 0) ? changeMap(currentGame.map, { x, y }, caseId) : false;
    }

    setFlag(val = true) {
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
        view.updatePanel();
    }

}
