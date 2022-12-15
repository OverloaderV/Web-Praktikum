<?php
use Model\Friend;
require("start.php");

if(!isset($_SESSION["user"])){
    header("Location: login.php");
}

if(isset($_POST["username"])){
    $newfr = new Friend($_POST["username"]);
    $service->friendRequest($newfr);
}
if(isset($_POST["name"]) && isset($_POST["decide"])){
    $newfr = new Friend($_POST['name']);
    if($_POST["decide"]==true){
        $service->friendAccept($newfr);
    }else{
        $service->friendDismiss($newfr);
    }
}
if(isset($_POST["remove"])){
    $newfr = new Friend($_POST['remove']);
    $service->friendRemove($newfr);
}


$friends = $service->loadFriends();
$unread = $service->getUnread();

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Friends</title>
        <link rel="stylesheet" href="stylesheet.css">
    </head>
    <body>
        
        <h2>Friends of <?php echo $_SESSION["user"]; ?></h2>
        <a href="logout.php">
            &ltLogout
        </a> | 
        <a href="settings.php">
            Settings
        </a>
            <hr>
            <fieldset class="chatbox">
                <ul id="ul">
                    <?php
                        if(sizeof($friends)==0){
                        echo "You have no friends, that's sad! Start sending out friend requests.";
                        }
                        else{
                        foreach($friends as $val){
                            if($val->getStatus() == "accepted"){
                            $fr = $val->getUsername();
                            echo "<li>";
                            echo "<a href='chat.php?username=$fr'>";
                            echo $fr;
                            echo "</a>";
                            foreach($unread as $key=>$un){
                                if($key == $fr){
                                    echo "<span class='urmsg'> $un </span>";
                                }
                            }
                            echo "</li>";
                            }
                        }
                        }
                    ?>
                </ul>
            </fieldset>
                <hr>

                <h2>New Requests</h2>
                <ol id="requests">
                    <?php
                    foreach ($friends as $val) {
                        if ($val->getStatus() == "requested") {
                            $frr = $val->getUsername();
                            echo "<li>";
                            echo $frr;
                            echo "<form action='friends.php' method='post'>";
                            echo "<input type='hidden' name='name' value='$frr'>";
                            echo "<input type='hidden' name='decide' value='true'>";
                            echo "<button type='submit' class='button_grey'>";
                            echo "Accept";
                            echo "</button>";
                            echo "</form>";
                            echo "<form action='friends.php' method='post'>";
                            echo "<input type='hidden' name='name' value='$frr'>";
                            echo "<input type='hidden' name='decide' value='false'>";
                            echo "<button type='submit' class='button_grey'>";
                            echo "Dismiss";
                            echo "</button>";
                            echo "</form>";
                            echo "</li>";
                        }
                    }
                    ?>
                </ol>
                <hr>
                <form action="friends.php" method="post">
                <input id="username" type="text" name="username" placeholder="Add Friend to List" class="wide" onkeyup="keyupp(this)" autocomplete="off" list="names">
                <datalist id="names"></datalist>
                <input type="submit" class="widebutton button_coloured" value="Add">
                </form>

        <script>
            window.chatToken = "<?= $_SESSION['token'] ?>";
            window.chatCollectionID = "<?= CHAT_SERVER_ID ?>";
            window.chatServer = "<?= CHAT_SERVER_URL ?>";
        </script>
        <script src="js/friends.js"></script>
    </body>
</html>