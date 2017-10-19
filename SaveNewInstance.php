<!DOCTYPE html>
<html>
<body>

<?php
$MatiralName = $_GET['MatiralName'];
$InstanceName = $_GET['InstanceName'];
$Comment = $_GET['Comment'];
$SelectedRawInstances = $_GET['SelectedRawInstances'];
$SelectedMasterInstances = $_GET['SelectedMasterInstances'];
$Size = $_GET['Size'];
$SizeType = $_GET['SizeType'];


$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ChemistryTest");
$sql=sprintf("INSERT INTO ProductionMaterials (Name,SerialNumber,Comment,Quantity,QuantityType) VALUES('%s','%s','%s',%d,%d)",$MatiralName,  $InstanceName , $Comment , $Size , $SizeType);
$result = mysqli_query($con,$sql);
if (! $result)
	echo("Errorcode: " . mysqli_errno($con));

foreach (json_decode($SelectedRawInstances) as $x)
{
	$SelectQuery = sprintf("SELECT Id,'%s','%s' from MaterialsRecipe where Material1='%s' and Material2='%s'",$InstanceName,$x->{'InstanceName'},$MatiralName,$x->{'MatiralName'});
	$InsertSelectQuery=sprintf("INSERT INTO ProductionRecipe (Id , Material1SN , Material2SN) %s" , $SelectQuery);
	$result = mysqli_query($con,$InsertSelectQuery);

}
foreach (json_decode($SelectedMasterInstances) as $x)
{
	$SelectQuery = sprintf("SELECT Id,'%s','%s' from MaterialsRecipe where Material1='%s' and Material2='%s'",$InstanceName,$x->{'InstanceName'},$MatiralName,$x->{'MatiralName'});
	$InsertSelectQuery=sprintf("INSERT INTO ProductionRecipe (Id , Material1SN , Material2SN) %s" , $SelectQuery);
	$result = mysqli_query($con,$InsertSelectQuery);

}

mysqli_close($con);

?>

