import { MAX_GAME_HEIGHT, MAX_GAME_WIDTH } from "./constants";
import { MapItem } from "./mapItem";
import { GameMap, IPoint } from "./types";

export function generateMap(width: number, height: number): GameMap {
    const newMap: GameMap = {};
    for (let row = 0; row < height; row++) {
        for (let cell = 0; cell < width; cell++) {
            newMap[getKey(row, cell)] = new MapItem();
        }
    }
    return newMap;
}

export function randomfillMap(point: IPoint, width: number, height: number, minesCount: number): GameMap {

    const map = generateMap(MAX_GAME_WIDTH, MAX_GAME_HEIGHT);

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
            done = map[getKey(r.y, r.x)].val >= 8 || inClick;
        } while (done && n--);

        if (n) {
            map[getKey(r.y, r.x)].val = 9;
            checkBlock(r, width, height, map, (a) => {
                if (a.val < 8) {
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

export function getKey(row: number, cell: number): string {
    return `${row}-${cell}`;
}

type CheckBlockCallback = (item: MapItem, res?: object) => void;

export function checkBlock(
    point: IPoint,
    width: number,
    height: number,
    map: GameMap,
    callback: CheckBlockCallback
): object {
    const startX = point.x - 1 >= 0 ? point.x - 1 : point.x;
    const startY = point.y - 1 >= 0 ? point.y - 1 : point.y;
    let res = {};
    for (let i = startY; i < height && i <= point.y + 1; i++) {
        for (let j = startX; j < width && j <= point.x + 1; j++) {
            callback(map[getKey(i, j)], res);
        }
    }
    return res;
}
