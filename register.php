<?php 
require("start.php");
$checkname = false;
$checkpassword = false;
$passwordconfirm = false;
$checkexistence = false;
$correct = true;

if(isset($_POST["name"])) {
    $name = $_POST["name"];
    $password = $_POST["password"];
    $cpassword = $_POST["cpassword"];

    if($service->userExists($name)) {
        $checkexistence = true;
        $correct = false;
    }
    if (strlen($name) < 3) {
        $checkname = true;
        $correct = false;
    }
    if(strlen($password) < 8) {
        $checkpassword = true;
        $correct = false;
    }
    if($password === $cpassword) {
    } else {$passwordconfirm = true; $correct = false;}

    if($correct) {
        if($service->register($name, $password)) {
            
            header("Location: friends.php");
        }
        
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Registration</title>
    <link rel="stylesheet" href="stylesheet.css">
    <script src="js/initChat.js"></script>
    <script src="js/register.js"></script>
</head>

<body class="center">
    <img src="images/user.png" width="100px">
    <p>
    <h2 id="heading">Register Yourself</h2>
    <?php 
        if($checkname) {
            echo "Name ist zu kurz!";
            echo "</p> </p>";
        }
        if($checkname) {
            echo "Passwort ist zu kurz!";
            echo "</p> </p>";
        }
        if($passwordconfirm) {
            echo "Passwörter stimmen nicht überein!";
            echo "</p> </p>";
        }
        if($checkexistence) {
            echo "Nutzer existiert bereits!";
        }
    ?>
    </p>
    <form action="register.php" id="register1" method="post">
        <!-- onsubmit="submitCheck()" -->
        <fieldset class="login">
            <legend>Register</legend>
            <div class="userinput" >
                <label for="Name" class="userinput">Username</label>
                <input required type="text" name="name" id="Name" placeholder="Username" onkeyup="testLength('Name', 3)">
            </div>
            <div class="userinput">
                <label for="Pass" class="userinput">Password</label>
                <input type="password" name="password" id="Pass" placeholder="Password" onkeyup="testLength('Pass', 8)">
            </div>
            <div class="userinput">
                <label for="cPass" class="userinput">Confirm Password</label>
                <input type="password" name="cpassword" id="cPass" placeholder="Confirm Password" onkeyup="confirm()">
            </div>
        </fieldset>
        <a href="login.php" class="isbutton">
            <button type="button" class="button_grey">Cancel</button>
        </a>
        <input type="submit" value="Create Account" class="button_coloured">
    </form>
</body>

<?php 



?>

</html>