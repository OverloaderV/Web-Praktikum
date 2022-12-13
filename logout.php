<?php
require('start.php');
session_unset();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Logout</title>
        <link rel="stylesheet" href="stylesheet.css">
    </head>
    <body class="center">
        <img src="images/logout.png" width="80">
            <h2>Logged out...</h2>
            See you!
            <p>
                <a href="login.html">
                Login again
                </a>
            </p>
    </body>
</html>