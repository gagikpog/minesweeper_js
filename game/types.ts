export interface IMapItem {
    val: number;
    state: ItemState;
    pos: IPoint;
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
    gameOver = 'gameOver',
    gameWin = 'gameWin'
}

export enum ItemValues {
    empty = 0,
    mine = 9
}

export enum EventType {
    click = 'leftClick',
    rightClick = 'rightClick'
}

export type Notifier = (action: string, payload?: any) => void;
export type GameMap = IMapItem[][];

export interface IPoint {
    x: number;
    y: number;
}
