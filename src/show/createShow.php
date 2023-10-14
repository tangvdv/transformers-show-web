<?php
$type = ["show"];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shows</title>
</head>
<body>
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
        <a class="m-2 btn btn-primary btn-sm" href="index.php">Back</a>
        <div class="container py-4">
            <form action="createShowController.php" method="POST" enctype="multipart/form-data">
                <div class="row g-3">
                    <div class="col-sm-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" name="show-name">
                    </div>

                    <div class="col-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" rows="5" name="show-description"></textarea>
                    </div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Type</label>
                    <select class="form-select" name="show-type">
                        <option value="0">Choose...</option>
                        <option value="1">Movie</option>
                    </select>
                    </div>

                    <div class="col-12">
                        <label for="release-date" class="form-label">Release date</label>
                        <input class="form-control w-25" type="date" name="show-release-date" value="<?php $timestamp = time(); echo gmdate('Y-m-d', $timestamp) ?>" min="2000-01-01" max="<?php $timestamp = time(); echo gmdate('Y-m-d', $timestamp) ?>" />
                    </div> 

                    <label for="image" class="form-label">Image</label>
                    <div class="d-flex justify-content-between mx-2">
                        <div class="align-self-center">
                            <input class="form-control" type="file" name="show-image" accept=".jpg, .jpeg, .png">
                        </div>
                    </div>

                    <hr class="my-4">
                    <div class="text-center">
                        <div class="">
                            <label for="image" id="error-label" class="form-label text-danger"><?php if(isset($_GET["error"])) echo $_GET["error"]; ?></label>
                        </div>
                        <div class="">
                            <button class="btn btn-success btn-lg" type="submit">Create</button>
                        </div>    
                    </div>
                </div>
            </form>
    </main>
</body>
</html>