<!DOCTYPE html>
<html>
<body>

<?php
$Name = $_GET['Name'];
$Comment = $_GET['Comment'];
$Ra = $_GET['Raws'];
$groupTypeName = $_GET['GroupTypeName'];

if (empty($Ra )) {
  $Ra=[];
}

$Ma = $_GET['Masters'];


if (empty($Ma )) {
  $Ma=[];
}
$Type = $_GET['Type'];



include('Menu.html');



$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ChemistryTest");
$sql="INSERT INTO Materials (Name,Comment,Type,Available) VALUES('".$Name."','".$Comment."','".$Type."',1)";
$result = mysqli_query($con,$sql);

if ($Type == "Formulation") {
  $sql="INSERT INTO FormulationNameToGroup (Name,Id) VALUES('".$Name."',".$groupTypeName.")";
  $result = mysqli_query($con,$sql);
}

foreach(array_merge($Ra,$Ma) as $item) {
	$sql="INSERT INTO MaterialsRecipe (Material1,Material2) VALUES('".$Name."','".$item."')";
	$result = mysqli_query($con,$sql);
}
mysqli_close($con);

printf("<script >document.getElementById(\"BoDy\").innerHTML = \"<h1>%s %s is saved successfully</h1>\"</script>",$Name , $Type );

?>

</body>
</html>

