import { createSlice, configureStore } from '@reduxjs/toolkit';
import { MAX_GAME_HEIGHT, MAX_GAME_WIDTH } from '../game/constants';
import { generateMap } from '../game/function';

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
        totalMines: 10,
        godMode: true,
        animationSpeed: 50,
        defaultAnimationSpeed: 50,
        gameMap: generateMap(MAX_GAME_WIDTH, MAX_GAME_HEIGHT)
    },
    reducers: {
        setGameMap: (state, action) => {
            state.gameMap = action.payload;
        }
    }
});

export const { setGameMap } = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
