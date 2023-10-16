<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/src/includes/css/tf-show.css">
    <script src='/src/includes/js/main.js'></script>
    <?php
    if(isset($type) && !empty($type)){
        foreach($type as $value){
            switch ($value) {
                case "show":
                    echo "<script src='/src/includes/js/show-data.js'></script>";
                    break;
                case "bot":
                    echo "<script src='/src/includes/js/bot-data.js'></script>";
                    break;
                case "alt":
                    echo "<script src='/src/includes/js/alt-data.js'></script>";
                    break;
                case "actor":
                    echo "<script src='/src/includes/js/actor-data.js'></script>";
                    break;
                case "voiceactor":
                    echo "<script src='/src/includes/js/voiceactor-data.js'></script>";
                    break;
                case "director":
                    echo "<script src='/src/includes/js/director-data.js'></script>";
                    break;
                case "producer":
                    echo "<script src='/src/includes/js/producer-data.js'></script>";
                    break;
                case "skin":
                    echo "<script src='/src/includes/js/skin-data.js'></script>";
                    break;
            } 
        }
    }
    ?>
</head>