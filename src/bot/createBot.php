<?php
$type = "bot";
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
            <form action="createBotController.php" method="POST" enctype="multipart/form-data">
                <div class="row g-3">
                    <div class="col-sm-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" name="bot-name">
                    </div>

                    <div class="col-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" rows="5" name="bot-description"></textarea>
                    </div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Faction</label>
                    <select class="form-select" name="bot-faction">
                        <option value="0">Choose...</option>
                        <option value="1">Autobot</option>
                        <option value="2">Decepticon</option>
                        <option value="3">Maximal</option>
                        <option value="4">Predacon</option>
                        <option value="5">Terrorcon</option>
                    </select>
                    </div>

                    <label for="image" class="form-label">Image</label>
                    <div class="d-flex justify-content-between mx-2">
                        <div class="align-self-center">
                            <input class="form-control" type="file" name="bot-image" accept=".jpg, .jpeg, .png">
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