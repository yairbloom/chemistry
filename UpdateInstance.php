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

include 'PhpUtils.php';
$con = ConnectToDb();
if (! $con)
	return;

$sql=sprintf("Update ProductionMaterials set SerialNumber='%s',Comment='%s',Quantity=%f,QuantityType=%d where Name='%s' and SerialNumber='%s'",$InstanceName , $Comment , $Size , $SizeType , $MatiralName , $OldInstanceName);
if ( !MysqliQuery($con,$sql)) 
	return;

$sql=sprintf("Delete from ProductionRecipe where Production1Id='%s' and   Id in (select Id from MaterialsRecipe where Material1='%s')",$OldInstanceName , $MatiralName);
if ( !MysqliQuery($con,$sql)) 
	return;


$sql=sprintf("Update ProductionRecipe set Production2Id='%s' where Production2Id='%s' and Id in (select Id from MaterialsRecipe where Material2='%s')",$InstanceName , $OldInstanceName , $MatiralName);
if ( !MysqliQuery($con,$sql)) 
	return;





foreach (json_decode($SelectedRawInstances) as $x)
{
	$SelectQuery = sprintf("SELECT Id,'%s','%s' from MaterialsRecipe where Material1='%s' and Material2='%s'",$InstanceName,$x->{'InstanceName'},$MatiralName,$x->{'MatiralName'});
	$InsertSelectQuery=sprintf("INSERT INTO ProductionRecipe (Id , Production1Id , Production2Id) %s" , $SelectQuery);
	if ( !MysqliQuery($con,$InsertSelectQuery)) 
		return;

}
foreach (json_decode($SelectedMasterInstances) as $x)
{
	$SelectQuery = sprintf("SELECT Id,'%s','%s' from MaterialsRecipe where Material1='%s' and Material2='%s'",$InstanceName,$x->{'InstanceName'},$MatiralName,$x->{'MatiralName'});
	$InsertSelectQuery=sprintf("INSERT INTO ProductionRecipe (Id , Production1Id , Production2Id) %s" , $SelectQuery);
	if ( !MysqliQuery($con,$InsertSelectQuery)) 
		return;
}

MysqliEnd($con);

?>

