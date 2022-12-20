<?php
use Model\User;
require("start.php");

if(!isset($_SESSION["user"])) {
    header("Location: login.php");
}

$user = $service->loadUser($_SESSION["user"]);
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
if ($user->userinput == null) {
    $user->userinput = "oneline";
}

var_dump($user);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile Settings</title>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <h2>Profile Settings</h2>
    <form action="settings.html">
        <fieldset>
            <legend>Base Data</legend>
            <div class="userinput">
                <label for="fname" class="userprofile">First Name </label>
                <input type="text" name="fname" id="fname" placeholder="Your name" value=<?php echo $user->fname ?>>
            </div>
            <div class="userinput">
                <label for="lname" class="userprofile">Last Name </label>
                <input type="text" name="lname" id="lname" placeholder="Your surname"value=<?php echo $user->lname ?>>
            </div>
            <div class="userinput">
            <label for="drink" class="userprofile">Coffee or Tea?</label>
            <select name="drink" id="drink" class="select"value=<?php echo $user->drink ?>>
                <option value="neither">Neither nor</option>
                <option value="coffee">Coffee</option>
                <option value="tea">Tea</option>
            </select>
            </div>
        </fieldset><br>

        <fieldset>
            <legend>Tell something about you</legend>
            <textarea name="aboutme" placeholder="Leave a comment here" class="userprofile"><?php echo $user->aboutme ?></textarea>
        </fieldset><br>

        <fieldset>
            <legend>Preferred Chat Layout</legend>
            <div class="userinput">
                <input type="radio" name="layout" id="oneline" value="oneline" <?php echo ($user->userinput == 'oneline')?'checked':''?>><label for="oneline">Username and Message in
                    one line</label>
            </div>
            <div class="userinput">
                <input type="radio" name="layout" id="sepline" value="sepline"<?php echo ($user->userinput == 'sepline')?'checked':''?>><label for="sepline">Username and Message in
                    seperate lines</label>
            </div>
        </fieldset>
        <div class="center">
        <a href="friends.html" class="isbutton">
            <button type="button" class="button_grey">Cancel</button>
        </a>
        <input type="submit" value="Submit" class="button_coloured">
        </div>
    </form>
</body>