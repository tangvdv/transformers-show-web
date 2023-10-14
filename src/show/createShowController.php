<?php
$type = ["show"];
?>
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<?php

$name = $_POST["show-name"];
$description = $_POST["show-description"];
$type = $_POST["show-type"];
$release_date = $_POST["show-release-date"];
$image = $_FILES["show-image"];
$newFileName = "";

if(!isset($name) || empty($name)){
    header("location:createShow.php?error=Name field empty");
    die;
}

if(!isset($type) || empty($type)){
    header("location:createShow.php?error=Type field empty");
    die;
}

if(!isset($release_date) || empty($release_date)){
    header("location:createShow.php?error=Release date field empty");
    die;
}

if(isset($image["name"]) && !empty($image["name"])){
    
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."\images\show\\";
    
    $fileExtension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

    $newFileName = date("YmdHis") . "." . $fileExtension;

    $uploadPath = $uploadDir . $newFileName;

    if(!isset($image["tmp_name"])){
        header("location:createShow.php?error=Cannot retrieve the image.");
        die;
    }

    $isImage = getimagesize($image["tmp_name"]);
    if (!$isImage) {
        header("location:createShow.php?error=The uploaded file is not an image.");
        die;
    } else {
        if (!move_uploaded_file($image["tmp_name"], $uploadPath)) {
            header("location:createShow.php?error=There was a problem uploading the file.");
            die;
        }
    }
}
else{
    header("location:createShow.php?error=Image field empty");
    die;
}

$data = array(
    "show_name" => $name,
    "description" => $description,
    "type" => (int)$type,
    "release_date" => $release_date,
    "image" => $newFileName
);

$data = json_encode($data);

echo "<script type='text/javascript'>createShow({$data});</script>";