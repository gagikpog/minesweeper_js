import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        time: 0,
        timerRunningId: 0
    },
    reducers: {
        runTimer(state, action) {
            if (!state.timerRunningId) {
                state.time++;
                state.timerRunningId = setInterval(() => import('./main').then(({store}) => store.dispatch(stepTimer())), 1000) as unknown as number;
            }
        },
        stepTimer(state) {
            state.time++;
        },
        resetTimer(state) {
            if (state.timerRunningId) {
                clearInterval(state.timerRunningId);
                state.timerRunningId = 0;
            }
            state.time = 0;
        },
        stopTimer(state) {
            if (state.timerRunningId) {
                clearInterval(state.timerRunningId);
                state.timerRunningId = 0;
            }
        },
        loadTimer(state, action) {
            const data: Partial<TTimerState> = action.payload;
            const keys = Object.keys(data) as (keyof TTimerState)[];
            keys.forEach((key) => {
                const value = data[key];
                if (data.hasOwnProperty(key) && value && typeof state[key] === typeof value) {
                    state[key] = value as never;
                }
            });
        }
    }
});

const { stepTimer } = timerSlice.actions;

export const { runTimer, resetTimer, stopTimer, loadTimer } = timerSlice.actions;

export type TTimerState = ReturnType<typeof timerSlice.reducer>;
