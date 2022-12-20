<?php


use Model\Friend;
use Model\User;

require("start.php");

var_dump($service->login("Tim", "12345678"));
/*echo "<br>";
$fr = new Friend("Test12345");
$fr2 = new Friend("Test1234");
echo "<br>";
echo($fr2->getUsername());
echo "<br>";
$us = new User("Test1234");
$us2 = new User("Test12345");
var_dump($service->loadFriends());

$arr = array();
$arr = $service->listUsers();
foreach($arr as $key => $val ){
    echo "<br>";
    $str = strip_tags($val);
    echo $str;
    
}
*/
$tim = new Friend("Tim");
$tom = new Friend("Tom");
var_dump($service->getUnread());



?>