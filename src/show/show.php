<?php
$type = "show";
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
<body onload="displayShow(<?php echo $id; ?>)">
    <main>
        <button type="button" class="btn btn-success m-2" onclick="window.location.href=`/src/show/updateShow.php?id=${<?php echo $id?>}`;">Update</button>
        <div class="py-3 text-center container">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light" id="show-name"></h1>
                    <img class="poster my-4" id="show-image">
                </div>
                <hr>
            </div>
        </div>
        
        <div class="d-flex">
            <div class="text-center list-group w-25 m-4">
                <p class=""><b>Summary</b></p>
                <a href="#bot" class="list-group-item list-group-item-action">Bot</a>
                <a href="#actor" class="list-group-item list-group-item-action">Actor</a>
                <a href="#artefact" class="list-group-item list-group-item-action">Artefact</a>
                <a href="#anecdote" class="list-group-item list-group-item-action">Anecdote</a>
            </div>
            <div class="text-center flex-fill m-4">
                <p><b>Informations</b></p>
                <ul class="nav flex-column border rounded">
                    <li class="my-4"><p class="m-0" id="show-description"></p></li>
                    <hr>
                    <li class="nav-item d-flex  px-4 "><p>Release date : </p><p class="mx-1" id="show-release-date"></p></li>
                    <li class="nav-item d-flex  px-4 "><p>Producer : </p><p class="mx-1" id="show-producer"></p></li>
                    <li class="nav-item d-flex  px-4 "><p>Director : </p><p class="mx-1" id="show-director"></p></li>
                </ul>
            </div>    
        </div>

        <div class="text-center container w-75 my-4" id="bot">
            <h2>Bot</h2>

            <table class="table shadow-sm">
                <thead>
                    <tr>
                        <th class="p-2">    
                            <div class="row justify-content-center text-center">
                                <div class="col-md-7 themed-grid-col">
                                    <div class="row">
                                        <div class="col-md-3 themed-grid-col">Image</div>
                                        <div class="col-md-3 themed-grid-col">Name</div>
                                        <div class="col-md-3 themed-grid-col">Faction</div>
                                        <div class="col-md-3 themed-grid-col">Screen time</div>
                                    </div>
                                </div>
                                <div class="col-md-2 themed-grid-col">Alt mode</div>
                                <div class="col-md-2 themed-grid-col">Voice actor</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="skin-table">
                </tbody>

            </table>

        </div>
        <div class="text-center my-4" id="actor">
            <h2>Actor</h2>
        </div>
        <div class="text-center my-4" id="artefact">
            <h2>Artefact</h2>
        </div>
        <div class="text-center my-4" id="anecdote">
            <h2>Anecdote</h2>
        </div>
    </main>
</body>
</html>