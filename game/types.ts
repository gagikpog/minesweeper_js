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

export enum ChanelEvents {
    TogglePushing = 'togglePushing',
    ToggleMine = 'toggleMine',
}

export enum GameLevels {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced'
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

export enum ServiceStatus {
    Success = 'done',
    Error = 'error'
}

export interface IStatisticsItem {
    date: string;
    name: string;
    time: string;
}

export interface IServiceResult<TRes> {
    data: TRes;
    message: string;
    status: ServiceStatus;
}
