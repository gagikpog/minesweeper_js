import { gameWin, openItem, store, toggleItemFlag } from "../store/main";
import { checkBlock, mapGetter } from "./function";
import { createMapItem } from "./mapItem";
import { IMapItem, IPoint, ItemState } from "./types";

function boom(point: IPoint): void {
    const { animationSpeed, gameMap } = store.getState();
    const item = mapGetter(gameMap, point.y, point.x);
    if (item.state === ItemState.hidden) {
        setTimeout(() => {
            const { gameMap, width, height } = store.getState();
            checkBlock(point, width, height, gameMap, (_item: IMapItem) => {
                if (_item.state === ItemState.hidden) {
                    store.dispatch(openItem({ point: _item?.pos }));
                }
            });
        }, animationSpeed);
    }
}

function neighborOpen(point: IPoint): void {

    const {
        gameMap,
        width,
        height,
        godMode,
        animationSpeed
    } = store.getState();

    const item = mapGetter(gameMap, point.y, point.x);

    const count = checkBlock<{ count: number }>(point, width, height, gameMap, (_item, res) => {
        if (res) {
            res.count = res?.count || 0;
            if (_item.state === ItemState.flag) {
                res.count++;
            }
        }
    }).count;

    if (count !== 0 && count === item.val) {
        checkBlock(point, width, height, gameMap, (_item) => {
            if (_item.state === ItemState.hidden) {
                store.dispatch(openItem({ point: _item?.pos }));
            }
        });
    } else {
        let closedCount = 0;
        if (godMode) {
            closedCount = checkBlock<{ count: number }>(point, width, height, gameMap, (_item, res) => {
                if (res) {
                    res.count = res.count || 0;
                    if (_item.state !== ItemState.opened) {
                        res.count++;
                    }
                }
            }).count || 0;
        }

        if (godMode || animationSpeed) {
            checkBlock(point, width, height, gameMap, (_item) => {
                if (_item.state === ItemState.hidden) {
                    if (godMode && closedCount === item.val) {
                        store.dispatch(toggleItemFlag({ point: _item?.pos }));
                    } else {
                        // push animation
                        if (animationSpeed) {
                            // check animation enabled
                            // _item.view.classList.add('pushed');
                            // setTimeout(() => {
                            //     _item.view.classList.remove('pushed');
                            // }, Game.animationSpeed * 6);
                        }
                    }
                }
            });
        }

    }
}

export function asyncOpenItem({ point }: { point: IPoint }) {

    const state = store.getState();
    const item = createMapItem(mapGetter(state.gameMap, point.y, point.x));
    const opened = item.state === ItemState.hidden;
    let gameOver = false;
    if (item.state === ItemState.hidden) {

        switch (item.val) {
            case 0:
                boom(point);
                break;
            case 9:
                // this.checkNeedSave();
                gameOver = true;
                break;
            default:
                break;
        }


        item.state = ItemState.opened;

    } else if (item.state === ItemState.opened) {
        setTimeout(() => {
            neighborOpen(point);
        }, 0);
    }

    return { item, opened, gameOver };
}