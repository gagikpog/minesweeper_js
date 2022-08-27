// https://1drv.ms/x/s!AhziwSL0ZF01gd9uMWxIHcpM_EygMg?e=44RjtA

export const maps = [
    462862, 14684608, 612928, 308512,
    19141184, 9507104, 299081, 594194
];

export const swapMap = {
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

// map for testing game
/*
function* positions() {
    yield {x: 0 + 5, y: 0 + 3};
    yield {x: 3 + 5, y: 0 + 3};
    yield {x: 2 + 5, y: 1 + 3};
    yield {x: 1 + 5, y: 2 + 3};
    yield {x: 0 + 5, y: 3 + 3};
    yield {x: 3 + 5, y: 3 + 3};

    yield {x: 6 + 5, y: 5 + 3};
    yield {x: 6 + 5, y: 8 + 3};
    yield {x: 8 + 5, y: 8 + 3};
    yield {x: 9 + 5, y: 9 + 3};
    return 3;
}

function* positionsForBug() {

    const offsetX = 0;
    const offsetY = -3;

    yield {x: 0 + offsetX, y: 9 + offsetY};
    yield {x: 1 + offsetX, y: 8 + offsetY};
    yield {x: 3 + offsetX, y: 9 + offsetY};
    yield {x: 4 + offsetX, y: 8 + offsetY};
    yield {x: 4 + offsetX, y: 9 + offsetY};

    yield {x: 1 + offsetX, y: 11 + offsetY};
    yield {x: 4 + offsetX, y: 11 + offsetY};
    yield {x: 2 + offsetX, y: 10 + offsetY};
    
    yield {x: 9 + offsetX, y: 9 + offsetY};
    yield {x: 5 + offsetX, y: 3 + offsetY};


    yield {x: 9 + offsetX, y: 8 + offsetY};
    yield {x: 9 + offsetX, y: 7 + offsetY};
    yield {x: 9 + offsetX, y: 6 + offsetY};
    return 3;
}
*/
