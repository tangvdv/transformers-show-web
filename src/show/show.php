<?php
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
    <title>Show</title>
</head>
<?php include_once __DIR__."/../includes/header.php"; ?>
<body onload="getShow(<?php echo $id; ?>)">
    <main>
        <button type="button" class="btn btn-success m-2" onclick="redirectUpdateShow(<?php echo $id; ?>)">Update</button>
        <div class="py-3 text-center container">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light" id="show-name"></h1>
                    <img class="poster" id="show-image">
                    <hr>
                </div>
            </div>
            <p id="show-description"></p>
        </div>
        <div class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item d-flex border-end px-4"><p>Release date : </p><p class="mx-1" id="show-release-date"></p></li>
                <li class="nav-item d-flex border-end border-start px-4"><p>Producer : </p><p class="mx-1" id="show-producer"></p></li>
                <li class="nav-item d-flex border-start px-4"><p>Director : </p><p class="mx-1" id="show-director"></p></li>
            </ul>
        </div>
    </main>
</body>
</html>