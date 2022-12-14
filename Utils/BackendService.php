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
                array("username" => "$user", "password" => "$pass"));
            //echo "Token: " . $result->token;
            $_SESSION["token"] = $result->token;
            return true;
        } catch(\Exception $e) {
            return false;
        }
    }

    public function register($user,$pass){ //add ver if exists!
        try {
            $result = HttpClient::post($this->base .$this->id . "/register", array("username" => "$user", "password" => "$pass"));
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
            $data = HttpClient::get($this->base . $this->id ."/user/".  "$user",
                $_SESSION["token"]);
                $us = User::fromJson($data);
            return $us;
        } catch(\Exception $e) {
            echo "Not found";
        }
    }

    public function saveUser(User $user){ //untested
        try {
            HttpClient::post(
                $this->base . $this->id . "/user/{$user->getName()}",
                array("customA" => "abc", "customB" => "xyz"),
                $_SESSION["token"]);
            echo "Saved...";
        } catch(\Exception $e) {
            echo "Not found";
        }
    }

    public function loadFriends(){ 
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
    public function friendRequest(Friend $fren){ 
        try {
            HttpClient::post(
                $this->base . $this->id ."/friend",
                array("username" => "{$fren->getUsername()}"),
                $_SESSION["token"]);
            echo "Requested...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function friendAccept(Friend $frin){ 
        try {
            HttpClient::put($this->base . $this->id . "/friend/{$frin->getUsername()}",
                array("status" => "accepted"),
                $_SESSION["token"]);
            echo "Accepted...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function friendDismiss(Friend $frin){ //todo
        try {
            HttpClient::put($this->base . $this->id . "/friend/{$frin->getUsername()}",
                array("status" => "dismissed"),
                $_SESSION["token"]);
            echo "Accepted...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function friendRemove(Friend $friend){
        try {
            HttpClient::delete($this->base . $this->id . "/friend/{$friend->getUsername()}",
                $_SESSION["token"]);
            echo "Removed...";
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function userExists(string $username){ 
        try {
            HttpClient::get($this->base . $this->id . '/user/' . $username);
            return true;
        } catch(\Exception $e) {
            return false;
        }
    }

    public function getMessages( Friend $friend){ 
        try {
            $list = HttpClient::get($this->base . $this->id .  "/message/{$friend->getUsername()}",
                $_SESSION["token"]);
            var_dump($list);
        } catch(\Exception $e) {
            echo "Error while loading list";
        }
    }

    public function getUnread(){ 
        try {
            $data = HttpClient::get($this->base . $this->id . "/unread",
                $_SESSION["token"]);
            return($data);
        } catch(\Exception $e) {
            echo "Error...";
        }
    }

    public function listUsers(){ //todo
        try {
            $list = HttpClient::get($this->base . $this->id . "/user",
                $_SESSION["token"]);
            return($list);
        } catch(\Exception $e) {
            echo "Error while loading list";
            return false;
        }
    }



}


?>