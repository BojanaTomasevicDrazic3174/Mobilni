<?php
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");
// addPorudzbina.php
if(isset($_POST['mobilniId'])) {


$mobilniId = $_POST['mobilniId'];

echo addPorudzbina($mobilniId);
}
else
{
  echo json_encode('losi podaci');
}

?>
