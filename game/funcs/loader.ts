import { GAME_SAVE_ITEMS, LOCAL_STORE_GAME_KEY, LOCAL_STORE_TIMER_KEY, LOCAL_STORE_USER_KEY, TIMER_SAVE_ITEMS, USER_SAVE_ITEMS } from "../constants";
import { getLevelSettings } from "./gameLevels";
import { debounce } from "./debounce";
import { isClient } from "../detection";
import { TGameState } from "../../store/gameSlice";
import { TTimerState } from "../../store/timerSlice";
import { TUserState } from "../../store/userSlice";

function read<TState>(storeId: string): Partial<TState> {
    let data: Partial<TState> = {};

    if (isClient()) {
        try {
            const storeData = window.localStorage.getItem(storeId);
            if (storeData) {
                data = JSON.parse(storeData);
            }
        } catch(error) {
            console.error(error);
        }
    }
    return data;
}

function write<TState>(storeId: string, data: Partial<TState>, items: (keyof TState)[]): void {
    if (isClient()) {
        try {
            const state: Partial<TState> = {}
            items.forEach((key) => {
                const value = data[key];
                if (data.hasOwnProperty(key) && value !== undefined) {
                    state[key] = value as never;
                }
            });

            const dataStr = JSON.stringify(state);
            window.localStorage.setItem(storeId, dataStr);
        } catch (error) {
            console.error(error);
        }
    }
}

export function loadGameState(): Promise<Partial<TGameState>> {
    const data = read<TGameState>(LOCAL_STORE_GAME_KEY);
    const levelData = data.level ? getLevelSettings(data.level) : {};

    return Promise.resolve({ ...data, ...levelData });
}

export function loadTimerState(): Promise<Partial<TTimerState>> {
    return Promise.resolve(read<TTimerState>(LOCAL_STORE_TIMER_KEY));
}

export function loadUserState(): Promise<Partial<TUserState>> {
    return Promise.resolve(read<TUserState>(LOCAL_STORE_USER_KEY));
}

export const saveGameState = debounce((data: Partial<TGameState>) => write<TGameState>(LOCAL_STORE_GAME_KEY, data, GAME_SAVE_ITEMS), 250);
export const saveTimerState = debounce((data: Partial<TTimerState>) => write<TTimerState>(LOCAL_STORE_TIMER_KEY, data, TIMER_SAVE_ITEMS), 250);
export const saveUserState = debounce((data: Partial<TUserState>) => write<TUserState>(LOCAL_STORE_USER_KEY, data, USER_SAVE_ITEMS), 250);
