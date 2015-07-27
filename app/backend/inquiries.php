<?php

    $list = array (
        $_POST['address'],
        $_POST['location-details'],
        $_POST['residentialType'],
        $_POST['lat'],
        $_POST['lon']
    );
    
    $fp = fopen('../dummies/inq.csv', 'a');
    
    // foreach ($list as $fields) {
    //     fputcsv($fp, $fields);
    // }
    
    fputcsv($fp, $list);
    
    fclose($fp);

?>