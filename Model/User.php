<?php
namespace Model;
use JsonSerializable;

class User implements JsonSerializable{
    private $username;
    public $fname;
    public $lname;
    public $drink;
    public $aboutme;
    public $layout;

    public function __construct($usna = null){
        $this->username = $usna;

    }

    public function jsonSerialize(){
        return get_object_vars($this);
    }

    public function getName(){
        return $this->username;
    }

    public static  function fromJson($data):User{
        $user = new User;
        foreach ($data as $key => $value) {
            $user->{$key} = $value;
        }
        return $user;
    }
}
?>