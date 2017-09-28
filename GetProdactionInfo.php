<?php
// connect mysql server
$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) { 
    die('Could not connect: ' . mysql_error()); 
} 


$MatiralName = $_GET['MatiralName'];
$MatiralType = $_GET['MatiralType']; 
$ProductionList->InstancesList=[];
$ProductionList->RecipeOptionRaw=[];
$ProductionList->RecipeOptionMaster=[];
$ProductionList->Candidate='1';
$ProjectId=0;
$Total=0;

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
		$sql=sprintf("select A.Material2SN as MaterialSN ,B.Material2 as MaterialName from ProductionRecipe as A,MaterialsRecipe as B, Materials as C where A.Material1SN='%s' and A.Id=B.Id and B.Material2=C.Name and C.Type='Raw' and B.Material1='%s'",$value['SerialNumber'],$MatiralName);
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
		$sql=sprintf("select A.Material2SN as MaterialSN ,B.Material2 as MaterialName from ProductionRecipe as A,MaterialsRecipe as B, Materials as C where A.Material1SN='%s' and A.Id=B.Id and B.Material2=C.Name and C.Type='Master' and B.Material1='%s'",$value['SerialNumber'] , $MatiralName);
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
echo json_encode($ProductionList );
?>

