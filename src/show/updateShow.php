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
    <script src="/src/includes/js/producer-data.js"></script>
    <script src="/src/includes/js/director-data.js"></script>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shows</title>
</head>
<body onload="displayUpdateShow(<?php echo $id; ?>)">
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
        <a class="m-2 btn btn-primary btn-sm" href="show.php?id=<?php echo $id ?>">Back</a>
        <div class="container py-4">
            <form action="" id="form" method="POST" enctype="multipart/form-data">
                <div class="row g-3">
                    <div class="col-sm-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="show-name" name="show-name">
                    </div>

                    <div class="col-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" rows="5" id="show-description" name="show-description"></textarea>
                    </div>

                    <div class="col-md-5">
                    <label for="type" class="form-label">Type</label>
                    <select class="form-select" id="show-type" name="show-type">
                        <option value="0">Choose...</option>
                        <option value="1">Movie</option>
                    </select>
                    </div>

                    <div class="col-12">
                        <label for="release-date" class="form-label">Release date</label>
                        <input class="form-control w-25" type="date" id="show-release-date" name="show-release-date" value="2018-07-22" min="2000-01-01" max="<?php $timestamp = time(); echo gmdate('Y-m-d', $timestamp) ?>" />
                    </div> 

                    <label for="image" class="form-label">Image</label>
                    <div class="d-flex justify-content-between border rounded-2 mx-2">
                        <div class="align-self-center">
                            <input class="form-control" type="file" id="input-image" name="show-image" accept=".jpg, .jpeg, .png">
                        </div>
                        <div>
                            <img src="" id="show-image" class="poster">
                        </div>
                    </div>

                    <div class="col-md-5">
                        <label for="director" class="form-label">Director</label>
                        <select class="form-select" id="show-director" name="show-director" onchange="addDirectorAsShow(<?php echo $id ?>)">
                            <option value="">Select...</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <table class="table w-25">
                            <tbody id="table-director">
                            </tbody>
                        </table>    
                    </div> 

                    <div class="col-md-5">
                        <label for="producer" class="form-label">Producer</label>
                        <select class="form-select" id="show-producer" name="show-producer" onchange="addProducerAsShow(<?php echo $id ?>)">
                            <option value="">Add...</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <table class="table w-25">
                            <tbody id="table-producer">
                            </tbody>
                        </table>    
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