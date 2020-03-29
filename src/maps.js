// https://1drv.ms/x/s!AhziwSL0ZF01gd9uMWxIHcpM_EygMg?e=44RjtA

const maps = [
    462862, 14684608, 612928, 308512,
    19141184, 9507104, 299081, 594194
];

const swapMap = [
    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: 0, y: 1 }
        }
    ],
    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: 0, y: -1 }
        }
    ],
    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: -1, y: 0 }
        }
    ],
    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: 1, y: 0 }
        }
    ],

    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: -1, y: 0 }
        },
        {
            p0: { x: 0, y: -1 },
            p1: { x: -1, y: -1 }
        }
    ],
    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: 1, y: 0 }
        },
        {
            p0: { x: 0, y: -1 },
            p1: { x: 1, y: -1 }
        }
    ],
    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: 1, y: 0 }
        },
        {
            p0: { x: 0, y: 1 },
            p1: { x: 1, y: 1 }
        }
    ],
    [
        {
            p0: { x: 0, y: 0 },
            p1: { x: -1, y: 0 }
        },
        {
            p0: { x: 0, y: 1 },
            p1: { x: -1, y: 1 }
        }
    ]
];

// map for testing game
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