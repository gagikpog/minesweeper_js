
function swapItems (a, b) {
    const t = a.val;
    a.val = b.val;
    b.val = t;
}

function changeMap(gameMap, center, caseId) {
    try {
        const map = swapMap[caseId] && swapMap[caseId].swaps || [];
        const getItem = (p) => gameMap[center.y + p.y][center.x + p.x];

        // check all swaped item before swap
        const cannotBeExchanged = map.some((_item) => {
            item0 = getItem(_item.p0);
            item1 = getItem(_item.p1);
            return item0.opened || item1.opened
        });

        if (cannotBeExchanged) {
            return false;
        }

        map.forEach((_item) => {
            item0 = getItem(_item.p0);
            item1 = getItem(_item.p1);
            if (item0.opened || item1.opened) {
                return;
            }
            swapItems(item0, item1);

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
};