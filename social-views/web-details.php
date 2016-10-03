<?php
//Local site root
//$SITE_ROOT = "http://local.chailate:8888/";

//Prod site root
$SITE_ROOT = "http://chailate.com/";

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
            <meta charset="UTF-8">
            <meta property="fb:app_id" content="1838948626325222" />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:height" content="400" />
            <meta property="og:title" content="<?php echo $data->title; ?>" />
            <meta property="og:description" content="<?php echo strip_tags($data->summary); ?>" />
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