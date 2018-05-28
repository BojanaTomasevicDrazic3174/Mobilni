<?php
include("config.php");

function checkIfLoggedIn(){
	global $conn;
	if(isset($_SERVER['HTTP_TOKEN'])){
		$token = $_SERVER['HTTP_TOKEN'];
		$result = $conn->prepare("SELECT * FROM KORISNICI WHERE TOKEN=?");
		$result->bind_param("s",$token);
		$result->execute();
		$result->store_result();
		$num_rows = $result->num_rows;
		if($num_rows > 0)
		{
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

function login($username, $password){
	global $conn;
	$rarray = array();
	if(checkLogin($username,$password)){
		$id = sha1(uniqid());
		$result2 = $conn->prepare("UPDATE KORISNICI SET TOKEN=? WHERE USERNAME=?");
		$result2->bind_param("ss",$id,$username);
		$result2->execute();
		$rarray['token'] = $id;
	} else{
		header('HTTP/1.1 401 Unauthorized');
		$rarray['error'] = "Invalid username/password";
	}
	return json_encode($rarray);
}

function checkLogin($username, $password){
	global $conn;
	$password = md5($password);
	$result = $conn->prepare("SELECT * FROM KORISNICI WHERE USERNAME=? AND PASSWORD=?");
	$result->bind_param("ss",$username,$password);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{
		return false;
	}
}

function register($username, $password, $firstname, $lastname){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfUserExists($username)){
		$errors .= "Username already exists\r\n";
	}
	if(strlen($username) < 5){
		$errors .= "Username must have at least 5 characters\r\n";
	}
	if(strlen($password) < 5){
		$errors .= "Password must have at least 5 characters\r\n";
	}
	if(strlen($firstname) < 3){
		$errors .= "First name must have at least 3 characters\r\n";
	}
	if(strlen($lastname) < 3){
		$errors .= "Last name must have at least 3 characters\r\n";
	}
	if($errors == ""){
		$stmt = $conn->prepare("INSERT INTO KORISNICI (FIRSTNAME, LASTNAME, USERNAME, PASSWORD) VALUES (?, ?, ?, ?)");
		$pass =md5($password);
		$stmt->bind_param("ssss", $firstname, $lastname, $username, $pass);
		if($stmt->execute()){
			$id = sha1(uniqid());
			$result2 = $conn->prepare("UPDATE KORISNICI SET TOKEN=? WHERE USERNAME=?");
			$result2->bind_param("ss",$id,$username);
			$result2->execute();
			$rarray['token'] = $id;
		}else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = "Database connection error";
		}
	} else{
		header('HTTP/1.1 400 Bad request');
		$rarray['error'] = json_encode($errors);
	}

	return json_encode($rarray);
}

function checkIfUserExists($username){
	global $conn;
	$result = $conn->prepare("SELECT * FROM KORISNICI WHERE username=?");
	$result->bind_param("s",$username);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{
		return false;
	}
}

function getKorisnikById() {
	global $conn;
	$token = $_SERVER['HTTP_TOKEN'];
	$result = $conn->query("SELECT * FROM KORISNICI WHERE TOKEN='".$token."'");
	// $result->bind_param("s",$token);
		$num_rows = $result->num_rows;

		if($num_rows === 1 ) {
			$row = $result->fetch_assoc();
			return $row['ID'];
		}
}

function getKorisnikByIme() {
	global $conn;
	$token = $_SERVER['HTTP_TOKEN'];
	$result = $conn->query("SELECT * FROM KORISNICI WHERE TOKEN='".$token."'");
	// $result->bind_param("s",$token);
		$num_rows = $result->num_rows;

		if($num_rows === 1 ) {
			$row = $result->fetch_assoc();
		if ($row['USERNAME'] == 'admin' ){
			return true;
		}else {
			return false;
		}
		}
}

function getKorisnikByToken() {
	global $conn;
	$token = $_SERVER['HTTP_TOKEN'];
	$result = $conn->query("SELECT * FROM KORISNICI WHERE TOKEN='".$token."'");
	// $result->bind_param("s",$token);
		$num_rows = $result->num_rows;

		if($num_rows === 1 ) {
			$row = $result->fetch_assoc();
		if ($row['ID'] == 1 ){
			return true;
		}else {
			return false;
		}
		}
}


function addBrand($ime){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfLoggedIn()){
		if(strlen($ime) < 3){
			$errors .= "Ime brenda mora imati bar 3 karaktera\r\n";
		}
		if($errors == ""){
				$stmt = $conn->prepare("INSERT INTO BRAND (IME) VALUES (?)");
				$stmt->bind_param("s", $ime);
				if($stmt->execute()) {
					$rarray['success'] = "ok";
				}else{
					$rarray['error'] = "Database connection error";
				}
				return json_encode($rarray);
		} else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = json_encode($errors);
			return json_encode($rarray);
		}
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getBrand(){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->query("SELECT * FROM BRAND");
		$num_rows = $result->num_rows;
		$brands = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT * FROM BRAND");
			while($row = $result2->fetch_assoc()) {
				array_push($brands,$row);
			}
		}
		$rarray['brands'] = $brands;
		return json_encode($rarray);
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function addMobilni($brand_id, $ime,$cena,$opis ){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfLoggedIn()){
		if(strlen($ime) < 3){
			$errors .= "Ime brenda mora imati bar 3 karaktera\r\n";
		}
		if(strlen($cena) < 3){
			$errors .= "Ime brenda mora imati bar 3 karaktera\r\n";
		}
		if(strlen($opis) < 3){
			$errors .= "Ime brenda mora imati bar 3 karaktera\r\n";
		}

		if($errors == ""){
				$stmt = $conn->prepare("INSERT INTO mobilni (BRAND_ID, IME, CENA, OPIS) VALUES (?,?,?,?)");
				$stmt->bind_param("isis",$brand_id, $ime,$cena,$opis);
				if($stmt->execute()){
					$rarray['success'] = "ok";
				}else{
					$rarray['error'] = "Database connection error";
				}
				return json_encode($rarray);
		} else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = json_encode($errors);
			return json_encode($rarray);
		}
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getMobilni(){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->query("SELECT * FROM mobilni");
		$num_rows = $result->num_rows;
		$mobilni = array();
		if($num_rows > 0)
		{

			while($row = $result->fetch_assoc()) {
				$row['BRAND_IME'] = getBrandById($row['BRAND_ID']);
				array_push($mobilni,$row);
			}
		}
		$rarray['mobilni'] = $mobilni;
		return json_encode($rarray);
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getBrandById($brand_id) {
	global $conn;
	$rarray = array();
	$brand_id = intval($brand_id);
	$result = $conn->query("SELECT * FROM brand WHERE ID=" .$brand_id);
	$num_rows = $result->num_rows;

		if($num_rows > 0)
		{

			while($row = $result->fetch_assoc()) {
			$rarray = $row;
			}
		}

		return $rarray['IME'];


}


function addPorudzbina($mobilniId) {

		global $conn;
		$rarray = array();
		$DATUM = date('y-m-d H:i:s');
		if(checkIfLoggedIn()){
			$korisnikId = getKorisnikById();
			$stmt = $conn->prepare("INSERT INTO `porudzbina` (`KORISNICI_ID`, `MOBILNI_ID`, `DATUM`)
			VALUES (?, ?, ?)");
			$stmt -> bind_param("iis",$korisnikId,$mobilniId,$DATUM);

			if($stmt -> execute()){
				$rarray['success'] = "ok";

			}else {
				$rarray['error'] = "Database connection error";

			}

			return json_encode($rarray);

		} else{
			$rarray['error'] = "Please log in";
			header('HTTP/1.1 401 Unauthorized');
			return json_encode($rarray);
		}


}


function getPorudzbine() {
	global $conn;
	$rarray = array();

	if(checkIfLoggedIn()) {
		$korisnikId = getKorisnikById();
		$result = $conn->query("SELECT * FROM porudzbina WHERE KORISNICI_ID=".$korisnikId);
		$num_rows = $result->num_rows;
		$porudzbina = array();
		if($num_rows > 0 ) {

while ($row = $result->fetch_assoc()) {
	$row['IME'] = getMobilniById($row['MOBILNI_ID']);
	array_push($porudzbina,$row);
		}

		$rarray['porudzbina'] = $porudzbina;
		return json_encode($rarray);

	}
} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}


function getMobilniById($mobilniId) {
	global $conn;
	$rarray = array();
$mobilniId = intval($mobilniId);
$result = $conn->query("SELECT * from mobilni WHERE ID=".$mobilniId);

$num_rows = $result->num_rows;
if($num_rows > 0){
	while ($row = $result->fetch_assoc()) {
			$rarray = $row;
	}
}

	return $rarray['IME'];

}
function deleteMobilni($mobilniId) {
	global $conn;
	$rarray = array();
	if (checkIfLoggedIn()) {
		if (getKorisnikByIme()) {
			$result = $conn->prepare("DELETE FROM mobilni WHERE ID=?");
			$result-> bind_param("i", $mobilniId);
			$result->execute();

			$rarray['success'] = "Delete successfully";
		}
	} else {
			$rarray['error'] = "Please log in";
			header('HTTP/1.1 401 Unauthorized');

		}

		return json_encode($rarray);
	}

	function deletePorudzbina($id) {
		global $conn;
		$rarray = array();
		if (checkIfLoggedIn()) {

				$result = $conn->prepare("DELETE FROM porudzbina WHERE ID=?");
				$result-> bind_param("i", $id);
				$result->execute();

				$rarray['success'] = "Delete successfully";

		} else {
				$rarray['error'] = "Please log in";
				header('HTTP/1.1 401 Unauthorized');

			}

			return json_encode($rarray);
	}

?>
