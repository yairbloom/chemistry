<?php
$NewName = $_GET['NewName'];
$OldName = $_GET['OldName'];
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


$sql="Update Materials SET Name='".$NewName."',Comment='".$Comment."' where Name='".$OldName."'";
if ( !MysqliQuery($con,$sql)) 
	return;

if ($Type == "Formulation") {
  $sql="UPDATE FormulationNameToGroup SET Id=".$groupTypeName.",Name='".$NewName."' where Name='".$NewName."'";
  if ( !MysqliQuery($con,$sql)) 
	  return;
}

$Material2List="'STAMMATS456'";
foreach(array_merge($Ra,$Ma) as $item) {
	$sql="INSERT IGNORE INTO MaterialsRecipe (Material1,Material2) VALUES('".$NewName."','".$item."')";
	if ( !MysqliQuery($con,$sql)) 
		return;
	$Material2List=sprintf("%s,'%s'",$Material2List,$item);

}
$sql=sprintf("DELETE FROM MaterialsRecipe where Material1='%s' and Material2 NOT IN (%s)",$NewName , $Material2List);
if ( !MysqliQuery($con,$sql)) 
	return;

MysqliEnd($con);
?>

