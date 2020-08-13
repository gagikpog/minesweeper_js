
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
            height=device-height">
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
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        

        html, body {
            height: 100%;
        }

        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #1E1E1E;
        }

        #stub {
            color: #fff;
            font-size: 10vw;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <main id="mainContent" style="display: none;">
        <div class="head">
            <button onclick="notify('newGame')"><?php echoRk('New game'); ?></button>
            <button id="mines">10</button>
            <button id="time"><?php echoRk('Time'); ?> 0</button>
            <select name="level" id="level" onchange="levelItemChanged(this)">
                <option selected value="beginner"><?php echoRk('Beginner'); ?></option>
                <option value="intermediate"><?php echoRk('Intermediate'); ?></option>
                <option value="advanced"><?php echoRk('Advanced'); ?></option>
            </select>
            <button id="settings" onclick="notify('showSettings')">&#9881;</button>
            <svg id="leaderBoardButton" class="head-menu__leader-board" onclick="notify('leaderBoardToggle')" xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 3.5 2 L 7.34375 9.75 C 5.9001211 11.027199 5 12.895769 5 15 C 5 18.9 8.1 22 12 22 C 15.9 22 19 18.9 19 15 C 19 12.88714 18.078999 11.027538 16.625 9.75 L 20.5 2 L 18.3125 2 L 14.96875 8.625 C 14.269322 8.3029826 13.493457 8.1082048 12.6875 8.03125 L 15.6875 2 L 13.5 2 L 10.4375 8.1875 C 9.9967633 8.2867425 9.5599118 8.4167807 9.15625 8.59375 L 5.8125 2 L 3.5 2 z M 8.5 2 L 10.1875 5.40625 L 11.1875 3.40625 L 10.5 2 L 8.5 2 z M 12 10 C 14.8 10 17 12.2 17 15 C 17 17.8 14.8 20 12 20 C 9.2 20 7 17.8 7 15 C 7 12.2 9.2 10 12 10 z M 11.6875 12 C 11.5875 12.3 11.0875 13.1875 10.1875 13.1875 L 10.1875 14.1875 L 11.3125 14.1875 L 11.3125 18 L 12.8125 18 L 12.90625 18 L 12.90625 12 L 11.6875 12 z"/></svg>
        </div>
        <div class="scroll-container">
            <table id="game"></table>
        </div>
    </main>
    <div id="stub">Minesweeper</div>
    <div id="blocker"></div>

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

    <div id="leaderBoardDialog" style="display: none;" class="leader-board__main">
        <div class="leader-board__head">
            <div class="leader-board__head-caption"><?php echoRk('Leaderboard'); ?></div>
            <div class="leader-board__head-close-button" onclick="notify('leaderBoardClose')">
                <svg id="Capa_1" enable-background="new 0 0 413.348 413.348" height="15px" viewBox="0 0 413.348 413.348" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"/></svg>
            </div>
        </div>
        <div class="leader-board__tabs" onclick="notify('leaderBoardActivateTab', this, event)">
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

    <script src="https://gagikpog.ru/data/libs/require.js"></script>
    <script src="./src/scripts/loader.js"></script>

</body>
</html>
