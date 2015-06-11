<?php

if (file_exists(__DIR__ . '/' . $_SERVER['REQUEST_URI'])) {
    
    
    return false; // serve the requested resource as-is.
    
    
//} elseif ( preg_match('/\/respondimo\/SLIR\//', $_SERVER['REQUEST_URI']) ) {

    
//    include_once $_SERVER['DOCUMENT_ROOT'].'/respondimo/SLIR/index.php';

    /*
//    if ( preg_match('/\?R/', $_SERVER['REQUEST_URI']) ) {
//        
//        if (isset($_COOKIE['javascript'])) {
//            //1px transparent gif
//            header('Content-Type: image/gif');
//            echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');
//        } 
//        
//    } elseif ( preg_match('/r\.gif/', $_SERVER['REQUEST_URI']) ) {
//        
//        header('r.gif');
//        
//    } elseif ( preg_match('/filename=/', $_SERVER['REQUEST_URI']) ) {
//        
//        return false;
//        
//    } else {
        
        //echo "--".$_SERVER['REQUEST_URI'];
//        include_once $_SERVER['DOCUMENT_ROOT'].'/SLIR/index.php';
        
//    }
*/
    
    
} else {
    
    return false;
    
}