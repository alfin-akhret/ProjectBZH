<?php
 
    
    $users = array(
        ['u' => 'alfin', 'p' => '123', 'id'=>1, 'role'=>'admin', 'sessionId' => ''],
        ['u' => 'admin', 'p' => 'pass', 'id'=>2, 'role'=>'admin', 'sessionId' => '']
    );
    
    $response;
    
    foreach($users as $user){
        if($_POST['username'] == $user['u'] && $_POST['password'] == $user['p']){
            $user['sessionId'] = 'sess01';
            $response = array(
                'login' => true,
                'user' => $user
            );
            break;
        } else {
            $response = ['login' => false];
        }
    }
    
    echo json_encode($response);
    
?>