<?php


function GetConnection()
{
	$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
	if (!$con) {
		$response->status = 'fail';
		$response->message = 'Error: database connection failure';   /* add custom message */ 
		echo json_encode($response);
	}
	else
		mysqli_select_db($con,"ChemistryTest");
	return $con;
}

function ConnectToDb()
{
	$con = GetConnection();
	if ($con) 
		if (! MysqliQuery($con , "START TRANSACTION"))
			return false;
	return $con;
}

function  MysqliQuery($con,$sql)
{
  if ( !mysqli_query($con,$sql)) {
	  $response->status = 'fail';

	  switch (mysqli_errno($con) ) {
	  case 1062:
		  $response->message = sprintf('Error: Matirial Name already exist');   /* add custom message */
		  break;

	  case 1451:
		  $response->message = sprintf("Error: Can't modify item since it used by another item");   /* add custom message */
		  break;
	  default:  $response->message = sprintf('Error: DB error  %d %s',mysqli_errno($con) ,mysqli_error($con));   /* add custom message */ 
	  }
	  echo json_encode($response);


	  mysqli_query($con,"ROLLBACK");
	  return false;
  }
  return true;
}


function  MysqliEnd($con)
{
	mysqli_query($con,"COMMIT");
	mysqli_close($con);
	$response->status = 'success'; /* match error string in jquery if/else */ 
	echo json_encode($response);
}

?>

