 <?php include('Menu.html'); ?>
<style>
h4,h1 , .wrap {
    text-align: center;
}

</style>
   <h1 id="h11"> Define <?php echo $_GET['Type'] ?> prodaction Material </h1>
  <br>
  <br>
  <br>
<form id=ProductionForm action="SaveProductionData.php" method="GET">
    <div class='wrap'> 
            <h4 align="center" style="margin-top: 2em;">Select <?php echo $_GET['Type'] ?> Material</h4>
            <select id="Mat" Name="MatName" align="center" method="GET" onchange="SelectFunction(this.value)" placeholder="Select Material ..."  >
<?php

$Type = $_GET['Type'];
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

$sql="SELECT Name from  Materials where Type=\"$Type\"";
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
<br>
<p id="demo"></p>


</form> 
<script>
src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js">
  document.getElementById("Mat").onchange()

function myFunction() {
    document.getElementById("ProductionForm").submit();
}

function SelectFunction(str) {
       $.ajax({
        url: 'GetMaterialsRecipe.php',
        type: 'GET',
        data: {Material : str},
        success: function(result) {
            console.log("Data sent!");
            $("#demo").html(result);
        }
    });


}

</script>

</body>
</html>