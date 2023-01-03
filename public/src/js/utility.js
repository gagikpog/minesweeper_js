import * as maps from './maps.js';

const swapMap = maps.swapMap;

export function swapItems (a, b) {
    const t = a.val;
    a.val = b.val;
    b.val = t;
}

export function changeMap(gameMap, center, caseId) {
    try {
        const map = swapMap[caseId] && swapMap[caseId].swaps || [];
        const getItem = (p) => gameMap[center.y + p.y][center.x + p.x];
        const animationSpeed = 1000;
        const showMine = (item) => item.view.classList.add('cell9');
        const hideMine = (item) => item.view.classList.remove('cell9');

        const animation = (mineFrom, mineTo) => {
            showMine(mineFrom);
            setTimeout(() => {
                hideMine(mineFrom);
                showMine(mineTo);
                setTimeout(() => hideMine(mineTo), animationSpeed);
            }, animationSpeed);
        }

        // check all swaped item before swap
        const cannotBeExchanged = map.some((_item) => {
            const item0 = getItem(_item.p0);
            const item1 = getItem(_item.p1);
            return item0.opened || item1.opened
        });

        if (cannotBeExchanged) {
            return false;
        }

        map.forEach((_item) => {
            const item0 = getItem(_item.p0);
            const item1 = getItem(_item.p1);
            if (item0.opened || item1.opened) {
                return;
            }
            swapItems(item0, item1);

            animation(item0, item1);

            if (item0.val !== 9) {
                item0.val = checkBlock({x : _item.p0.x + center.x, y: _item.p0.y + center.y}, gameMap, function(_item, res) {
                    res.count = res.count || 0;
                    res.count += _item.val === 9;
                }).count;
            }

            if (item1.val !== 9) {
                item1.val = checkBlock({x : _item.p1.x + center.x, y: _item.p1.y + center.y}, gameMap, function(_item, res) {
                    res.count = res.count || 0;
                    res.count += _item.val === 9;
                }).count;
            }

        })
    } catch (error) {
        return false;
    }
    return true;
}

export function getOptimalSize(game) {
    const totalWidth = window.innerWidth - 30;
    const totalHeight = window.innerHeight - 100;
    const kw = totalHeight / game.height;
    const kh = totalWidth / game.width;
    const k = kw < kh ? kw : kh;
    const minSize = game.blockSize.value;
    return k > minSize ? k : minSize;
}

export function checkBlock(point, map, callback) {
    const startX = point.x - 1 >= 0 ? point.x - 1 : point.x;
    const startY = point.y - 1 >= 0 ? point.y - 1 : point.y;
    let res = {};
    for (let i = startY; i < map.length && i <= point.y + 1; i++) {
        for (let j = startX; j < map[i].length && j <= point.x + 1; j++) {
            callback(map[i][j], res);
        }
    }
    return res;
}

export function getCookie(name) {
    if (typeof window === 'undefined') {
        return '';
    }
    // https://stackoverflow.com/questions/10730362/get-cookie-by-name
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
