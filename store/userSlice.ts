import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        neverShowRegistration: false
    },
    reducers: {
        loadUser(state, action) {
            const data: Partial<TUserState> = action.payload;
            const keys = Object.keys(data) as (keyof TUserState)[];
            keys.forEach((key) => {
                const value = data[key];
                if (data.hasOwnProperty(key) && value && typeof state[key] === typeof value) {
                    state[key] = value as never;
                }
            });
        }
    }
});

export const { loadUser } = userSlice.actions;

export type TUserState = ReturnType<typeof userSlice.reducer>;
