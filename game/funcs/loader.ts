import { RootState } from "../../store/main";
import { LOCAL_STORE_DATA_KEY } from "../constants";
import { getLevelSettings } from "./gameLevels";
import { debounce } from "./debounce";

function isClient(): boolean {
    return typeof window !== 'undefined';
}

export function loadGameState(): Promise<Partial<RootState>> {
    let data: Partial<RootState> = {};

    if (isClient()) {
        try {
            const storeData = window.localStorage.getItem(LOCAL_STORE_DATA_KEY);
            if (storeData) {
                data = JSON.parse(storeData);
            }
        } catch(error) {
            console.error(error);
        }
    }

    const levelData = data.level ? getLevelSettings(data.level) : {};

    return Promise.resolve({
        ...data,
        ...levelData
    });
}

function save(data: Partial<RootState>): void {
    if (isClient()) {
        try {
            const dataStr = JSON.stringify(data);
            window.localStorage.setItem(LOCAL_STORE_DATA_KEY, dataStr);
        } catch (error) {
            console.error(error);
        }
    }
}

export const saveGameState = debounce(save, 250);
