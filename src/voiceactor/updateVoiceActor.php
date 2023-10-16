<?php
$type = ["voiceactor"];
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
    <title>Update Voice Actor</title>
</head>
<body onload="displayUpdateVoiceActor(<?php echo $id; ?>)">
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
        <a class="m-2 btn btn-primary btn-sm" href="voiceActor.php?id=<?php echo $id ?>">Back</a>
        <div class="container py-4">
            <form action="updateVoiceActorController.php" id="form" method="POST" enctype="multipart/form-data">
                <div class="row g-3">
                    <div class="col-md-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="voiceactor-name" name="voiceactor-name">
                    </div>

                    <div class="col-md-10"></div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Origin</label>
                    <select class="form-select" id="voiceactor-origin" name="voiceactor-origin">
                        <option value="0">Choose...</option>
                        <option value="1">American</option>
                        <option value="2">English</option>
                    </select>
                    </div>

                    <div class="col-md-10"></div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Dubbing Localization</label>
                    <select class="form-select" id="voiceactor-dubb" name="voiceactor-dubb">
                        <option value="0">Choose...</option>
                        <option value="1">America</option>
                        <option value="2">England</option>
                    </select>
                    </div>

                    <label for="image" class="form-label">Image</label>
                    <div class="d-flex justify-content-between border rounded-2 mx-2">
                        <div class="align-self-center">
                            <input class="form-control" type="file" id="input-image" name="voiceactor-image" accept=".jpg, .jpeg, .png">
                        </div>
                        <div>
                            <img src="" id="voiceactor-image" class="poster">
                        </div>
                    </div>

                    <hr class="my-4">
                    <div class="text-center">
                        <div class="">
                            <label for="image" id="error-label" class="form-label text-danger"><?php if(isset($_GET["error"])) echo $_GET["error"]; ?></label>
                        </div>
                        <div class="">
                            <button class="btn btn-success btn-lg" type="submit">Update</button>
                        </div>    
                    </div>
                </div>
            </form>
    </main>
</body>
</html>