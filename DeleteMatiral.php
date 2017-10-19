<?php
$Name = $_GET['MatiralName'];



$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) {
	$response_array->status = 'fail';
	$response_array->message = 'Error: database connection failure';   /* add custom message */ 
	echo json_encode($response_array);
	return;
}

mysqli_select_db($con,"ChemistryTest");
$sql="DELETE FROM Materials WHERE Name='".$Name."'";
$result = mysqli_query($con,$sql);


$sql="DELETE FROM MaterialsRecipe where Material1='".$Name."' OR Material2='".$Name."'";
$result = mysqli_query($con,$sql);

echo $sql;

mysqli_close($con);



?>

