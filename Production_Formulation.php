<?php 

$ProjectId=0;
$Total=0;
$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) { 
	die('Could not connect: ' . mysql_error()); 
} 
// select database
mysqli_select_db($con,"ChemistryTest");
// fire mysql query

$sql="SELECT Id from  FormulationNameToGroup where Name='".$Material."'";
$result = mysqli_query($con,$sql);

if ($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
  $ProjectId=$row[0];

}

$SERIAL_PREF = $ProjectId.substr(date('Y'),-1).date("W",strtotime('+1 day')).date("N",strtotime('+1 day'))."_";
$sql="SELECT count(*)+1 from ProductionMaterials where Name=\"".$Material."\" and SerialNumber like \"".$SERIAL_PREF."%\"";
$result = mysqli_query($con,$sql);
if ($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
  $SERIAL_PREF=$SERIAL_PREF.$row[0];

}

mysqli_close($con);
$SERIAL=json_encode($SERIAL_PREF);

?>

