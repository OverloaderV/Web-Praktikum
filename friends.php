<!DOCTYPE html>
<html>
    <head>
        <title>Friends</title>
        <link rel="stylesheet" href="stylesheet.css">
    </head>
    <body>
        <script src="js/initChat.js"></script>
        <script src="js/friends.js"></script>
        <h2>Friends</h2>
        <a href="logout.html">
            &ltLogout
        </a> | 
        <a href="settings.html">
            Settings
        </a>
            <hr>
            <fieldset class="chatbox">
                <ul>
                    <li>
                        <a name="tom" href="chat.html">
                            Tom
                        </a>
                        <span class="urmsg">3</span>
                    </li>
                    <li>
                        <a href="chat.html">
                            Marvin
                        </a>
                        <span class="urmsg">1</span>
                    </li>
                    <li>
                        <a href="chat.html">
                            Tick
                        </a>
                    </li>
                    <li>
                        <a href="chat.html">
                            Trick
                        </a>
                    </li>

                </ul>
            </fieldset>
                <hr>

                <h2>New Requests</h2>
                <ol>
                    <li>
                        <a href="friends.html">
                            Friend requests from <span>Track</span>
                        </a>
                    </li>
                </ol>
                <hr>
                <form onsubmit="return checkname()">
                <input id="username" type="text" name="username" placeholder="Add Friend to List" class="wide" onkeyup="keyupp(this)" autocomplete="off" list="names">
                <datalist id="names"></datalist>
                <input type="submit" class="widebutton button_coloured" value="Add">
                </form>
    </body>
</html>