<?php
    require_once('./utility.php');

    if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        http_response_code(400);
        return;
    }

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    $name = $data['name'];
    $time = $data['time'];
    $level = $data['level'];
    $levels = ['beginner', 'intermediate', 'advanced'];

    $result = [
        'status' => 'error',
        'message' => 'Не удалось сохранить результат.'
    ];

    $levelsChecked = in_array($level, $levels);

    if ($name && $time && $level && $levelsChecked) {
        if (addData($name, $time, $level)) {
            $result['status'] = 'done';
            $result['message'] = 'Результат успешно сохранен.';
        }
    } else {
        if (!$name) {
            $result['message'] = 'Укажите имя!';
        } else
        if (!$level) {
            $result['message'] = 'Укажите сложность!';
        } else
        if (!$time) {
            $result['message'] = 'Укажите количество секунд!';
        } else
        if (!$levelsChecked) {
            $result['message'] = 'Сложность указана неверно!';
        }
    }

    echo json_encode($result);
