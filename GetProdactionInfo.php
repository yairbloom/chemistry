<?php

$MatiralName = $_GET['MatiralName'];
$MatiralType = $_GET['MatiralType']; 
$ProductionList->InstancesList=[];
$ProductionList->RecipeOptionRaw=[];
$ProductionList->RecipeOptionMaster=[];
$ProductionList->Candidate='1';
$ProjectId=0;
$Total=0;

include 'PhpUtils.php';
$con = GetConnection();
if (! $con)
	return;


$sql="SELECT Id,SerialNumber,Comment,Quantity,QuantityType,LastModify from ProductionMaterials where Name='".$MatiralName."'";
$result = mysqli_query($con,$sql);
$SnInfo = array();
$SnInfo = $result->fetch_all(MYSQLI_ASSOC);
foreach ($SnInfo as $value)
{
	$sql="SELECT A.Name as MaterialName,A.SerialNumber as MaterialSN,D.Type FROM ProductionMaterials as A,ProductionRecipe as B,Materials as D ";
	$sql= sprintf("%s where A.Id=B.Production2Id and B.Production1Id=%d and A.Name=D.Name",$sql , $value['Id']);
	$ResultRecipe = mysqli_query($con,$sql);
	$ResultRecipeItems = array();
	$ResultRecipeItems = $ResultRecipe->fetch_all(MYSQLI_ASSOC);
	$RawIndex=0;
	$MasterIndex=0;
	foreach ($ResultRecipeItems as $RecipeItem)
	{
		if ($RecipeItem['Type'] == "Raw")
			$value['Raw'][$RawIndex++] = $RecipeItem;
		else if ($RecipeItem['Type'] == "Master")
			$value['Master'][$MasterIndex++] = $RecipeItem;
	}
	array_push($ProductionList->InstancesList,$value);

}

if(!empty($_GET["Raw"]))
{
	$sql=sprintf("SELECT A.Material2 from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Raw' and A.Material2=B.Name",$MatiralName);
	$resultRawRecipe = mysqli_query($con,$sql);
	$outpRawRecipe = $resultRawRecipe->fetch_all(MYSQLI_ASSOC);
	$index =0;
	foreach ($outpRawRecipe as $valueRawRecipe)
	{
		$sql=sprintf("SELECT SerialNumber from ProductionMaterials where Name='%s'",$valueRawRecipe['Material2']);
		$resultRawInstance = mysqli_query($con,$sql);
		$outpRawInstance = $resultRawInstance->fetch_all(MYSQLI_ASSOC);
		$ProductionList->RecipeOptionRaw[$index]->Instances= [];
		$ProductionList->RecipeOptionRaw[$index]->MatiralName=$valueRawRecipe['Material2'];
		$RawInstanceindex =0;
		foreach ($outpRawInstance as $vri)
		{
			$ProductionList->RecipeOptionRaw[$index]->Instances[$RawInstanceindex] = $vri['SerialNumber'];
			$RawInstanceindex++;
		}
	$index++;
	}


}

if(!empty($_GET["Master"]))
{
	$sql=sprintf("SELECT A.Material2 from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Master' and A.Material2=B.Name",$MatiralName);
	$resultMasterRecipe = mysqli_query($con,$sql);
	$outpMasterRecipe = $resultMasterRecipe->fetch_all(MYSQLI_ASSOC);
	$index =0;
	foreach ($outpMasterRecipe as $valueMasterRecipe)
	{
		$sql=sprintf("SELECT SerialNumber from ProductionMaterials where Name='%s'",$valueMasterRecipe['Material2']);
		$resultMasterInstance = mysqli_query($con,$sql);
		$outpMasterInstance = $resultMasterInstance->fetch_all(MYSQLI_ASSOC);
		$ProductionList->RecipeOptionMaster[$index]->Instances= [];
		$ProductionList->RecipeOptionMaster[$index]->MatiralName=$valueMasterRecipe['Material2'];
		$MasterInstanceindex =0;
		foreach ($outpMasterInstance as $vri)
		{
			$ProductionList->RecipeOptionMaster[$index]->Instances[$MasterInstanceindex] = $vri['SerialNumber'];
			$MasterInstanceindex++;
		}
	$index++;
	}

}

if ($MatiralType === 'Formulation') { 
	$sql="SELECT Id from  FormulationNameToGroup where Name='".$MatiralName."'";
	$result = mysqli_query($con,$sql);

	if ($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
		$ProjectId=$row[0];

	}

	$SERIAL_PREF = $ProjectId.substr(date('Y'),-1).date("W",strtotime('+1 day')).date("N",strtotime('+1 day'))."_";
	$sql="SELECT count(*)+1 from ProductionMaterials where Name=\"".$MatiralName."\" and SerialNumber like \"".$SERIAL_PREF."%\"";
	$result = mysqli_query($con,$sql);
	if ($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
		$ProductionList->Candidate=$SERIAL_PREF.$row[0];

	}
}
else {
	$sql="SELECT count(*)+1 from ProductionMaterials where Name=\"".$MatiralName."\"";
	$result = mysqli_query($con,$sql);
	if ($row = mysqli_fetch_array($result , MYSQLI_NUM) ){   
		if ($row[0])
			$ProductionList->Candidate=$row[0];
	}
}



mysqli_close($con);
$ProductionList->status = 'success'; /* match error string in jquery if/else */ 
echo json_encode($ProductionList );
?>

