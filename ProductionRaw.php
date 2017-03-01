 <?php include('Menu.html'); ?>
<style>
h4,h1 , .wrap {
    text-align: center;
}
</style>
   <h1 > Define Raw prodaction Material </h1>
  <br>
  <br>
  <br>
<form id=ProductionRaw action="SaveProductionRaw.php" method="GET">
    <div class='wrap'> 
            <h4 align="center" style="margin-top: 2em;">Select Raw Material</h4>
            <select id="size" align="center" Name="SelectedRaw"  placeholder="Select Raw Material ..."  >
<?php
// select box option tag

// connect mysql server
$con = mysqli_connect('localhost','chem','mistry','chemistry');
if (!$con) { 
    die('Could not connect: ' . mysql_error()); 
} 
$selectBoxOption="";
// select database
mysqli_select_db($con,"chemistry");
// fire mysql query

$sql="SELECT Name from  Materials where Type=\"Raw\"";
echo $sql;
$result = mysqli_query($con,$sql);
// play with return result array 
while($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
    echo "<option value = '".$row[0]."'>".$row[0]."</option>"; 
}

mysqli_close($con);
?>

        </select>
        <br> 
	<input type="button" onclick="myFunction()" value="Submit">
        </div>

</form> 
<script>
function myFunction() {
    document.getElementById("ProductionRaw").submit();
}
</script>



</body>
</html>
