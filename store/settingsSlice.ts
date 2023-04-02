import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        godMode: true,
        animationSpeed: 50,
        blockSize: {
            value: 50,
            min: 25,
            max: 70,
            default: 25
        },
    },
    reducers: {
        loadSettings(state, action) {
            const data: Partial<TSettingsState> = action.payload;
            const keys = Object.keys(data) as (keyof TSettingsState)[];
            keys.forEach((key) => {
                const value = data[key];
                if (data.hasOwnProperty(key) && value && typeof state[key] === typeof value) {
                    state[key] = value as never;
                }
            });
        }
    }
});

export const { loadSettings } = settingsSlice.actions;

export type TSettingsState = ReturnType<typeof settingsSlice.reducer>;
