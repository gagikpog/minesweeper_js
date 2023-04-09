import { ISettingsResult } from '../components/dialogs/settings';
import { controller as DialogController } from '../dialog/dialogProvider';
import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        godMode: false,
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
                if (data.hasOwnProperty(key) && value !== undefined && typeof state[key] === typeof value) {
                    state[key] = value as never;
                }
            });
        }
    }
});

export const { loadSettings } = settingsSlice.actions;

export type TSettingsState = ReturnType<typeof settingsSlice.reducer>;

export function showSettings() {
    return import('../components/dialogs/settings').then(({ Settings }) => {
        return new Promise((resolve) => {
            let resolved = false;
            const onResolve = (val: boolean | Promise<boolean>) => {
                if (!resolved) {
                    resolved = true;
                    resolve(val)
                }
            };
            DialogController.open<ISettingsResult>( {
                id: 'register',
                props: {
                    modal: true,
                    handlers: {
                        onResult(res) {
                            onResolve(true);
                        },
                        onClose() {
                            onResolve(false);
                        }
                    }
                },
                template: Settings
            });
        });
    });
}
