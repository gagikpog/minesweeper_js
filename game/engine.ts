import { gameOver, gameWin, openItem, openItemsList, RootState, store, toggleItemFlag } from "../store/main";
import { callCollect } from "./funcs/callCollect";
import { Chanel } from "./funcs/chanel";
import { checkBlock } from "./funcs/checkBlock";
import { checkNeedSave } from "./funcs/checkNeedSave";
import { chanelEventGetter, mapGetter } from "./funcs/getters";

import { createMapItem } from "./funcs/mapItem";
import { ChanelEvents, IMapItem, IPoint, ItemState, ItemValues } from "./types";

const addOpenItemCollect = callCollect<{ point: IPoint }>(openItemCollect, 1);

function boom(point: IPoint): void {
    const { animationSpeed, gameMap } = store.getState();
    const item = mapGetter(gameMap, point.y, point.x);
    if (item.state === ItemState.hidden && item.val === ItemValues.empty) {
        setTimeout(() => {
            const { gameMap, width, height } = store.getState();
            checkBlock(point, width, height, gameMap, (_item: IMapItem) => {
                if (_item.state === ItemState.hidden) {
                    addOpenItemCollect({ point: _item?.pos });
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
                    } else if (animationSpeed) {
                        // push animation
                        Chanel.notify(chanelEventGetter(_item.pos.y, _item.pos.x), ChanelEvents.TogglePushing, null);
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
    const changes = [];
    let gameOver = false;
    if (item.state === ItemState.hidden) {

        switch (item.val) {
            case 0:
                boom(point);
                break;
            case 9:
                const items = checkNeedSave(item.pos);
                changes.push(...items);
                if (items.length === 0) {
                    gameOver = true;
                }
                break;
            default:
                break;
        }

        if (changes.length) {
            changes.forEach((changeItem) => {
                if (changeItem.pos.x === item.pos.x && changeItem.pos.y === item.pos.y) {
                    changeItem.state = ItemState.opened;
                }
            });
        } else {
            item.state = ItemState.opened;
            changes.push(item);
        }


    } else if (item.state === ItemState.opened) {
        setTimeout(() => {
            neighborOpen(point);
        }, 0);
    }

    return { item, opened, gameOver, changes };
}

function openItemCollect(data: { point: IPoint }[]): void {

    const itemCache: {[key: string]: number} = {};
    const pointCache: {[key: string]: boolean} = {};

    const { gameMap } = store.getState();

    const isHidden = (point: IPoint ) => mapGetter(gameMap, point.y, point.x)?.state === ItemState.hidden;

    const checkDuplicate = (point: IPoint) => {
        const key = chanelEventGetter(point.y, point.x);
        if (!pointCache[key]) {
            pointCache[key] = true
            return true;
        }

        return false;
    };

    const filter = ({point}: { point: IPoint }) => isHidden(point) && checkDuplicate(point);

    const res = data.filter(filter).map(asyncOpenItem).reduce((acc, item ) => {

        if (item.gameOver) {
            acc.gameOver = true;
        }

        if (item.opened) {
            acc.openedCount++;
        }

        item.changes.forEach((change) => {
            const key = chanelEventGetter(change.pos.y, change.pos.x);
            if (itemCache[key] === undefined) {
                itemCache[key] = acc.changes.length;
                acc.changes.push(change)
            } else {
                acc.changes[itemCache[key]] = change;
            }
        });

        return acc;
    }, { gameOver: false, changes: [] as IMapItem[], openedCount: 0});

    store.dispatch(openItemsList(res));
}

export function updateStateOnItemsOpen(state: RootState, data: { gameOver: boolean, changes: IMapItem[], openedCount: number}): void {
    if (data.openedCount) {
        state.openedCount += data.openedCount;
    }

    if (data.gameOver) {
        setTimeout(() => {
            store.dispatch(gameOver(null));
        }, 0);
    }

    data.changes?.forEach((item: IMapItem): void => {
        state.gameMap[item.pos.y][item.pos.x] = item;
    });

    const { totalMines, width, height, openedCount } = state;

    if (width * height - totalMines - openedCount === 0) {
        setTimeout(() => {
            store.dispatch(gameWin(null));
        }, 0);
    }
}
