import { TGameState } from "../store/gameSlice";
import { TSettingsState } from "../store/settingsSlice";
import { TTimerState } from "../store/timerSlice";
import { TUserState } from "../store/userSlice";

export const API_ROOT = '/';
// export const API_ROOT = 'https://minesweeper.gagikpog.ru/';
export const MAX_GAME_WIDTH = 30;
export const MAX_GAME_HEIGHT = 16;
// Local store keys
export const LOCAL_STORE_KEY = 'minesweeper-data';
export const LOCAL_STORE_GAME_KEY = `${LOCAL_STORE_KEY}_game-state`;
export const LOCAL_STORE_TIMER_KEY = `${LOCAL_STORE_KEY}_timer-state`;
export const LOCAL_STORE_USER_KEY = `${LOCAL_STORE_KEY}_user-state`;
export const LOCAL_STORE_SETTINGS_KEY = `${LOCAL_STORE_KEY}_settings-state`;
// Local store save data
export const TIMER_SAVE_ITEMS: (keyof TTimerState)[] = ['time'];
export const USER_SAVE_ITEMS: (keyof TUserState)[] = ['username', 'email', 'neverShowRegistration'];
export const SETTINGS_SAVE_ITEMS: (keyof TSettingsState)[] = ['blockSize', 'godMode', 'animationSpeed', 'lang', 'padding'];
export const GAME_SAVE_ITEMS: (keyof TGameState)[] = ['level', 'gameState', 'remainingMines', 'openedCount', 'gameMap'];

// https://1drv.ms/x/s!AhziwSL0ZF01gd9uMWxIHcpM_EygMg?e=44RjtA

export const SWAP_MAP = {
    462862: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: 0, y: 1 }
            }
        ],
        inversed: 0
    },
    14684608: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: 0, y: -1 }
            }
        ],
        inversed: 0
    },
    612928: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: -1, y: 0 }
            }
        ],
        inversed: 0
    },

    308512: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: 1, y: 0 }
            }
        ],
        inversed: 0
    },

    // ---------------
    19141184: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: -1, y: 0 }
            },
            {
                p0: { x: -1, y: -1 },
                p1: { x: 0, y: -1 }
            }
        ],
        inversed: 139264
    },

    9507104: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: 1, y: 0 }
            },
            {
                p0: { x: 1, y: -1 },
                p1: { x: 0, y: -1 }
            }
        ],
        inversed: 133120
    },
    299081: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: 1, y: 0 }
            },
            {
                p0: { x: 1, y: 1 },
                p1: { x: 0, y: 1 }
            }
        ],
        inversed: 2176
    },
    594194: {
        swaps: [
            {
                p0: { x: 0, y: 0 },
                p1: { x: -1, y: 0 }
            },
            {
                p0: { x: -1, y: 1 },
                p1: { x: 0, y: 1 }
            }
        ],
        inversed: 8320
    }
};

export type CaseId = keyof typeof SWAP_MAP;

export const MAPS: CaseId[] = [ 462862, 14684608, 612928, 308512, 19141184, 9507104, 299081, 594194 ];
