<?php

function ConnectToDb()
{
	$con = mysqli_connect('localhost2','chem','mistry','ChemistryTest');
	if (!$con) {
		$response_array->status = 'fail';
		$response_array->message = 'Error: database connection failure';   /* add custom message */ 
		echo json_encode($response_array);
	}
	else {
		mysqli_select_db($con,"ChemistryTest");
		if (! MysqliQuery($con , "START TRANSACTION"))
			return false;
	}
	return $con;



}

function  MysqliQuery($con,$sql)
{
  if ( !mysqli_query($con,$sql)) {
	  $response_array->status = 'fail';
	  $response_array->message = sprintf('Error: DB error  %d %s',mysqli_errno($con) ,mysqli_error($con));   /* add custom message */ 
	  echo json_encode($response_array);
	  mysqli_query($con,"ROLLBACK");
	  return false;
  }
  return true;
}

?>

