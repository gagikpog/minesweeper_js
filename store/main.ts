import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { asyncOpenItem, checkEnd } from '../game/engine';
import { generateMap, mapGetter, randomfillMap } from '../game/function';
import { GameState, ItemState } from '../game/types';

const openItem = createAsyncThunk('game/openItem', asyncOpenItem);

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        width: 10,
        height: 10,
        blockSize: {
            value: 50,
            min: 25,
            max: 70,
            default: 25
        },
        userName: '',
        gameState: GameState.newGame,
        displayBlocked: false,
        totalMines: 10,
        remainingMines: 0,
        godMode: false,
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(openItem.fulfilled, (state, action) => {
            if (action.payload.opened) {
                state.openedCount++;
            }

            if (action.payload.gameOver) {
                setTimeout(() => {
                    store.dispatch(gameOver(null));
                }, 0);
            }

            state.gameMap[action.payload.item.pos.y][action.payload.item.pos.x] = action.payload.item;

            const { totalMines, width, height, openedCount } = state;

            if (width * height - totalMines - openedCount === 0) {
                setTimeout(() => {
                    store.dispatch(gameWin(null));
                }, 0);
            }

        });
    }
});

export const { setGameMap, setGameState, runNewGame, toggleItemFlag, gameWin, gameOver } = gameSlice.actions;
export { openItem };

export const store = configureStore({
    reducer: gameSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
