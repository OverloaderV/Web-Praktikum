<?php
use Model\User;
require("start.php");

if(!isset($_SESSION["user"])) {
    header("Location: login.php");
}

$user = $service->loadUser($_GET["username"]);

if ($user->fname == null) {
    $user->fname = "";
}
if ($user->lname == null) {
    $user->lname = "";
}
if ($user->drink == null) {
    $user->drink = "neither";
}
if ($user->aboutme == null) {
    $user->aboutme = "";
}
if ($user->layout == null) {
    $user->layout = "oneline";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Profile</title>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <h2>Profile of <?php echo $user->getName() ?></h2>

    <div>
        <a href="chat.php?username ="<?= $user->getName()?>>&lt Back to Chat</a> |
        <a href=<?php 
            echo "friends.php?remove=";
            echo $user->getName();
        ?> class="removefriend">Remove Friend</a>
    </div>

    <br>

    <div>
        <img id="pfpic" src="images/profile.png" width="500">
        <fieldset class="container">
        <label id="aboutme">
            <?php echo $user->aboutme ?>
        

            <dl>
                <dt>Coffee or Tea?</dt>
                <dd id="drink"><?php 
                    if ($user->drink == "coffee") {
                        echo "Coffee";
                    } else if ($user->drink == "tea") {
                        echo "Tea";
                    } else  {
                        echo "Neither";
                    }
                ?></dd>
                <dt>Name</dt>
                <dd id="name"><?php 
                    echo $user->fname;
                    echo " ";
                    echo $user->lname;
                ?></dd>

            </dl>
        </label>
        </div>
    </fieldset>
</body>