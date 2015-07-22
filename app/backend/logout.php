<?php
session_start();

$_SESSION['role'] = null;
$_SESSION['user'] = null;

session_destroy();
header("location: ../../index.php");

?>