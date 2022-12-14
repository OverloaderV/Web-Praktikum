<?php
use Utils\BackendService;
spl_autoload_register(function($class) {
    include str_replace('\\', '/', $class) . '.php';
    });

session_start();

define('CHAT_SERVER_URL', 'https://online-lectures-cs.thi.de/chat');
define('CHAT_SERVER_ID', '/f079eabb-735a-462e-ae6e-760c9ad0fb36');

$service = new BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
?>