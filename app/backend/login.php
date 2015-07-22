<?php
session_start();
    $users = array(
        ['u' => 'alfin', 'p' => '123', 'id'=>1, 'r'=>'engineer', 'sessionId' => ''],
        ['u' => 'admin', 'p' => 'pass', 'id'=>2, 'r'=>'admin', 'sessionId' => '']
    );

    
    // dummy login check
    foreach($users as $user){
        if($_POST['username'] == $user['u'] && $_POST['password'] == $user['p']){
            // set session variable
            $_SESSION['user'] = $user['u'];
            $_SESSION['role'] = $user['r'];
            header("Location: ../../engineer_view.php");
            break;
            
        } else {
            header("Location: ../../index.php");
        }
    }

?>