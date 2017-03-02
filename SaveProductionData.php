<!DOCTYPE html>
<html>
<body>

<?php
$MatName = $_GET['MatName'];
$TotalMaterials = $_GET['TotalMaterials'];
$Comment = $_GET['Comment'];


$con = mysqli_connect('localhost','chem','mistry','chemistry');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"chemistry");
$sql="SELECT coalesce(MAX(SerialNumber)+1, 1) AS MaxX  from  ProductionMaterials where Name='".$MatName."'";
$result = mysqli_query($con,$sql);
// play with return result array 
if($result && $row = mysqli_fetch_array($result , MYSQLI_NUM)){   
	$sql="INSERT INTO ProductionMaterials (Name,SerialNumber,Comment) VALUES('".$MatName."',".$row[0].",'".$Comment."')";
	$result = mysqli_query($con,$sql);
        echo "<h1> Production instance of ".$MatName." is Saved and got serial number:".$row[0]."</h1>";
}



for ($x = 1; $x <= $TotalMaterials; $x++) {
    eval("\$Rsn = \$_GET[\"Rsn_$x\"];");
    eval("\$RecipeId = \$_GET[\"RecipeId_$x\"];");
    $sql="INSERT INTO ProductionRecipe (Id , Material1SN , Material2SN) VALUES(".$RecipeId.",".$row[0].",".$Rsn.")";
    echo $sql;
    echo "<br>";
    $result = mysqli_query($con,$sql);
}

mysqli_close($con);
?>
</body>
</html>

