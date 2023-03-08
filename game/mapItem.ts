import { Notifier, ItemState } from "./types";

export class MapItem {
    val: number = 0;
    state: ItemState = ItemState.hidden;

    constructor(item?: MapItem) {
        if (item) {
            this.val = item.val;
            this.state = item.state;
        }
    }
}
