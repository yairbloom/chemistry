<!DOCTYPE html>
<html>
<body>

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






$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ChemistryTest");
$sql="Update Materials SET Name='".$NewName."',Comment='".$Comment."' where Name='".$OldName."'";
$result = mysqli_query($con,$sql);

if ($Type == "Formulation") {
  $sql="UPDATE FormulationNameToGroup SET Id=".$groupTypeName.",Name='".$NewName."' where Name='".$OldName."'";
  $result = mysqli_query($con,$sql);
}


$sql="DELETE FROM MaterialsRecipe where Material1='".$OldName."'";
$result = mysqli_query($con,$sql);

$sql="Update MaterialsRecipe SET Material2='".$NewName."' where Material2='".$OldName."'";
$result = mysqli_query($con,$sql);

foreach(array_merge($Ra,$Ma) as $item) {
	$sql="INSERT INTO MaterialsRecipe (Material1,Material2) VALUES('".$NewName."','".$item."')";
	$result = mysqli_query($con,$sql);
}

mysqli_close($con);



?>

