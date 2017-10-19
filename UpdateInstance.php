<!DOCTYPE html>
<html>
<body>

<?php
$MatiralName = $_GET['MatiralName'];
$OldInstanceName = $_GET['OldInstanceName'];
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
$sql=sprintf("Update ProductionMaterials set SerialNumber='%s',Comment='%s',Quantity=%f,QuantityType=%d where Name='%s' and SerialNumber='%s'",$InstanceName , $Comment , $Size , $SizeType , $MatiralName , $OldInstanceName);
echo $sql;
$result = mysqli_query($con,$sql);

$sql=sprintf("Delete from ProductionRecipe where Material1SN='%s' and   Id in (select Id from MaterialsRecipe where Material1='%s')",$OldInstanceName , $MatiralName);
$result = mysqli_query($con,$sql);


$sql=sprintf("Update ProductionRecipe set Material2SN='%s' where Material2SN='%s' and Id in (select Id from MaterialsRecipe where Material2='%s')",$InstanceName , $OldInstanceName , $MatiralName);
$result = mysqli_query($con,$sql);





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

