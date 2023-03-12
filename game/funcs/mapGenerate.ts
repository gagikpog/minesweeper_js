import { createMapItem } from "./mapItem";
import { GameMap, IPoint } from "../types";
import { checkBlock } from "./checkBlock";
import { mapGetter } from "./getters";
// import { positions } from "./mapGeneratorPoints";

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
            // return nextPos.next().value as IPoint;
            return { x, y };
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