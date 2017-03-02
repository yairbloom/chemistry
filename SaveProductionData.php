<!DOCTYPE html>
<html>
<body>

<?php
$MatName = $_GET['MatName'];
$TotalMaterials = $_GET['TotalMaterials'];



$con = mysqli_connect('localhost','chem','mistry','chemistry');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"chemistry");
$sql="SELECT coalesce(MAX(SerialNumber)+1, 1) AS MaxX  from  ProductionMaterials where Name='".$MatName."'";
$result = mysqli_query($con,$sql);
// play with return result array 
if($result && $row = mysqli_fetch_array($result , MYSQLI_NUM)){   
	$sql="INSERT INTO ProductionMaterials (Name,SerialNumber) VALUES('".$MatName."',".$row[0].")";
	$result = mysqli_query($con,$sql);
        echo "<h1> Production instance of ".$MatName." is Saved and got serial number:".$row[0]."</h1>";
}



for ($x = 1; $x <= $TotalMaterials; $x++) {
    eval("\$Rsn = \$_GET[\"Rsn_$x\"];");
    eval("\$RecipeId = \$_GET[\"RecipeId_$x\"];");
    echo $Rsn;
    echo $RecipeId;
}

mysqli_close($con);
?>
</body>
</html>

