<?php
require("start.php");
if(isset($_SESSION["user"])){
    header("Location: friends.php");
}
$res = null;
if(isset($_POST["username"])&&isset($_POST["password"])){
    $name = $_POST["username"];
    $pass = $_POST["password"];
    $res = $service->login($name, $pass);
    if($res){
        $_SESSION["user"] = $name;
        header("Location: friends.php");
        exit(1);
    }
}


?>
<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
        <link rel="stylesheet" href="stylesheet.css">
    </head>
    <body class="center">
        <img src="images/chat.png" width="80">
        <?php 
        if ($res == false && !is_null($res)) {
            echo "<h3> Login failed </h3>";
        } ?>
            <h2>Please sign in</h2>
        <form action="login.php" method="post">
            <fieldset class="login">
                <legend>Login</legend>
                <div class="userinput">
                    <label for="username" class="userinput">Username: </label>
                    <input id="username" type="text" name="username" placeholder="Username">
                </div>
                <div class="userinput">
                    <label for="password" class="userinput">Password: </label>
                    <input id="password" type="password" name="password" placeholder="Password">
                </div>
            </fieldset>
        
                <a href="register.php" class="isbutton">
                    <button type="button" class="button_grey">Register</button>
                </a>
                <button type="submit" class="button_coloured" >Login</button>
        </form>

    </body>
</html>