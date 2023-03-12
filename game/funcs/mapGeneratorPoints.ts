// map for testing game

export function* positions() {
    yield { x: 0 + 5, y: 0 + 3 };
    yield { x: 3 + 5, y: 0 + 3 };
    yield { x: 2 + 5, y: 1 + 3 };
    yield { x: 1 + 5, y: 2 + 3 };
    yield { x: 0 + 5, y: 3 + 3 };
    yield { x: 3 + 5, y: 3 + 3 };

    yield { x: 6 + 0, y: 5 + 0 };
    yield { x: 6 + 0, y: 8 + 0 };
    yield { x: 8 + 0, y: 8 + 0 };
    yield { x: 8 + 0, y: 9 + 0 };
    yield { x: 9 + 0, y: 9 + 0 };
    return 3;
}

export function* positionsForBug() {

    const offsetX = 0;
    const offsetY = -3;

    yield { x: 0 + offsetX, y: 9 + offsetY };
    yield { x: 1 + offsetX, y: 8 + offsetY };
    yield { x: 3 + offsetX, y: 9 + offsetY };
    yield { x: 4 + offsetX, y: 8 + offsetY };
    yield { x: 4 + offsetX, y: 9 + offsetY };

    yield { x: 1 + offsetX, y: 11 + offsetY };
    yield { x: 4 + offsetX, y: 11 + offsetY };
    yield { x: 2 + offsetX, y: 10 + offsetY };

    yield { x: 9 + offsetX, y: 9 + offsetY };
    yield { x: 5 + offsetX, y: 3 + offsetY };


    yield { x: 9 + offsetX, y: 8 + offsetY };
    yield { x: 9 + offsetX, y: 7 + offsetY };
    yield { x: 9 + offsetX, y: 6 + offsetY };
    return 3;
}
