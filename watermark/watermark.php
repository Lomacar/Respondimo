<?php

//$ch = curl_init();
//curl_setopt($ch, CURLOPT_URL, 'http://localhost:7777/img/rainbow.jpg'); 
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // good edit, thanks!
//curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1); // also, this seems wise considering output is image.
//$data = curl_exec($ch);
//curl_close($ch);
//$image = imagecreatefromstring($data);


////Let's say you sent the filename via the url, i.e. watermark.php?filename=myimage.jpg
//$filename=$_REQUEST['filename'];
//
////$imgpath is where your images in this gallery reside
//$imgpath='http://localhost:7777/';//$_SERVER['DOCUMENT_ROOT'];
//
////Put them all together to get the full path to the image:
//$imgpath = $imgpath.$filename;

//OK cool, let's start the process of outputting the image with a watermark...
header('content-type: image/jpeg'); //HTTP header - assumes your images in the gallery are JPGs

//$watermarkfile is the filepath for your watermark image as a PNG-24 Transparent (ex: your logo)
$watermarkfile="../img/64bit.png";
//Get the attributes of the watermark file so you can manipulate it
$watermark = imagecreatefrompng($watermarkfile);

//Get the width and height of your watermark - we will use this to calculate where to put it on the image
list($watermark_width,$watermark_height) = getimagesize($watermarkfile);

//Now get the main gallery image (at $imgpath) so we can maniuplate it
$image = imagecreatefromjpeg('http://localhost:7777/img/rainbow.jpg');


//$image = imagecreatefromjpeg('http://localhost:7777/img/rainbow.jpg');
//$image = imagecreatefromjpeg($imgpath);
//echo $imgpath; die;
//imagepng($image); imagedestroy($image); die;

//Get the width and height of your image - we will use this to calculate where the watermark goes
$size = getimagesize('http://md9.ca/portfolio/pictures/MightyMountain.jpg');

//Calculate where the watermark is positioned
//In this example, it is positioned in the lower right corner, 15px away from the bottom & right edges
$dest_x = $size[0] - $watermark_width - 15;
$dest_y = $size[1] - $watermark_height - 15;

//apply the watermark
imagecopy($image, $watermark, $dest_x, $dest_y, 0, 0, $watermark_width, $watermark_height);

//output the image:
imagejpeg($image);

//Destroy the image and the watermark handles
imagedestroy($image);
imagedestroy($watermark);