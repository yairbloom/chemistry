 <?php include('Menu.html'); ?>
<style>
h4,h1 , .wrap {
    text-align: center;
}

</style>
   <h1 id="h11"> Define <?php echo $_GET['Type'] ?> Production Material </h1>
  <br>
  <br>
  <br>
<form id=ProductionForm action="SaveProductionData.php" method="GET">
    <div class='wrap'> 
            <h4 align="center" style="margin-top: 2em;">Select <?php echo $_GET['Type'] ?> Material</h4>
            <select id="Mat" Name="MatName" align="center" method="GET" onchange="SelectFunction(this.value);" placeholder="Select Material ..."  >
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
	<h3> Serial Id: </h3>
	<textarea rows="1" cols="16" text-align='center' name="SerialId" id="SerialId">
	</textarea>

        <br> 
	<h3> Quantity: </h3>
        <table align="center" style="width:10%">
        <tr>
        <th><input type="number" name="quantity" value="0" min="0" Max="10000"></th>
        <th><select id="quantity_type" placeholder="Milligram" >
        <option value=1>Milligram</option>
        <option value=2 >Milliliter</option>
        </select>
	</th>
        </tr>
        </table>
        <br> 

	<h3> Comments: </h3>
	<textarea rows="4" cols="100" name="Comment">
	Please enter your comment here.
	</textarea>
        <br> 

<br>
<p id="demo"></p>


</form> 
<script>
src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js">
  document.getElementById("Mat").onchange()

function myFunction() {
    document.getElementById("ProductionForm").submit();
}

function SelectFunction(str ) {
       type = "<?php echo $_GET['Type'];?>";
       $.ajax({
        url: 'GetMaterialsRecipe.php',
        type: 'GET',
        data: {Material:str , Type:type },
        success: function(result) {
            console.log("Data sent!");
            $("#demo").html(result);
        }
    });


}

</script>

<input id="SaveTheProdaction" type="button" onclick="myFunction()" value="Submit">
</div>
</body>
</html>
