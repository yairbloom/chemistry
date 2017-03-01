<!DOCTYPE html>
<html>
<body>

<?php
$Name = $_GET['Name'];
$Comment = $_GET['Comment'];
$Ra = $_GET['Raws'];
$Ma = $_GET['Masters'];
$Type = $_GET['Type'];





$con = mysqli_connect('localhost','chem','mistry','chemistry');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"chemistry");
$sql="INSERT INTO Materials (Name,Comment,Type,Available) VALUES('".$Name."','".$Comment."','".$Type."',1)";
echo $sql;
$result = mysqli_query($con,$sql);
foreach(array_merge($Ra,$Ma) as $item) {
	$sql="INSERT INTO MaterialsRecipe (Material1,Material2) VALUES('".$Name."','".$item."')";
	$result = mysqli_query($con,$sql);
}
mysqli_close($con);
?>
</body>
</html>

