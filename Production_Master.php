<?php 
$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) { 
	die('Could not connect: ' . mysql_error()); 
} 
// select database
mysqli_select_db($con,"ChemistryTest");
// fire mysql query

$sql="SELECT count(*)+1 from ProductionMaterials where Name=\"".$Material."\"";
$result = mysqli_query($con,$sql);
if ($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
  $SERIAL_PREF=$row[0];

}

mysqli_close($con);
$SERIAL=json_encode($SERIAL_PREF);

?>

