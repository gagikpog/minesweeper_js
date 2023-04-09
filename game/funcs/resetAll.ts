import { 
    LOCAL_STORE_GAME_KEY,
    LOCAL_STORE_TIMER_KEY,
    LOCAL_STORE_USER_KEY,
    LOCAL_STORE_SETTINGS_KEY,
 } from "../constants";

export function resetAll() {
    localStorage.removeItem(LOCAL_STORE_GAME_KEY);
    localStorage.removeItem(LOCAL_STORE_TIMER_KEY);
    localStorage.removeItem(LOCAL_STORE_USER_KEY);
    localStorage.removeItem(LOCAL_STORE_SETTINGS_KEY);
    window.location.reload();
}
