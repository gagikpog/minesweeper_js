<?php

    $lang = 'ru';

    $translate = file_get_contents('./api/en-ru.json');

    $json = (array)json_decode("$translate");

    function rk($str) {
        $pattern = '/^.*@@s@/';
        if($GLOBALS['lang'] == 'en') {
            return preg_replace($pattern, '', $str);
        }
        $json = $GLOBALS['json'];
        return $json[$str] ? $json[$str] : preg_replace($pattern, '', $str);
    }

    function echoRk($str) {
        echo rk($str);
    }

    function initLang($_lang) {
        $langs = ['ru', 'en'];
        if (in_array($_lang, $langs)) {
            $GLOBALS['lang'] = $_lang;
        }
    }
