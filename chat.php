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
if(isset($_GET["username"])) {
}
else {
    header("Location: friends.php");
}

?>

<!DOCTYPE html>
<html>

<head>
    <?php echo "<title>Chat with $username</title>" ?>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <p>
    <?php echo "<h2>Chat with $username</h2>" ?>
    </p>
    <p>
        <a href="friends.php">&lt; Back</a> |
        <a href="profile.php?username=<?=$username?>">Profile </a> |
        <a href="friends.php?remove=$<?=$username?>" class="removefriend">Remove Friend</a>
    </p>
    <hr>
    <fieldset class="chatbox" id="chatbox">
    </fieldset>
    <hr>
    <form id="send">
        <input type="text" placeholder="New Message" name="msg" id="msg" autocomplete="off" class="wide" required>
        <input type="submit" value="Send" class="widebutton button_coloured">
    </form>

    <script>
        window.chatToken = "<?= $_SESSION['token'] ?>";
        window.chatCollectionID = "<?= CHAT_SERVER_ID ?>";
        window.chatServer = "<?= CHAT_SERVER_URL ?>";
    </script>
        <script src="js/chat.js"></script>
</body>

</html>