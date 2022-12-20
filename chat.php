<?php 
require("start.php");

if(isset($_SESSION["user"])) {
} else {
    header("Location: login.php");
}

$username = "";
if(isset($_GET["username"])) {
$username = $_GET["username"];
}
echo "GET[username] = " . $username;
echo "<p> </p>";
echo "SESSION[user] = " . $_SESSION["user"];
if($username === $_SESSION["user"]) {
    echo "username in qeury";
} else {
    //header("Location: friends.php");
}

?>

<!DOCTYPE html>
<html>

<head>
    <?php echo "<title>Chat with $username</title>" ?>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <script src="js/initChat.js"></script>
    <p>
    <?php echo "<h2>Chat with $username</h2>" ?>
    </p>
    <p>
        <a href="friends.php">&lt; Back</a> |
        <a href="profile.php?username=<?=$username?>">Profile </a> |
        <a href="friends.php" class="removefriend">Remove Friend</a>
    </p>
    <hr>
    <fieldset class="chatbox" id="chatbox">
    </fieldset>
    <hr>
    <form id="send">
        <input type="text" placeholder="New Message" name="msg" id="msg" autocomplete="off" class="wide" required>
        <input type="submit" value="Send" class="widebutton button_coloured">
    </form>
    <script src="js/chat.js"></script>
</body>

</html>