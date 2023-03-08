import { MapItem } from "./mapItem";

export enum ItemState {
    opened = 'opened',
    flag = 'flag',
    hidden = 'hidden'
}

export type Notifier = (action: string, payload?: any) => void;
export type GameMap = {[key: string]: MapItem};

export interface IPoint {
    x: number;
    y: number;
}
