
window.levelItemChanged = function (event) {
    import('./game.js').then(({Game}) => {
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

window.notify = function (eventName) {
    let res = new Promise((resolve) => {
        switch (eventName) {
            case 'showSettings':
                import('./settings.js').then(({initSettings}) => {
                    resolve(initSettings.showSettings);
                })
                break;
            case 'newGame':
                import('./game.js').then(({Game}) => {
                    resolve(Game.newGame);
                });
                break;
            case 'leaderBoardToggle':
                import('./leaderBoard.js').then(({leaderBoard}) => {
                    resolve(leaderBoard.toggle);
                });
                break;
            case 'leaderBoardActivateTab':
                import('./leaderBoard.js').then(({leaderBoard}) => {
                    resolve(leaderBoard.activateTab);
                });
                break;
            case 'leaderBoardClose':
                import('./leaderBoard.js').then(({leaderBoard}) => {
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
    });
}
