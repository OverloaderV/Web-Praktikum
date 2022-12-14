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
            $result = HttpClient::post($this->base . $this->id . "/login", 
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
            $result = HttpClient::post($this->base .$this->id . "/register", array("username" => "<?php $user ?>", "password" => "<?php $pass ?>"));
            echo "Token: " . $result->token;
            $_SESSION["token"] = $result->token;
            return true;
        } catch(\Exception $e) {
            echo "Authentification failed";
            return false;
        }
    }

    public function loadUser($user){ //todo not working
        try {
            $data = HttpClient::get($this->base . $this->id ."/user/".  "<?php $user ?>",
                $_SESSION["token"]);
                $us = User::fromJson($data);
            return $us;
        } catch(\Exception $e) {
            echo "Not found";
        }
    }

    public function saveUser(User $user){ //todo not working 
        try {
            HttpClient::post(
                $this->base . $this->id . "/user/<?php {$user->getName()} ?>",
                array("customA" => "abc", "customB" => "xyz"),
                $_SESSION["token"]);
            echo "Saved...";
        } catch(\Exception $e) {
            echo "Not found";
        }
    }

    public function loadFriends(){  //should work?
        try {
            $data = HttpClient::get($this->base. $this->id ."/friend",
                $_SESSION["token"]);
            $frin = array();
            foreach($data as $key=>$val){
                $temp = Friend::fromJson($val);
                $frin[] = $temp;
            }
            return $frin;
        } catch(\Exception $e) {
            return false;
        }
    }
    public function friendRequest(Friend $fren){ //todo
        try {
            HttpClient::post(
                $this->base . $this->id ."/friend",
                array("username" => "<?php {$fren->getUsername()} ?>"),
                $_SESSION["token"]);
            echo "Requested...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function friendAccept(Friend $frin){ //todo
        try {
            HttpClient::put($this->base . $this->id . "/friend/<?php {$frin->getUsername()} ?>",
                array("status" => "accepted"),
                $_SESSION["token"]);
            echo "Accepted...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function friendDismiss(Friend $frin){ //todo
        try {
            HttpClient::put($this->base . $this->id . "/friend/<?php {$frin->getUsername()} ?>",
                array("status" => "dismissed"),
                $_SESSION["token"]);
            echo "Accepted...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function friendRemove(Friend $friend){ //todo
        try {
            HttpClient::delete($this->base . $this->id . "/friend/<?php {$friend->getUsername()}>",
                $_SESSION["token"]);
            echo "Removed...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function userExists($username){ //todo not working rn
        try {
            echo $username;
            echo "<br>";
            echo ($this->base . $this->id . "/user/" . $username);
            echo "<br>";
            HttpClient::get($this->base . $this->id . "/user/" . $username);
            return true;
        } catch(\Exception $e) {
            return false;
        }
    }

    public function getMessages( Friend $friend){ //todo
        try {
            $list = HttpClient::get($this->base . $this->id .  "/message/<?php {$friend->getUsername()} ?>",
                $_SESSION["token"]);
            var_dump($list);
        } catch(\Exception $e) {
            echo "Error while loading list";
        }
    }

    public function getUnread(){ //todo
        try {
            $data = HttpClient::get($this->base . $this->id . "/unread",
                $_SESSION["token"]);
            var_dump($data);
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function listUsers(){
        try {
            $list = HttpClient::get($this->base . $this->id . "/user",
                $_SESSION["token"]);
            var_dump($list);
        } catch(\Exception $e) {
            echo "Error while loading list";
        }
    }



}


?>