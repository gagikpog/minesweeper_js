import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { asyncOpenItem, updateStateOnItemsOpen } from '../game/engine';
import { generateMap, randomfillMap } from '../game/funcs/mapGenerate';
import { mapGetter } from '../game/funcs/getters';
import { GameLevels, GameState, IMapItem, ItemState } from '../game/types';
import { getLevelSettings } from '../game/funcs/gameLevels';

const openItem = createAsyncThunk('game/openItem', asyncOpenItem);
const levelData = getLevelSettings(GameLevels.Beginner);

const gameSlice = createSlice({
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
        setGameMap: (state, action) => {
            state.gameMap = action.payload;
        },
        setGameState: (state, action) => {
            state.gameState = action.payload;
        },
        runNewGame: (state, action) => {
            const conf = action.payload;
            const newMap = randomfillMap(conf.point, state.width, state.height, state.totalMines);
            state.gameMap = newMap;
            state.gameState = GameState.game;
            setTimeout(() => store.dispatch(runTimer(null)), 1000);
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
                store.dispatch(newGame(null));
            }, 0);
        },
        runTimer(state, action) {
            if (state.gameState === GameState.game) {
                state.time++;
                setTimeout(() => store.dispatch(runTimer(null)), 1000);
            }
        },
        loadGame(state, action) {
            const data: Partial<RootState> = action.payload;
            const keys = Object.keys(data) as (keyof RootState)[];
            keys.forEach((key) => {
                const value = data[key];
                if (data.hasOwnProperty(key) && value && typeof state[key] === typeof value) {
                    state[key] = value as never;
                }
            });

            setTimeout(() => {
                store.dispatch(runTimer(null));
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
    setGameMap,
    setGameState,
    runNewGame,
    toggleItemFlag,
    gameWin,
    gameOver,
    newGame,
    changeLevel,
    runTimer,
    loadGame,
    openItemsList
} = gameSlice.actions;

export { openItem };

export const store = configureStore({
    reducer: gameSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
