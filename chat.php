<!DOCTYPE html>
<html>

<head>
    <title>Chat with Tom</title>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <script src="js/initChat.js"></script>
    <p>
    <h2>Chat with Tom</h2>
    </p>
    <p>
        <a href="friends.html">&lt; Back</a> |
        <a href="profile.html">Profile</a> |
        <a href="friends.html" class="removefriend">Remove Friend</a>
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