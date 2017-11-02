<?php
$Name = $_GET['MatiralName'];

include 'PhpUtils.php';
$con = ConnectToDb();
if (! $con)
	return;

$sql="DELETE FROM Materials WHERE Name='".$Name."'";
if ( !MysqliQuery($con,$sql)) 
	return;


MysqliEnd($con);


?>

