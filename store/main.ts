import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './gameSlice';
import { timerSlice } from './timerSlice';

const reducer = combineReducers({
    game: gameSlice.reducer,
    timer: timerSlice.reducer
});

export const store = configureStore({ reducer: reducer });

export type RootState = ReturnType<typeof store.getState>;
