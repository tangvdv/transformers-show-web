<?php
$type = "alt";
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
    <title>Alt</title>
</head>
<?php include_once __DIR__."/../includes/header.php"; ?>
<body onload="displayAlt(<?php echo $id; ?>)">
    <main>
        <button type="button" class="btn btn-success m-2" onclick="window.location.href=`/src/alt/updateAlt.php?id=${<?php echo $id?>}`;">Update</button>
        <div class="py-3 text-center container">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light" id="alt-name"></h1>
                    <img class="alt-poster" id="alt-image">
                    <hr>
                </div>
            </div>
            <p id="alt-description"></p>
        </div>
        <div class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item d-flex px-4"><p>Brand : </p><p class="mx-1" id="alt-brand"></p></li>
            </ul>
        </div>
    </main>
</body>
</html>