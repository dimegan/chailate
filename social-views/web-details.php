<?php
$SITE_ROOT = "http://localhost:8888/devstudio/chailate/";

$jsonData = getData($SITE_ROOT);
makePage($jsonData, $SITE_ROOT);
function getData($siteRoot) {
	$id = ctype_digit($_GET['id']) ? $_GET['id'] : 1;
	$fileName = $siteRoot.'jsons/portfolio-webdev.json';
    $rawData = file_get_contents($fileName);
    $data = json_decode($rawData);
    for($i = 0; $i < count($data); $i++){
    	if($id == $data[$i]->id){
    		return $data[$i];
    	}
    }

    return $data[0];
}

function makePage($data, $SITE_ROOT) {
	
    ?>
    <!DOCTYPE html>
    <html>
        <head>
            <meta property="og:title" content="<?php echo $data->title; ?>" />
            <meta property="og:description" content="<?php echo $data->summary; ?>" />
            <meta property="og:image" content="<?php echo $SITE_ROOT . $data->imageUrl; ?>" />
            <!-- etc. -->
        </head>
        <body>
            <h1><?php echo $data->title; ?></h1>
            <p><?php echo $data->summary; ?></p>
            <img src="<?php echo $SITE_ROOT . $data->imageUrl; ?>">
        </body>
    </html>
    <?php
}
?>