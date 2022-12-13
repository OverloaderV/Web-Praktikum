<?php
namespace Model;
use JsonSerializable;
class Friend implements JsonSerializable{
    private $username;
    private $status;

    public function __construct($name = null){
        $this->username = $name;
    }

    public function jsonSerialize(){
        return get_object_vars($this);
    }

    public static function fromJson($data):Friend{
        $friend = new Friend;
        foreach ($data as $key => $value) {
            $friend->{$key} = $value;
        }
        return $friend;
    }

    public function getStatus(){
        return $this->status;
    }

    public function getUsername(){
        return $this->username;
    }

    public function accept(){
        $this->status = 'accepted';
    }

    public function dismiss(){
        $this->status = 'dismissed';
    }
}
?>