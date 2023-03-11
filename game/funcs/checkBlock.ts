import { GameMap, IMapItem, IPoint } from "../types";
import { mapGetter } from "./getters";

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
