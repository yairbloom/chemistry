<?php
$Name = $_GET['Name'];
$Comment = $_GET['Comment'];
$Ra = $_GET['RawsList'];
$groupTypeName = $_GET['GroupTypeName'];

if (empty($Ra )) {
  $Ra=[];
}

$Ma = $_GET['MastersList'];


if (empty($Ma )) {
  $Ma=[];
}
$Type = $_GET['MatiralType'];

include 'PhpUtils.php';
$con = ConnectToDb();
if (! $con)
	return;


$sql="INSERT INTO Materials (Name,Comment,Type,Available) VALUES('".$Name."','".$Comment."','".$Type."',1)";
if ( !MysqliQuery($con,$sql)) 
	return;

if ($Type == "Formulation") {
  $sql="INSERT INTO FormulationNameToGroup (Name,Id) VALUES('".$Name."',".$groupTypeName.")";
  if ( !MysqliQuery($con,$sql)) 
	  return;
}

foreach(array_merge($Ra,$Ma) as $item) {
	$sql="INSERT INTO MaterialsRecipe (Material1,Material2) VALUES('".$Name."','".$item."')";
	if ( !MysqliQuery($con,$sql))
		return;
}


MysqliEnd($con);

?>

