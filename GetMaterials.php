<?php
// connect mysql server
$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) { 
    die('Could not connect: ' . mysql_error()); 
} 


$SBMatiralType = $_GET['SBMatiralType'];
$FormulationsList=[];

// select database
mysqli_select_db($con,"ChemistryTest");

$sql="SELECT A.*,C.GroupType from Materials as A , FormulationNameToGroup as B , FormulationGroup as C where A.Type=\"$SBMatiralType\" and A.Name=B.Name and B.Id=C.Id";
$result = mysqli_query($con,$sql);
$outp = array();
$outp = $result->fetch_all(MYSQLI_ASSOC);
foreach ($outp as $value)
{
	$sql=sprintf("SELECT A.Material2,A.Id from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Raw' and A.Material2=B.Name",$value['Name']);
        $resultRaw = mysqli_query($con,$sql);
	$outpRaw = array();
	$outpRaw = $resultRaw->fetch_all(MYSQLI_ASSOC);
	$value['Raw'] = [];
	$index =0;
	foreach ($outpRaw as $valueRaw)
	{
		$value['Raw'][$index] = $valueRaw['Material2'];
		$index++;
	}


	$sql=sprintf("SELECT A.Material2,A.Id from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Master' and A.Material2=B.Name",$value['Name']);
        $resultMaster = mysqli_query($con,$sql);
	$outpMaster = array();
	$outpMaster = $resultMaster->fetch_all(MYSQLI_ASSOC);
	$value['Master'] = [];
	$index =0;
	foreach ($outpMaster as $valueMaster)
	{
		$value['Master'][$index] = $valueMaster['Material2'];
		$index++;
	}
        array_push($FormulationsList,$value);
}
$FList =  json_encode($FormulationsList);
echo $FList;

?>

