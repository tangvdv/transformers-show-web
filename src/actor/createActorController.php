<?php
$type = ["actor"];
?>
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<?php

$name = $_POST["actor-name"];
$character = $_POST["actor-character"];
$origin = $_POST["actor-origin"];
$image = $_FILES["actor-image"];
$newFileName = "";

if(!isset($name) || empty($name)){
    header("location:createActor.php?error=Name field empty");
    die;
}

if(!isset($character) || empty($character)){
    header("location:createActor.php?error=Character field empty");
    die;
}

if(!isset($origin) || empty($origin)){
    header("location:createActor.php?error=Origin field empty");
    die;
}

if(isset($image["name"]) && !empty($image["name"])){
    
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."\images\actor\\";
    
    $fileExtension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

    $newFileName = date("YmdHis") . "." . $fileExtension;

    $uploadPath = $uploadDir . $newFileName;

    if(!isset($image["tmp_name"])){
        header("location:createActor.php?error=Cannot retrieve the image.");
        die;
    }

    $isImage = getimagesize($image["tmp_name"]);
    if (!$isImage) {
        header("location:createActor.php?error=The uploaded file is not an image.");
        die;
    } else {
        if (!move_uploaded_file($image["tmp_name"], $uploadPath)) {
            header("location:createActor.php?error=There was a problem uploading the file.");
            die;
        }
    }
}
else{
    header("location:createActor.php?error=Image field empty");
    die;
}

$data = array(
    "actor_name" => $name,
    "character" => $character,
    "origin" => (int)$origin,
    "image" => $newFileName
);

$data = json_encode($data);

echo "<script type='text/javascript'>createActor({$data});</script>";