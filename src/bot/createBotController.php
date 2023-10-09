<?php
$type = "bot";
?>
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<?php

$name = $_POST["bot-name"];
$description = $_POST["bot-description"];
$faction = $_POST["bot-faction"];
$image = $_FILES["bot-image"];
$newFileName = "";

if(!isset($name) || empty($name)){
    header("location:createBot.php?error=Name field empty");
    die;
}

if(!isset($faction) || empty($faction)){
    header("location:createBot.php?error=Faction field empty");
    die;
}

if(isset($image["name"]) && !empty($image["name"])){
    
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."\images\bot\\";
    
    $fileExtension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

    $newFileName = date("YmdHis") . "." . $fileExtension;

    $uploadPath = $uploadDir . $newFileName;

    if(!isset($image["tmp_name"])){
        header("location:createBot.php?error=Cannot retrieve the image.");
        die;
    }

    $isImage = getimagesize($image["tmp_name"]);
    if (!$isImage) {
        header("location:createBot.php?error=The uploaded file is not an image.");
        die;
    } else {
        if (!move_uploaded_file($image["tmp_name"], $uploadPath)) {
            header("location:createBot.php?error=There was a problem uploading the file.");
            die;
        }
    }
}
else{
    header("location:createBot.php?error=Image field empty");
    die;
}

$data = array(
    "bot_name" => $name,
    "description" => $description,
    "faction" => (int)$faction,
    "image" => $newFileName
);

$data = json_encode($data);

echo "<script type='text/javascript'>createBot({$data});</script>";