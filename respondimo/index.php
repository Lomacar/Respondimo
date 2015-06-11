<?php

extract($_GET, EXTR_PREFIX_ALL, 'rmo');

if(isset($rmo_w) && isset($rmo_h)){ //if width and height are both set (css bg)
    
    
    $size = getimagesize($_SERVER['DOCUMENT_ROOT'].'/'.$rmo_i);
    
    $file_width = $size[0];
    $file_height = $size[1];
    
    if (($file_width/$file_height) < ($rmo_w/$rmo_h)) {
        // Requested image is wider
        unset($_GET['h']);
        
    } else {
        // File is wider or same width
        unset($_GET['w']);
    }
    
    
} else { //only width or height is set (img tag)
    
    
    
    
    
}

//echo urldecode('SLIR/?'.http_build_query($_GET));
header('Location: ' . urldecode('SLIR/?'.http_build_query($_GET)));
