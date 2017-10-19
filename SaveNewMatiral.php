<?php
$Name = $_GET['Name'];
$Comment = $_GET['Comment'];
$Ra = $_GET['RawsList'];
$groupTypeName = $_GET['GroupTypeName'];

if (empty($Ra )) {
  $Ra=[];
}

$Ma = $_GET['MastersList'];


if (empty($Ma )) {
  $Ma=[];
}
$Type = $_GET['MatiralType'];

include 'PhpUtils.php';

$response_array->status = 'success'; /* match error string in jquery if/else */ 


$con = ConnectToDb();
if (! $con)
	return;


$sql="INSERT INTO Materials (Name,Comment,Type,Available) VALUES('".$Name."','".$Comment."','".$Type."',1)";
if ( !mysqli_query($con,$sql)) {
	$response_array->status = 'fail';
	switch (mysqli_errno($con) ) {
	case 1062:
		$response_array->message = sprintf('Error: Matirial Name already exist');   /* add custom message */
		break;
	default:  $response_array->message = sprintf('Error: DB error  %d %s',mysqli_errno($con) ,mysqli_error($con));   /* add custom message */ 
	}
	echo json_encode($response_array);
	return;
}


if ($Type == "Formulation") {
  $sql="INSERT INTO FormulationNameToGroup (Name,Id) VALUES('".$Name."',".$groupTypeName.")";
  if ( !MysqliQuery($con,$sql)) 
	  return;
}

foreach(array_merge($Ra,$Ma) as $item) {
	$sql="INSERT INTO MaterialsRecipe (Material1,Material2) VALUES('".$Name."','".$item."')";
	if ( !mysqli_query($con,$sql)) {
		$response_array->status = 'fail';
		$response_array->message = sprintf('Error: DB error  %d %s',mysqli_errno($con) ,mysqli_error($con));   /* add custom message */ 
		echo json_encode($response_array);
		return;
	}
}


echo json_encode($response_array);

mysqli_close($con);


?>

