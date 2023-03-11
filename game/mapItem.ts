import { IMapItem, ItemState } from "./types";

export function createMapItem(item?: IMapItem): IMapItem {
    return {
        val: item?.val || 0,
        state: item?.state || ItemState.hidden
    };
}
