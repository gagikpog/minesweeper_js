export interface IMapItem {
    val: number;
    state: ItemState;
}

export enum ItemState {
    opened = 'opened',
    flag = 'flag',
    hidden = 'hidden'
}

export enum GameState {
    newGame = 'newGame',
    game = 'game',
    pause = 'pause',
    gameOver = 'gameOver'
}

export type Notifier = (action: string, payload?: any) => void;
export type GameMap = IMapItem[][];

export interface IPoint {
    x: number;
    y: number;
}
