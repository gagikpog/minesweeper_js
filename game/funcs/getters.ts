import { GameMap, IMapItem } from "../types";

export function mapGetter(map: GameMap, row: number, cell: number): IMapItem {
    return map?.[row]?.[cell];
}

export function chanelEventGetter(row: number, cell: number): string {
    return `item.${row}.${cell}`;
}
