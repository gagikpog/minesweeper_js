import { createSlice, configureStore } from '@reduxjs/toolkit';
import { generateMap, randomfillMap } from '../game/function';
import { GameState } from '../game/types';

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
        totalMines: 10,
        godMode: true,
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
        }
    }
});

export const { setGameMap, setGameState, runNewGame } = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
