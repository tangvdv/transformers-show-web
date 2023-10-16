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
$newFileName = "";

if(!isset($name) || empty($name)){
    header("location:createVoiceActor.php?error=Name field empty");
    die;
}

if(!isset($character) || empty($character)){
    header("location:createVoiceActor.php?error=Character field empty");
    die;
}

if(!isset($origin) || empty($origin)){
    header("location:createVoiceActor.php?error=Origin field empty");
    die;
}

if(isset($image["name"]) && !empty($image["name"])){
    
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."\images\voiceactor\\";
    
    $fileExtension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

    $newFileName = date("YmdHis") . "." . $fileExtension;

    $uploadPath = $uploadDir . $newFileName;

    if(!isset($image["tmp_name"])){
        header("location:createVoiceActor.php?error=Cannot retrieve the image.");
        die;
    }

    $isImage = getimagesize($image["tmp_name"]);
    if (!$isImage) {
        header("location:createVoiceActor.php?error=The uploaded file is not an image.");
        die;
    } else {
        if (!move_uploaded_file($image["tmp_name"], $uploadPath)) {
            header("location:createVoiceActor.php?error=There was a problem uploading the file.");
            die;
        }
    }
}
else{
    header("location:createVoiceActor.php?error=Image field empty");
    die;
}

$data = array(
    "voiceactor_name" => $name,
    "dubbing_localization" => (int)$dubb,
    "origin" => (int)$origin,
    "image" => $newFileName
);

$data = json_encode($data);

echo "<script type='text/javascript'>createVoiceActor({$data});</script>";