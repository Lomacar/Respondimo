<?php
extract($_GET, EXTR_PREFIX_ALL, 'rmo');

if(isset($rmo_w) && isset($rmo_h)){ //if width and height are both set (css bg)
    
    
    $size = getimagesize($_SERVER['DOCUMENT_ROOT'].'/'.$rmo_i);
    
    $file_width = $size[0];
    $file_height = $size[1];
    
    // $mode toggles which dimension/axis is dominant
    // (cover and contain work in opposite ways)
    // also, if bg size is just 'auto' then redirect to original image
    $mode = 0;
    
    if ($rmo_size == 'contain') {
        $mode = 1;
    } else if ($rmo_size == 'auto' or $rmo_size == 'auto auto') {
        header("Location: ".$rmo_i);
        die;
    } else {
        //assume 'cover for now'
    }
        
    
    if ((($file_width/$file_height) < ($rmo_w/$rmo_h)) xor $mode) {
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
