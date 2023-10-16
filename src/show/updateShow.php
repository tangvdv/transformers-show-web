<?php
$type = ["show", "director", "producer", "actor", "skin", "bot", "alt", "voiceactor"];
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
<body onload="displayUpdateShow(<?php echo $id; ?>)">
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
        <a class="m-2 btn btn-primary btn-sm" href="show.php?id=<?php echo $id ?>">Back</a>
        <div class="container py-4">
            <form action="" id="form" method="POST" enctype="multipart/form-data">
                <div class="row g-3">

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Name</b></h4>
                        <input type="text" class="form-control w-25" id="show-name" name="show-name">
                    </div>

                    <hr>

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Description</b></h4>
                        <textarea class="form-control" rows="5" id="show-description" name="show-description"></textarea>
                    </div>

                    <hr>

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Type</b></h4>
                        <select class="form-select w-25" id="show-type" name="show-type">
                            <option value="0">Choose...</option>
                            <option value="1">Movie</option>
                        </select>
                    </div>

                    <hr>

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Release date</b></h4>
                        <input class="form-control w-25" type="date" id="show-release-date" name="show-release-date" value="2018-07-22" min="2000-01-01" max="<?php $timestamp = time(); echo gmdate('Y-m-d', $timestamp) ?>" />
                    </div> 

                    <hr>

                    <h4 class="form-label text-center"><b>Image</b></h4>
                    <div class="d-flex justify-content-between border rounded-2 mx-2">
                        <div class="align-self-center">
                            <input class="form-control" type="file" id="input-image" name="show-image" accept=".jpg, .jpeg, .png">
                        </div>
                        <div>
                            <img src="" id="show-image" class="poster">
                        </div>
                    </div>

                    <hr>

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Director</b></h4>
                        <select class="form-select w-25" id="show-director" name="show-director" onchange="addDirectorHasShow(<?php echo $id ?>)">
                            <option value="">Select...</option>
                        </select>
                    </div>

                    <hr>

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Producer</b></h4>
                        <select class="form-select w-25" id="show-producer" name="show-producer" onchange="addProducerHasShow(<?php echo $id ?>)">
                            <option value="">Add...</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <table class="table text-center w-50">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-producer">
                            </tbody>
                        </table>    
                    </div> 

                    <hr>

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Actor</b></h4>
                        <select class="form-select w-25" id="show-actor" name="show-actor" onchange="addActorHasShow(<?php echo $id ?>)">
                            <option value="">Add...</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <table class="table text-center w-50">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Character</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-actor">
                            </tbody>
                        </table>    
                    </div>

                    <hr>

                    <div class="col-12">
                        <h4 class="form-label text-center"><b>Skin</b></h4>
                        <div class="text-center">
                            <label class="" id="skin-error"></label>
                        </div>
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th width="25%">
                                        <div>
                                            <label class="form-label">Image</label>
                                            <input class="form-control" type="file" id="show-skin-image" name="show-skin-image" accept=".jpg, .jpeg, .png">
                                        </div>
                                    </th>
                                    <th width="10%">
                                        <div>
                                            <label class="form-label">Screen time</label>
                                            <input type="number" class="form-control" id="show-skin-screentime" name="show-skin-screentime">
                                        </div>
                                    </th>
                                    <th width="20%">
                                        <div>
                                            <label class="form-label">Bot</label>
                                            <select class="form-select" id="show-skin-bot" name="show-skin-bot">
                                            </select>
                                        </div>
                                    </th>
                                    <th width="20%">
                                        <div>
                                            <label class="form-label">Alt</label>
                                            <select class="form-select" id="show-skin-alt" name="show-skin-alt">
                                            </select>
                                        </div>
                                    </th>
                                    <th width="20%">
                                        <div>
                                            <label class="form-label">Voice actor</label>
                                            <select class="form-select" id="show-skin-va" name="show-skin-va">
                                            </select>
                                        </div>
                                    </th>
                                    <th>
                                        <button class="btn btn-success btn" type="button" onclick="createSkin(<?php echo $id; ?>)">Create</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="table-skin">
                            </tbody>
                        </table>    
                    </div>

                    <hr class="my-4">
                    <div class="text-center">
                        <div class="">
                            <label id="error-label" class="form-label text-danger"><?php if(isset($_GET["error"])) echo $_GET["error"]; ?></label>
                        </div>
                        <div>
                            <button class="btn btn-success btn-lg" type="submit">Update</button>
                        </div>    
                    </div>
                </div>
            </form>
    </main>
</body>
</html>