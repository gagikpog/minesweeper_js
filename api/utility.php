<?php
    require_once('./pass.php');

    function addData($name, $time, $level) {
        $authData = getMySQLAuthData();
        $serverName = $authData['serverName'];
        $username = $authData['username'];
        $password = $authData['password'];
        $dbname = $authData['dbname'];

        try {
            $conn = new PDO("mysql:host=$serverName;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "INSERT INTO `record` (`name`, `time`, `level`) VALUES (:name, :time, :level)";
            $stmt = $conn->prepare($sql);
            return $stmt->execute(array(':name' => $name, ':time' => $time, ':level' => $level));
        } catch(PDOException $e) {
            // http_response_code(500);
        }
        return false;
    }



