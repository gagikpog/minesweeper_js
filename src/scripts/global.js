
function levelItemChanged(event) {
    require(['modules/game'], (Game) => {
        switch (event.value) {
            case 'beginner':
                Game.totalMines = 10;
                Game.setSize(10, 10);
                break;
            case 'intermediate':
                Game.totalMines = 40;
                Game.setSize(16, 16);
                break;
            case 'advanced':
                Game.totalMines = 99;
                Game.setSize(30, 16);
                break;
            case 'custom':
                break;
        }
        Game.newGame();
        window.localStorage.setItem('level', event.value);
    });
}

function notify(eventName) {
    let res = new Promise((resolve) => {
        switch (eventName) {
            case 'showSettings':
                require(['modules/settings'], (initSettings) => {
                    resolve(initSettings.showSettings);
                })
                break;
            case 'newGame':
                require(['modules/game'], (Game) => {
                    resolve(Game.newGame);
                });
                break;
            case 'leaderBoardToggle':
                require(['modules/leaderBoard'], (leaderBoard) => {
                    resolve(leaderBoard.toggle);
                });
                break;
            case 'leaderBoardActivateTab':
                require(['modules/leaderBoard'], (leaderBoard) => {
                    resolve(leaderBoard.activateTab);
                });
                break;
            case 'leaderBoardClose':
                require(['modules/leaderBoard'], (leaderBoard) => {
                    resolve(leaderBoard.close);
                });
                break;
            default:
                resolve(null);
        }

    });

    res.then((func) => {
        if ('function' === typeof func) {
            const args = [...arguments];
            args.shift()
            func(...args);
        }

    })

}

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
