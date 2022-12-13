<?php
namespace Utils;

use Model\User;
use Model\Friend;

class BackendService{
    private $base;
    private $id;

    public function __construct($b,$id){
        $this->base = $b;
        $this->id = $id;
    }

    public function test(){
        try {
            return HttpClient::get($this->base . '/test.json');
            } catch(\Exception $e) {
            error_log($e);
            }
            return false;
    }

    public function login($user,$pass){
        try {
            $result = HttpClient::post($this->base . "/login", 
                array("username" => "<?php $user ?>", "password" => "<?php $pass ?>"));
            echo "Token: " . $result->token;
            $_SESSION["token"] = $result->token;
            return true;
        } catch(\Exception $e) {
            echo "Authentification failed";
            return false;
        }
    }

    public function register($user,$pass){ //add ver if exists!
        try {
            $result = HttpClient::post($this->base . "/register", array("username" => "<?php $user ?>", "password" => "12345678"));
            echo "Token: " . $result->token;
            $_SESSION["token"] = $result->token;
            return true;
        } catch(\Exception $e) {
            echo "Authentification failed";
            return false;
        }
    }

    public function loadUser($user){
        try {
            $data = HttpClient::get($this->base ."/user/".  "<?php $user ?>",
                $_SESSION["token"]);
                $us = User::fromJson($data);
            return $us;
        } catch(\Exception $e) {
            echo "Not found";
        }
    }

    public function saveUser(User $user){ //maybe not done
        try {
            HttpClient::post(
                $this->base . "/user/<?php {$user->getName()} ?>",
                array("customA" => "abc", "customB" => "xyz"),
                $_SESSION["token"]);
            echo "Saved...";
        } catch(\Exception $e) {
            echo "Not found";
        }
    }

    public function loadFriends(){  //should work?
        try {
            $data = HttpClient::get($this->base."/friend",
                $_SESSION["token"]);
            $frin = array();
            foreach($data as $key=>$val){
                $frin() = Friend::fromJson($val);
            }
            return $frin;
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function friendRequest(Friend $fren){ //maybe done
        try {
            HttpClient::post(
                $this->base . "/friend",
                array("username" => "<?php {$fren->getUsername()} ?>"),
                $_SESSION["token"]);
            echo "Requested...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }


}


?>