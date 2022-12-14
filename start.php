<?php
use Utils\BackendService;
spl_autoload_register(function($class) {
    include str_replace('\\', '/', $class) . '.php';
    });

session_start();

define('CHAT_SERVER_URL', 'https://online-lectures-cs.thi.de/chat');
define('CHAT_SERVER_ID', '/3eea1ccc-9de7-47f4-9969-6fc620a866b9');

$service = new BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
?>