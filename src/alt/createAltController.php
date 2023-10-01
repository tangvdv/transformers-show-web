<?php
$type = "alt";
?>
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<?php

$name = $_POST["alt-name"];
$brand = $_POST["alt-brand"];
$image = $_FILES["alt-image"];
$newFileName = "";

if(!isset($name) || empty($name)){
    header("location:createAlt.php?error=Name field empty");
    die;
}

if(!isset($brand) || empty($brand)){
    header("location:createAlt.php?error=Brand field empty");
    die;
}

if(isset($image["name"]) && !empty($image["name"])){
    
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."\images\alt\\";
    
    $fileExtension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

    $newFileName = date("YmdHis") . "." . $fileExtension;

    $uploadPath = $uploadDir . $newFileName;

    $isImage = getimagesize($image["tmp_name"]);
    if (!$isImage) {
        echo "Error: The uploaded file is not an image.";
    } else {
        if (!move_uploaded_file($image["tmp_name"], $uploadPath)) {
            echo "Error: There was a problem uploading the file.";
        }
    }
}
else{
    header("location:createAlt.php?error=Image field empty");
    die;
}

$data = array(
    "alt_name" => $name,
    "brand" => $brand,
    "image" => $newFileName
);

$data = json_encode($data);

echo "<script type='text/javascript'>createAlt({$data});</script>";