<?php
$type = ["voiceactor"];
?>
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<?php

$name = $_POST["voiceactor-name"];
$dubb = $_POST["voiceactor-dubb"];
$origin = $_POST["voiceactor-origin"];
$image = $_FILES["voiceactor-image"];
$id = $_GET["id"];
$oldFileName = $_GET["image"];
$newFileName = "";

if(isset($image["name"]) && !empty($image["name"])){
    
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."\images\\voiceactor\\";
    
    $fileExtension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

    $newFileName = date("YmdHis") . "." . $fileExtension;

    $uploadPath = $uploadDir . $newFileName;

    if(!isset($image["tmp_name"])){
        header("location:updateVoiceActor.php?id=".$id."&error=Cannot retrieve the image.");
        die;
    }

    $isImage = getimagesize($image["tmp_name"]);
    if (!$isImage) {
        header("location:updateVoiceActor.php?id=".$id."&error=The uploaded file is not an image.");
        die;
    } else {
        if (!move_uploaded_file($image["tmp_name"], $uploadPath)) {
            header("location:updateVoiceActor.php?id=".$id."&error=There was a problem uploading the file.");
            die;
        }
    }
}

$data = array(
    "voiceactor_name" => $name,
    "dubbing_localization" => (int)$dubb,
    "origin" => (int)$origin,
    "image" => $newFileName
);

$data = json_encode($data);
echo "<script type='text/javascript'>updateVoiceActor({$id},{$data});</script>";