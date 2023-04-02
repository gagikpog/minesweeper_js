import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { asyncOpenItem, updateStateOnItemsOpen } from '../game/engine';
import { generateMap, randomfillMap } from '../game/funcs/mapGenerate';
import { mapGetter } from '../game/funcs/getters';
import { GameLevels, GameState, ItemState } from '../game/types';
import { getLevelSettings } from '../game/funcs/gameLevels';

export const openItem = createAsyncThunk('game/openItem', asyncOpenItem);
const levelData = getLevelSettings(GameLevels.Beginner);

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        width: levelData.width,
        height: levelData.height,
        blockSize: {
            value: 50,
            min: 25,
            max: 70,
            default: 25
        },
        userName: '',
        time: 0,
        timerRunningId: 0,
        level: levelData.level,
        gameState: GameState.newGame,
        displayBlocked: false,
        totalMines: levelData.totalMines,
        remainingMines: 0,
        godMode: true,
        openedCount: 0,
        animationSpeed: 50,
        defaultAnimationSpeed: 50,
        gameMap: generateMap(0, 0)
    },
    reducers: {
        runNewGame: (state, action) => {
            const conf = action.payload;
            const newMap = randomfillMap(conf.point, state.width, state.height, state.totalMines);
            state.gameMap = newMap;
            state.gameState = GameState.game;
            setTimeout(() => import('./main').then(({store}) => store.dispatch(runTimer(null))), 1000);
        },
        toggleItemFlag(state, action) {
            const item = mapGetter(state.gameMap, action.payload.point.y, action.payload.point.x);
            if (item.state === ItemState.flag) {
                item.state = ItemState.hidden;
                state.remainingMines--;
            } else if (item.state === ItemState.hidden) {
                item.state = ItemState.flag;
                state.remainingMines++;
            }
        },
        toggleDisplayBlocked(state, action) {
            state.displayBlocked = action.payload;
        },
        gameWin(state, action) {
            state.gameState = GameState.gameWin;
        },
        gameOver(state, action) {
            state.gameState = GameState.gameOver;
        },
        newGame(state, action) {
            state.gameState = GameState.newGame;
            state.gameMap = generateMap(0, 0);
            state.remainingMines = 0;
            state.openedCount = 0;
            state.time = 0;
        },
        changeLevel(state, action) {
            const data = getLevelSettings(action.payload);
            state.level = action.payload;
            state.width = data.width;
            state.height = data.height;
            state.totalMines = data.totalMines;

            setTimeout(() => {
                import('./main').then(({store}) => store.dispatch(newGame(null)));
            }, 0);
        },
        runTimer(state, action) {
            if (!state.timerRunningId && state.gameState === GameState.game) {
                state.time++;
                state.timerRunningId = setInterval(() => import('./main').then(({store}) => store.dispatch(stepTimer(null))), 1000) as unknown as number;
            }
        },
        stepTimer(state, action) {
            if (state.gameState === GameState.game) {
                state.time++;
            } else if (state.timerRunningId) {
                clearInterval(state.timerRunningId);
                state.timerRunningId = 0;
            }
        },
        loadGame(state, action) {
            const data: Partial<TGameState> = action.payload;
            const keys = Object.keys(data) as (keyof TGameState)[];
            keys.forEach((key) => {
                const value = data[key];
                if (data.hasOwnProperty(key) && value && typeof state[key] === typeof value) {
                    state[key] = value as never;
                }
            });

            setTimeout(() => {
                import('./main').then(({store}) => store.dispatch(runTimer(null)));
            }, 0);
        },
        openItemsList(state, action) {
            updateStateOnItemsOpen(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(openItem.fulfilled, (state, action) => {
            updateStateOnItemsOpen(state, {
                openedCount: action.payload.opened ? 1 : 0,
                changes: action.payload.changes,
                gameOver: action.payload.gameOver
            });
        });
    }
});

export const {
    runNewGame,
    toggleItemFlag,
    gameWin,
    gameOver,
    newGame,
    changeLevel,
    runTimer,
    stepTimer,
    loadGame,
    openItemsList
} = gameSlice.actions;

export type TGameState = ReturnType<typeof gameSlice.reducer>;
