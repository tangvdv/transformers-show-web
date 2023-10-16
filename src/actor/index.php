<?php
$type = ["actor"];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actors</title>
</head>
<body onload="actorIndexManager()">
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
    <button type="button" class="btn btn-success m-2" onclick="window.location.href=`/src/actor/createActor.php`;">Create</button>
    <div class="container">
        <div class="text-center">
            <input class="form-control my-4" type="search" placeholder="Type to search...">
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="actor-container">            
        </div>
    </div>
    </main>
</body>
</html>