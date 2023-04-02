import { CaseId, MAPS, SWAP_MAP } from "../constants";
import { ChanelEvents, GameMap, IMapItem, IPoint, ItemState, ItemValues } from "../types";
import { Chanel } from "./chanel";
import { checkBlock } from "./checkBlock";
import { chanelEventGetter } from "./getters";
import { createMapItem } from "./mapItem";

export function checkNeedSave(point: IPoint, gameMap: GameMap, width: number, height: number, animationSpeed: number): IMapItem[] {

    let map = 0;
    const { x, y } = point;

    let n = 16777216;

    for (let i = y - 2; i <= y + 2; i++) {
        for (let j = x - 2; j <= x + 2; j++) {
            let itemVal = gameMap[i]?.[j]?.val;
            itemVal = itemVal === undefined ? 9 : itemVal;
            map = map | (itemVal === 9 ? n : 0);
            n /= 2;
        }
    }

    const index = MAPS.findIndex((v) => v === (v & map))

    const caseId = MAPS[index];

    const inversed = SWAP_MAP[caseId]?.inversed;

    const mask = inversed === void 0 ? map : inversed;

    return (index >= 0 && (mask & map) === 0) ? changeMap(gameMap, { x, y }, caseId, width, height, animationSpeed) : [];
}


function swapItems (a: IMapItem, b: IMapItem): void {
    const t = a.val;
    a.val = b.val;
    b.val = t;
}

function changeMap(gameMap: GameMap, center: IPoint, caseId: CaseId, width: number, height: number, animationSpeed: number): IMapItem[] {
    const changes: IMapItem[] = [];

    try {
        const map = SWAP_MAP[caseId]?.swaps || [];
        const getItem = (p: IPoint) => gameMap[center.y + p.y][center.x + p.x];
        const animation = (mineFrom: IMapItem, mineTo: IMapItem): void => {
            Chanel.notify(chanelEventGetter(mineFrom.pos.y, mineFrom.pos.x), ChanelEvents.ToggleMine, null);
            setTimeout(() => {
                Chanel.notify(chanelEventGetter(mineTo.pos.y, mineTo.pos.x), ChanelEvents.ToggleMine, null);
            }, animationSpeed * 6);
        };

        // check all swaped item before swap
        const cannotBeExchanged = map.some((_item) => {
            const item0 = getItem(_item.p0);
            const item1 = getItem(_item.p1);
            return item0.state === ItemState.opened || item1.state === ItemState.opened;
        });

        if (cannotBeExchanged) {
            return [];
        }

        const getCount = (point: IPoint): number => {
            return checkBlock<{count: number}>(point, width, height, gameMap, (_item, res) => {
                if (res) {
                    res.count = res.count || 0;
                    res.count += _item.val === ItemValues.mine ? 1 : 0;
                }
            }).count || 0;
        };

        map.forEach((_item) => {
            const item0 = getItem(_item.p0);
            const item1 = getItem(_item.p1);

            if (item0.state === ItemState.opened || item1.state === ItemState.opened) {
                return;
            }

            const item0Clone = createMapItem(item0);
            const item1Clone = createMapItem(item1);

            swapItems(item0Clone, item1Clone);

            changes.push(item0Clone);
            changes.push(item1Clone);

            animation(item0Clone, item1Clone);

            if (item0Clone.val !== ItemValues.mine) {
                item0Clone.val = getCount({ x : _item.p0.x + center.x, y: _item.p0.y + center.y });
            }

            if (item1Clone.val !== ItemValues.mine) {
                item1Clone.val = getCount({ x : _item.p1.x + center.x, y: _item.p1.y + center.y });
            }

        })
    } catch (error) {
        return [];
    }

    return changes;
}
