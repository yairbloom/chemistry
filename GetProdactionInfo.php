<?php
// connect mysql server
$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) { 
    die('Could not connect: ' . mysql_error()); 
} 


$MatiralName = $_GET['MatiralName'];
$ProductionList=[];

// select database
mysqli_select_db($con,"ChemistryTest");

$sql="SELECT SerialNumber,Comment,Quantity,QuantityType,LastModify from ProductionMaterials where Name='".$MatiralName."'";
$result = mysqli_query($con,$sql);
$outp = array();
$outp = $result->fetch_all(MYSQLI_ASSOC);
foreach ($outp as $value)
{
	if(!empty($_GET["Raw"]))
	{
		$sql=sprintf("select A.Material2SN as MaterialSN ,B.Material2 as MaterialName from ProductionRecipe as A,MaterialsRecipe as B, Materials as C where A.Material1SN='%s' and A.Id=B.Id and B.Material2=C.Name and C.Type='Raw'",$value['SerialNumber']);
		$resultRaw = mysqli_query($con,$sql);
		$outpRaw = array();
		$outpRaw = $resultRaw->fetch_all(MYSQLI_ASSOC);
		$value['Raw'] = [];
		$index =0;
		foreach ($outpRaw as $valueRaw)
		{
			$value['Raw'][$index] = $valueRaw;
			$index++;
		}
	}

	if(!empty($_GET["Master"]))
	{
		$sql=sprintf("select A.Material2SN as MaterialSN ,B.Material2 as MaterialName from ProductionRecipe as A,MaterialsRecipe as B, Materials as C where A.Material1SN='%s' and A.Id=B.Id and B.Material2=C.Name and C.Type='Master'",$value['SerialNumber']);
		$resultMaster = mysqli_query($con,$sql);
		$outpMaster = array();
		$outpMaster = $resultMaster->fetch_all(MYSQLI_ASSOC);
		$value['Master'] = [];
		$index =0;
		foreach ($outpMaster as $valueMaster)
		{
			$value['Master'][$index] = $valueMaster;
			$index++;
		}

	}
	array_push($ProductionList,$value);

}

if(!empty($_GET["Raw"]))
{
	$sql=sprintf("SELECT A.Material2,A.Id from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Raw' and A.Material2=B.Name",$MatiralName);
	$resultRaw = mysqli_query($con,$sql);
	$outpRaw = array();
	$outpRaw = $resultRaw->fetch_all(MYSQLI_ASSOC);
	$value['RawRecipe'] = [];
	$index =0;
	foreach ($outpRaw as $valueRaw)
	{
		$value['RawRecipe'][$index] = $valueRaw;
		$index++;
	}


}

if(!empty($_GET["Master"]))
{
	$sql=sprintf("SELECT A.Material2,A.Id from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Master' and A.Material2=B.Name",$MatiralName);
	$resultMaster = mysqli_query($con,$sql);
	$outpMaster = array();
	$outpMaster = $resultMaster->fetch_all(MYSQLI_ASSOC);
	$value['MasterRecipe'] = [];
	$index =0;
	foreach ($outpMaster as $valueMaster)
	{
		$value['MasterRecipe'][$index] = $valueMaster;
		$index++;
	}

}

echo json_encode($ProductionList );
?>

