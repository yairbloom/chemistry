<!DOCTYPE html>
<html>
<body>

<?php
$Name = $_GET['MatiralName'];



$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ChemistryTest");
$sql="DELETE FROM Materials WHERE Name='".$Name."'";
$result = mysqli_query($con,$sql);


$sql="DELETE FROM MaterialsRecipe where Material1='".$Name."' OR Material2='".$Name."'";
$result = mysqli_query($con,$sql);

echo $sql;

mysqli_close($con);



?>

