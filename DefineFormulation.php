 <?php include('Menu.html'); ?>
 <?php
$MatiralType = 'Formulation';
$MatiralFormName = 'FormulationForm';
$TheHeadline = 'Define Formulation Material';
include 'DefineHeader.php';
?>
<h3> <?php echo $MatiralType ?> Type: </h3>
<select id="GroupType" Name="GroupTypeName" align="center" method="GET" placeholder="Select Material type..."  >
<?php

$Type = $_GET['Type'];
// select box option tag

// connect mysql server
$con = mysqli_connect('localhost','chem','mistry','chemistry');
if (!$con) { 
    die('Could not connect: ' . mysql_error()); 
} 
// select database
mysqli_select_db($con,"chemistry");
// fire mysql query

$sql="SELECT Name,Id from  FormulationGroup";
$result = mysqli_query($con,$sql);
// play with return result array 
while($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
    echo "<option value = '".$row[1]."'>".$row[0]."</option>"; 
}

mysqli_close($con);
?>


</select>
<br>

  </div>

    <div class="row">
<?php
$SBMatiralType = 'Raw';


include 'ImpSelectBoxOption.php';
for ($x = 0; $x <= 70; $x++) {
    echo "&nbsp;";
} 
?>


<?php
$SBMatiralType = 'Master';


include 'ImpSelectBoxOption.php';
?>

  <br>
  <br>
  <br>
  <div class="col-sm-4">
    <div class="row">
    <input type="button" onclick="myFunction()" value="Submit">
  </div>
</form> 

<script>
function myFunction() {
    selectBox = document.getElementById("SelectedRaw");

    for (var i = 0; i < selectBox.options.length; i++) 
    { 
	    selectBox.options[i].selected = true;
    } 
    selectBox = document.getElementById("SelectedMaster");

    for (var i = 0; i < selectBox.options.length; i++) 
    { 
	    selectBox.options[i].selected = true;
    }

    document.getElementById("FormulationForm").submit();
}
</script>


</body>
</html>


