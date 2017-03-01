 <?php include('Menu.html'); ?>
<style>
h4,h1 , .wrap {
    text-align: center;
}

</style>
   <h1 id="h11"> Define Raw prodaction Material </h1>
  <br>
  <br>
  <br>
<form id=ProductionFormulation action="SaveProductionRaw.php" method="GET">
    <div class='wrap'> 
            <h4 align="center" style="margin-top: 2em;">Select Raw Material</h4>
            <select id="Mat" align="center" method="GET" onchange="SelectFunction(this.value)" placeholder="Select Raw Material ..."  >
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

$sql="SELECT Name from  Materials where Type=\"Formulation\"";
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
    document.getElementById("ProductionFormulation").submit();
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
