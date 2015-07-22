<?php session_start(); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Engineer View</title>
</head>
<body>
    <h1>Engineer</h1>
    <?php
        if($_SESSION['role'] != "engineer"){
            header("Location: ../../index.php");
        }
    ?>
</body>
</html>