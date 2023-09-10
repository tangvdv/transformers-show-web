<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once __DIR__ . "/../includes/head.php" ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shows</title>
</head>
<body onload="getShows()">
<?php include_once __DIR__."/../includes/header.php"; ?>
    <main>
    <button type="button" class="btn btn-success m-2" onclick="window.location.href=`/src/show/createShow.php`;">Create</button>
    <div class="container">
        <div class="mb-3 text-center">
            <input class="form-control m-4" type="search" placeholder="Type to search...">
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
        </div>
    </div>
    </main>
</body>
</html>