import { createMapItem } from "./mapItem";
import { GameMap, IMapItem, IPoint } from "./types";

export function generateMap(width: number, height: number): GameMap {
    return Array(height).fill(null).map((_, y) => {
        return Array(width).fill(null).map((_, x) => {
            return createMapItem({ pos: { x, y } });
        });
    });
}

export function randomfillMap(point: IPoint, width: number, height: number, minesCount: number): GameMap {

    const map = generateMap(width, height);

    const addMine = () => {
        // const nextPos = positions();
        const rand = () => {
            const x = Math.floor(Math.random() * 1000) % width;
            const y = Math.floor(Math.random() * 1000) % height;
            return { x, y };
            // return nextPos.next().value;
        };
        let r = null;
        let n = 100;
        let done = false;
        do {
            r = rand();
            const inClick = Math.abs(r.x - point.x) <= 1 && Math.abs(r.y - point.y) <= 1;
            const item = mapGetter(map, r.y, r.x);
            done = (item?.val || 0) >= 8 || inClick;
        } while (done && n--);

        if (n) {
            const item = mapGetter(map, r.y, r.x);
            if (item) {
                item.val = 9;
            }
            checkBlock(r, width, height, map, (a) => {
                if (a && a.val < 8) {
                    a.val++;
                }
            });
        }
    }

    for (let i = 0; i < minesCount; i++) {
        addMine();
    }

    return map;
}

export function mapGetter(map: GameMap,row: number, cell: number): IMapItem {
    return map?.[row]?.[cell];
}

type CheckBlockCallback<T = object> = (item: IMapItem, res?: T) => void;

export function checkBlock<T = object>(
    point: IPoint,
    width: number,
    height: number,
    map: GameMap,
    callback: CheckBlockCallback<Partial<T>>
): Partial<T> {
    const startX = point.x - 1 >= 0 ? point.x - 1 : point.x;
    const startY = point.y - 1 >= 0 ? point.y - 1 : point.y;
    let res = {} as Partial<T>;
    for (let i = startY; i < height && i <= point.y + 1; i++) {
        for (let j = startX; j < width && j <= point.x + 1; j++) {
            callback(mapGetter(map, i, j), res);
        }
    }
    return res;
}
