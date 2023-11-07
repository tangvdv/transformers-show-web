<?php
$type = ["alt"];
?>
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<?php

$name = $_POST["alt-name"];
$brand = $_POST["alt-brand"];
$year = $_POST["alt-year"];
$image = $_FILES["alt-image"];
$id = $_GET["id"];
$oldFileName = $_GET["image"];
$newFileName = "";

if(isset($image["name"]) && !empty($image["name"])){
    
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."\images\alt\\";
   
    $fileExtension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

    $newFileName = date("YmdHis") . "." . $fileExtension;

    $uploadPath = $uploadDir . $newFileName;

    if(!isset($image["tmp_name"])){
        header("location:updateAlt.php?error=Cannot retrieve the image.");
        die;
    }

    $isImage = getimagesize($image["tmp_name"]);
    if (!$isImage) {
        header("location:updateAlt.php?error=The uploaded file is not an image.");
        die;
    } else {
        if (!move_uploaded_file($image["tmp_name"], $uploadPath)) {
            header("location:updateAlt.php?error=There was a problem uploading the file.");
            die;
        }
    }
}

$data = array(
    "alt_name" => $name,
    "brand" => $brand,
    "model_year" => $year,
    "image" => $newFileName
);

$data = json_encode($data);

echo "<script type='text/javascript'>updateAlt({$id},{$data});</script>";