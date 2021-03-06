<?php

include 'PhpUtils.php';
$con = GetConnection();
if (!$con)
	return;

$SBMatiralType = $_GET['SBMatiralType'];
$Matirals->MatList=[];


if(!empty($_GET["GroupType"]))
  $sql="SELECT A.*,C.GroupType,C.Id from Materials as A , FormulationNameToGroup as B , FormulationGroup as C where A.Type=\"$SBMatiralType\" and A.Name=B.Name and B.Id=C.Id and Available=1";
else
  $sql="SELECT A.* from Materials as A  where A.Type=\"$SBMatiralType\" and Available=1";
$result = mysqli_query($con,$sql);
$outp = array();
$outp = $result->fetch_all(MYSQLI_ASSOC);
foreach ($outp as $value)
{
	if(!empty($_GET["Raw"]))
	{
		$sql=sprintf("SELECT A.Material2 from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Raw' and A.Material2=B.Name",$value['Name']);
		$resultRaw = mysqli_query($con,$sql);
		$outpRaw = array();
		$outpRaw = $resultRaw->fetch_all(MYSQLI_ASSOC);
		$value['Raw'] = [];
		$index =0;
		foreach ($outpRaw as $valueRaw)
		{
			$value['Raw'][$index]->Name = $valueRaw['Material2'];
			$sql=sprintf("SELECT count(Id) from  ProductionMaterials where Name='%s'" , $valueRaw['Material2']);
			$ResCount =  mysqli_query($con,$sql);
			if ($RowCount = mysqli_fetch_array($ResCount , MYSQLI_NUM) )   
				$value['Raw'][$index]->InstancesCount = $RowCount[0];
			$index++;
		}
	}

	if(!empty($_GET["Master"]))
	{
		$sql=sprintf("SELECT A.Material2 from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Master' and A.Material2=B.Name",$value['Name']);
		$resultMaster = mysqli_query($con,$sql);
		$outpMaster = array();
		$outpMaster = $resultMaster->fetch_all(MYSQLI_ASSOC);
		$value['Master'] = [];
		$index =0;
		foreach ($outpMaster as $valueMaster)
		{
			$value['Master'][$index]->Name = $valueMaster['Material2'];
			$sql=sprintf("SELECT count(Id) from  ProductionMaterials where Name='%s'" , $valueRaw['Material2']);
			$ResCount =  mysqli_query($con,$sql);
			if ($RowCount = mysqli_fetch_array($ResCount , MYSQLI_NUM) )   
				$value['Master'][$index]->InstancesCount = $RowCount[0];

			$index++;
		}
	}
	array_push($Matirals->MatList,$value);
}
if(!empty($_GET["GroupType"]))
{
	$sql="SELECT GroupType,Id from  FormulationGroup";
	$GroupTypeResult = mysqli_query($con,$sql);
	$Matirals->GroupType = array();
	$Matirals->GroupType = $GroupTypeResult->fetch_all(MYSQLI_ASSOC);

}
if(!empty($_GET["Master"]))
{
	$sql="SELECT Name FROM  Materials where Type='Master'";
	$Result = mysqli_query($con,$sql);
	$Matirals->MasterOptions = array();
	$Matirals->MasterOptions = $Result->fetch_all(MYSQLI_ASSOC);
}

if(!empty($_GET["Raw"]))
{
	$sql="SELECT Name FROM  Materials where Type='Raw'";
	$Result = mysqli_query($con,$sql);
	$Matirals->RawOptions = array();
	$Matirals->RawOptions = $Result->fetch_all(MYSQLI_ASSOC);
}




$FList =  json_encode($Matirals);
echo $FList;

mysqli_close($con);
?>

