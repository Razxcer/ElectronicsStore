<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");


    $host = 'MySQL-8.4';
    $db   = 'ElectronicsStore';
    $user = 'root';
    $pass = '';
    $charset = 'utf8mb4';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    } catch (Exception $e) {
        die(json_encode(["error" => "Ошибка подключения к БД"]));
    }

    // Получаем JSON из тела запроса (как req.body в Express)
    $input = json_decode(file_get_contents("php://input"), true);
    $requestUri = $_SERVER['REQUEST_URI'];



// Эндпоинт товаров (через MySQL вместо Access)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], 'products') !== false) {
    // На Beget данные БД берутся из панели управления

    try {
        $stmt = $pdo->query('SELECT ProductID, Name, Description, Price, ImagePath FROM Products');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Ошибка БД: " . $e->getMessage()]);
    }
}



// --- ЭНДПОИНТ РЕГИСТРАЦИИ ---
if (strpos($requestUri, '/reg') !== false && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $input['login'] ?? '';
    $password = $input['password'] ?? '';

    if (strlen($login) < 3 || strlen($password) < 4) {
        http_response_code(400);
        echo json_encode(["error" => "Слишком короткий логин или пароль"]);
        exit;
    }

    // Проверяем, нет ли такого юзера
    $stmt = $pdo->prepare("SELECT id FROM users WHERE login = ?");
    $stmt->execute([$login]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(["error" => "Пользователь уже существует"]);
        exit;
    }

    // Сохраняем (в идеале пароль надо хешировать password_hash, но для простоты оставим как в твоем коде)
    $stmt = $pdo->prepare("INSERT INTO users (login, password) VALUES (?, ?)");
    if ($stmt->execute([$login, $password])) {
        echo json_encode(["success" => true, "message" => "Регистрация успешна"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Ошибка при записи в БД"]);
    }
}

// --- ЭНДПОИНТ АВТОРИЗАЦИИ ---
if (strpos($requestUri, '/login') !== false && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $input['login'] ?? '';
    $password = $input['password'] ?? '';

    $stmt = $pdo->prepare("SELECT id, login FROM users WHERE login = ? AND password = ?");
    $stmt->execute([$login, $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode([
            "success" => true,
            "user" => ["id" => $user['id'], "login" => $user['login']],
            "message" => "Вход выполнен"
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Неверный логин или пароль"]);
    }
}
















?>