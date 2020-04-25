
<?php

    require_once('./rk.php');

    $lang = 'ru';

    if (isset($_COOKIE['lang'])) {
        $lang = htmlspecialchars($_COOKIE['lang']);
    }

    initLang($lang);
?>

<!DOCTYPE html>
<html lang="<?php echo $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320,
            height=device-height, target-densitydpi=medium-dpi">
    <link rel="shortcut icon" href="./src/images/mine.png" type="image/png">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Minesweeper</title>
    <style title="dynamic">
        .cell {
            height: 50px;
            width: 50px;
            line-height: 50px;
        }
        .cell::before {
            font-size: 50px;
            height: 50px;
            width: 50px;
        }
    </style>
</head>
<body>
    <main>
        <div class="head">
            <button onclick="Game.newGame()"><?php echoRk('New game'); ?></button>
            <button id="mines">10</button>
            <button id="time"><?php echoRk('Time'); ?> 0</button>
            <select name="level" id="level" onchange="levelItemChanged(this)">
                <option selected value="beginner"><?php echoRk('Beginner'); ?></option>
                <option value="intermediate"><?php echoRk('Intermediate'); ?></option>
                <option value="advanced"><?php echoRk('Advanced'); ?></option>
            </select>
            <button id="settings" onclick="initSettings.showSettings()">&#9881;</button>
            <svg id="leaderBoardButton" class="head-menu__leader-board" onclick="leaderBoard.toggle()" xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 3.5 2 L 7.34375 9.75 C 5.9001211 11.027199 5 12.895769 5 15 C 5 18.9 8.1 22 12 22 C 15.9 22 19 18.9 19 15 C 19 12.88714 18.078999 11.027538 16.625 9.75 L 20.5 2 L 18.3125 2 L 14.96875 8.625 C 14.269322 8.3029826 13.493457 8.1082048 12.6875 8.03125 L 15.6875 2 L 13.5 2 L 10.4375 8.1875 C 9.9967633 8.2867425 9.5599118 8.4167807 9.15625 8.59375 L 5.8125 2 L 3.5 2 z M 8.5 2 L 10.1875 5.40625 L 11.1875 3.40625 L 10.5 2 L 8.5 2 z M 12 10 C 14.8 10 17 12.2 17 15 C 17 17.8 14.8 20 12 20 C 9.2 20 7 17.8 7 15 C 7 12.2 9.2 10 12 10 z M 11.6875 12 C 11.5875 12.3 11.0875 13.1875 10.1875 13.1875 L 10.1875 14.1875 L 11.3125 14.1875 L 11.3125 18 L 12.8125 18 L 12.90625 18 L 12.90625 12 L 11.6875 12 z"/></svg>
        </div>
        <div class="scroll-container">
            <table id="game"></table>
        </div>
    </main>
    <div id="blocker"></div>

    <script src="https://gagikpog.ru/data/libs/loader.js"></script>
    <script>
        const data = {
            version: 0,
            styles: [
                './src/styles/main.css',
                './src/styles/leaderBoard.css'
            ],
            scripts: [
                './src/main.js',
                './src/view.js',
                './src/game.js',
                './src/settings.js',
                './src/zoom.js',
                './src/statistics.js',
                './src/maps.js',
                './src/localizate/rk.js',
                './src/scripts/leaderBoard.js',
                './src/scripts/swapUtility.js',
                'https://gagikpog.ru/confirm/confirm.min.js',
                'https://gagikpog.ru/data/libs/quicksettings.min.js'
            ]
        };
        const platform = navigator.platform.toLowerCase();
        if (platform.includes('mac') || platform.includes('ipad') ||  platform.includes('iphone')) {
            data.scripts.push('src/long-press-event.js');
            data.scripts.push('src/iPad.js');
        }
        loader(data).then(() => {
            documentLoaded();
        });
    </script>

    <div style="display: none;" class="text-wrapper" id="text-wrapper">
        <div class="form-wrapper">
            <input required name="userName" placeholder="<?php echoRk('Enter name!'); ?> " type="text">
            <div class="form-remember">
                <label for="rememberName"> <?php echoRk('Remember this name'); ?> </label>
                <input name="rememberName" type="checkbox">
            </div>
        </div>
    </div>

    <!-- fake item for loading mine icon -->
    <div class="cell9"></div>

        <div id="leaderBoardDialog" class="leader-board__main">
            <div class="leader-board__head">
                <div class="leader-board__head-caption"><?php echoRk('Leaderboard'); ?></div>
                <div class="leader-board__head-close-button" onclick="leaderBoard.close()">
                    <svg id="Capa_1" enable-background="new 0 0 413.348 413.348" height="15px" viewBox="0 0 413.348 413.348" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"/></svg>
                </div>
            </div>
            <div class="leader-board__tabs" onclick="leaderBoard.activateTab(this, event)">
                <div data-name="beginner" class="leader-board__tab leader-board__tab-beginner leader-board__tab-active"><?php echoRk('Beginner'); ?></div>
                <div data-name="intermediate" class="leader-board__tab leader-board__tab-intermediate"><?php echoRk('Intermediate'); ?></div>
                <div data-name="advanced" class="leader-board__tab leader-board__tab-advanced"><?php echoRk('Advanced'); ?></div>
            </div>
            <div class="leader-board__column-titles">
                <div class="leader-board__column-title leader-board__column-title_name"><?php echoRk('Name'); ?></div>
                <div class="leader-board__column-title leader-board__column-title_date"><?php echoRk('Date'); ?></div>
                <div class="leader-board__column-title leader-board__column-title_time"><?php echoRk('Duration'); ?></div>
            </div>
            <div id="leaderBoardBody" class="leader-board__body"></div>
        </div>

    <script>
        window.translate = <?php echo $GLOBALS['translate']; ?> ;
    </script>

</body>
</html>