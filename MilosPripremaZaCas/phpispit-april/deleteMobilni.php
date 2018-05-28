<?php
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");
// deleteMobilni.php
if(isset($_POST['ID'])) {

$mobilniId =intval($_POST['ID']);

echo deleteMobilni($mobilniId);
}
else
{
  echo json_encode('losi podaci');
}

?>
