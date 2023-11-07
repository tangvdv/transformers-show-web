<?php
$type = ["voiceactor"];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Voice Actor</title>
</head>
<body>
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
        <a class="m-2 btn btn-primary btn-sm" href="index.php">Back</a>
        <div class="container py-4">
            <form action="createVoiceActorController.php" method="POST" enctype="multipart/form-data">
                <div class="row g-3">
                    <div class="col-sm-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" name="voiceactor-name">
                    </div>

                    <div class="col-md-10"></div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Origin</label>
                    <select class="form-select" name="voiceactor-origin">
                        <option value="0">Choose...</option>
                        <option value="1">American</option>
                        <option value="2">English</option>
                        <option value="3">Japanese</option>
                        <option value="4">German</option>
                        <option value="5">Spanish</option>
                        <option value="6">French</option>
                    </select>
                    </div>

                    <div class="col-md-10"></div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Dubb Localization</label>
                    <select class="form-select" name="voiceactor-dubb">
                        <option value="0">Choose...</option>
                        <option value="1">America</option>
                        <option value="2">England</option>
                        <option value="3">Japan</option>
                        <option value="4">Germany</option>
                        <option value="5">Spain</option>
                        <option value="6">France</option>
                    </select>
                    </div>

                    <label for="image" class="form-label">Image</label>
                    <div class="d-flex justify-content-between mx-2">
                        <div class="align-self-center">
                            <input class="form-control" type="file" name="voiceactor-image" accept=".jpg, .jpeg, .png">
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