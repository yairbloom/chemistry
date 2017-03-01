<!DOCTYPE html>
<html>
<body>

<?php
$SelectedRaw = $_GET['SelectedRaw'];



$con = mysqli_connect('localhost','chem','mistry','chemistry');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"chemistry");
$sql="SELECT coalesce(MAX(SerialNumber)+1, 1) AS MaxX  from  ProductionMaterials where Name='".$SelectedRaw."'";
$result = mysqli_query($con,$sql);
// play with return result array 
if($result && $row = mysqli_fetch_array($result , MYSQLI_NUM)){   
	$sql="INSERT INTO ProductionMaterials (Name,SerialNumber) VALUES('".$SelectedRaw."',".$row[0].")";
	$result = mysqli_query($con,$sql);
        echo "<h1> ".$SelectedRaw." Raw is Saved and got serial number:".$row[0]."</h1>";
}

mysqli_close($con);
?>
</body>
</html>

