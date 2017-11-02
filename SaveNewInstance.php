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


include 'PhpUtils.php';
$con = ConnectToDb();
if (! $con)
	return;

$sql=sprintf("INSERT INTO ProductionMaterials (Name,SerialNumber,Comment,Quantity,QuantityType) VALUES('%s','%s','%s',%d,%d)",$MatiralName,  $InstanceName , $Comment , $Size , $SizeType);
if ( !MysqliQuery($con,$sql)) 
	return;

foreach (array_merge(json_decode($SelectedRawInstances) , json_decode($SelectedMasterInstances)) as $x)
{
	$SelectQuery1 = sprintf("SELECT Id from MaterialsRecipe where Material1='%s' and Material2='%s'",$MatiralName,$x->{'MatiralName'});
	$SelectQuery2 = "SELECT MAX(Id) from ProductionMaterials";
	$SelectQuery3 = sprintf("SELECT Id from ProductionMaterials where Name='%s' and SerialNumber='%s'",$x->{'MatiralName'} , $x->{'InstanceName'});
	
	$InsertSelectQuery=sprintf("INSERT INTO ProductionRecipe (Id , Production1Id , Production2Id) VALUES ((%s),(%s),(%s))" , $SelectQuery1,$SelectQuery2,$SelectQuery3);
	if ( !MysqliQuery($con,$InsertSelectQuery)) 
		return;

}

MysqliEnd($con);

?>

