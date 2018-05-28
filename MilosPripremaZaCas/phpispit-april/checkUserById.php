<?php
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");
// checkUserById.php
if(isset($_POST['token'])){

$token = $_POST['token'];

if ($token === $_SERVER['HTTP_TOKEN']) {
  if (getKorisnikByToken()) {
    echo json_encode('ok');
  } else {
    echo json_encode('Bad');
  }
} else {
  echo json_encode('Los token');
}

}
?>
