<?php
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");
// addMobilni.php
if(
    isset($_POST['ime']) &&
    isset($_POST['cena']) &&
    isset($_POST['opis']) &&
    isset($_POST['brand_id'])
  ){

$brand_id = $_POST['brand_id'];
$ime = $_POST['ime'];
$cena = $_POST['cena'];
$opis = $_POST['opis'];
echo addMobilni($brand_id, $ime,$cena,$opis );
}
else
{
  echo json_encode('losi podaci');
}

?>
