<?php
$id = $_GET['id'];
if(!isset($id) || empty($id)){
    header("Location:index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shows</title>
</head>
<body onload="getShow(<?php echo $id; ?>)">
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
        <div class="container py-4">
            <div>
                <div class="row g-3">
                    <div class="col-sm-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="show-name">
                    </div>

                    <div class="col-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" rows="5" id="show-description"></textarea>
                    </div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Type</label>
                    <select class="form-select" id="type" required>
                        <option>Choose...</option>
                        <option value="1">Movie</option>
                    </select>
                    </div>

                    <div class="col-12">
                        <label for="release-date" class="form-label">Release date</label>
                        <input class="form-control w-25" type="date" id="show-release-date" value="2018-07-22" min="2000-01-01" max="<?php $timestamp = time(); echo gmdate('Y-m-d', $timestamp) ?>" />
                    </div> 

                    <label for="image" class="form-label">Image</label>
                    <div class="d-flex justify-content-between border rounded-2 mx-2">
                        <div class="align-self-center">
                            <input class="form-control" type="file" id="image">
                        </div>
                        <div>
                            <img src="" id="show-image" class="poster">
                        </div>
                    </div>

                    <hr class="my-4">
                    <div class="text-center">
                        <button class="btn btn-success btn-lg" onclick="updateShow(<?php echo $id; ?>)">Update</button>
                    </div>
                </div>
            </div>
    </main>
</body>
</html>