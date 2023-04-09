import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './gameSlice';
import { timerSlice } from './timerSlice';
import { userSlice } from './userSlice';
import { settingsSlice } from './settingsSlice';
import { statisticSlice } from './statisticSlice';

const reducer = combineReducers({
    game: gameSlice.reducer,
    timer: timerSlice.reducer,
    user: userSlice.reducer,
    settings: settingsSlice.reducer,
    statistics: statisticSlice.reducer
});

export const store = configureStore({ reducer: reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
