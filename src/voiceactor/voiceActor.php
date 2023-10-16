<?php
$type = ["voiceactor"];
$id = $_GET['id'];
if(!isset($id) || empty($id)){
    header("Location:index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once __DIR__ . "/../includes/head.php"; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voice Actor</title>
</head>
<?php include_once __DIR__."/../includes/header.php"; ?>
<body onload="displayVoiceActor(<?php echo $id; ?>)">
    <main>
        <button type="button" class="btn btn-success m-2" onclick="window.location.href=`/src/voiceactor/updateVoiceActor.php?id=${<?php echo $id?>}`;">Update</button>
        <div class="py-3 text-center container">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light" id="voiceactor-name"></h1>
                    <img class="voice-actor-poster-regular" id="voiceactor-image">
                    <hr>
                </div>
            </div>
        </div>
    </main>
</body>
</html>