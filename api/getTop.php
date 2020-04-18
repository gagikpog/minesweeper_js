<?php
    require_once('./utility.php');

    if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        http_response_code(400);
        return;
    }

    $result = [
        'status' => 'error',
        'message' => 'Не удалось получить результат.'
    ];

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    $level = $data['level'];
    $levels = ['beginner', 'intermediate', 'advanced'];

    $levelsChecked = in_array($level, $levels);

    if ($level && $levelsChecked) {
        $res = getLeaderBoardTyLevel($level);
        if ($res) {
            $result['status'] = 'done';
            $result['message'] = 'Результат успешно поучен.';
            $result['data'] = $res;
        }
    } else {
        if (!$level) {
            $result['message'] = 'Укажите сложность!';
        } else
        if (!$levelsChecked) {
            $result['message'] = 'Сложность указана неверно!';
        }
    }

    echo json_encode($result);
