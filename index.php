
<?php

    require_once('./rk.php');

    $lang = htmlspecialchars($_COOKIE["lang"]);

    initLang($lang);
?>

<!DOCTYPE html>
<html lang="<?php echo $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320,
            height=device-height, target-densitydpi=medium-dpi">
    <link rel="shortcut icon" href="./src/mine.png" type="image/png">
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
                './src/main.css'
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

    <script>
        window.translate = <?php echo $GLOBALS['translate']; ?> ;
    </script>

</body>
</html>