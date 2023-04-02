import { combineReducers, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { asyncOpenItem } from '../game/engine';
const openItem = createAsyncThunk('game/openItem', asyncOpenItem);


import { gameSlice } from './gameSlice';

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
    stepTimer,
    loadGame,
    openItemsList
} = gameSlice.actions;

export { openItem };

const reducer = combineReducers({
    game: gameSlice.reducer
});

export const store = configureStore({
    reducer: reducer
});

export type RootState = ReturnType<typeof store.getState>;
