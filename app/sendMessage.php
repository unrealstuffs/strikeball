<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Получаем данные из POST запроса
$postData = file_get_contents('php://input');
$request = json_decode($postData, true);

// Проверяем, что данные успешно декодированы
if ($request === null) {
    http_response_code(400);
    echo json_encode(array('error' => 'Invalid JSON'));
    exit();
}

// Извлекаем имя и телефон из запроса
$name = isset($request['name']) ? $request['name'] : 'No name';
$phone = isset($request['phone']) ? $request['phone'] : 'No phone';

// Формируем сообщение
$message = "Новая заявка с сайта:\nИмя: $name\nТелефон: $phone";

//The idInstance and apiTokenInstance values are available in your account, double brackets must be removed
$url = 'https://1103.api.green-api.com/waInstance1103952143/sendMessage/0f9db4f688d24f50a9b6d364d9095a8478dda81c361b4c6992';

//chatId is the number to send the message to (@c.us for private chats, @g.us for group chats)
$data = array(
    'chatId' => '77056316953@c.us', 
    'message' => $message
);

$options = array(
    'http' => array(
        'header' => "Content-Type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data)
    )
);

$context = stream_context_create($options);

$response = file_get_contents($url, false, $context);

if ($response === false) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to send message'));
    exit();
}

$responseData = json_decode($response, true);
if ($responseData === null || isset($responseData['error'])) {
    http_response_code(500);
    echo json_encode(array('error' => 'Failed to send message', 'details' => $responseData));
    exit();
}

echo $response;
?>