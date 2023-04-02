import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './gameSlice';

const reducer = combineReducers({
    game: gameSlice.reducer
});

export const store = configureStore({
    reducer: reducer
});

export type RootState = ReturnType<typeof store.getState>;
