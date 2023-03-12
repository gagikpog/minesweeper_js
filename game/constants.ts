export const MAX_GAME_WIDTH = 30;
export const MAX_GAME_HEIGHT = 16;

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
