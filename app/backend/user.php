<?php
    
    $users = array(
        ['u' => 'alfin', 'p' => '123456'],
        ['u' => 'admin', 'p' => 'pass']
    );
    
    $response;
    
    foreach($users as $user){
        if($_POST['username'] == $user['u'] && $_POST['password'] == $user['p']){
            $response = ['login' => true];
            break;
        } else {
            $response = ['login' => false];
        }
    }
    
    echo json_encode($response);
    
?>