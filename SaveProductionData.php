<!DOCTYPE html>
<html>
<body>

<?php
$MatName = $_GET['MatName'];
$TotalMaterials = $_GET['TotalMaterials'];
$Comment = $_GET['Comment'];
$SerialId = $_GET['SerialId'];

include('Menu.html');

$con = mysqli_connect('localhost','chem','mistry','chemistry');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"chemistry");
$sql="INSERT INTO ProductionMaterials (Name,SerialNumber,Comment) VALUES('".$MatName."','".$SerialId."','".$Comment."')";
$result = mysqli_query($con,$sql);

printf("<script > what(); function what(){");
if ($result === TRUE)
	printf("document.getElementById(\"BoDy\").innerHTML = \"<h1>Production instance of %s is Saved and got serial number: %s</h1>\"" , $MatName , $SerialId);
else
         printf("document.getElementById(\"BoDy\").innerHTML = \"<h1> Error on saving Production instance of %s %s</h1>\"", $MatName , mysql_error($con ));
printf("};</script >");



for ($x = 1; $x <= $TotalMaterials; $x++) {
    eval("\$Rsn = \$_GET[\"Rsn_$x\"];");
    eval("\$RecipeId = \$_GET[\"RecipeId_$x\"];");
    $sql="INSERT INTO ProductionRecipe (Id , Material1SN , Material2SN) VALUES(".$RecipeId.",".$row[0].",".$Rsn.")";
    echo "<br>";
    $result = mysqli_query($con,$sql);
}

mysqli_close($con);


?>
</body>
</html>

