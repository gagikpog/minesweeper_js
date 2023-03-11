import { IMapItem, ItemState } from "./types";

export function createMapItem(item?: Partial<IMapItem>): IMapItem {
    return {
        val: item?.val || 0,
        state: item?.state || ItemState.hidden,
        pos: item?.pos || { x: -1, y: -1 }
    };
}
