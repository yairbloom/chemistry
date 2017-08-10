
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
$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) { 
    die('Could not connect: ' . mysql_error()); 
} 
// select database
mysqli_select_db($con,"ChemistryTest");
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
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script src="http://harvesthq.github.io/chosen/chosen.jquery.js"></script>
  </div>
<div id="test1"><p >This is a raph.</p></div>

  <form>
    <div id="container">
      <div id="content">
 <div>
          <em>Multiple Select with Groups</em>
          <select data-placeholder="Your Favorite Football Team" class="chosen-select" multiple tabindex="6">
            <option value=""></option>
            <optgroup label="NFC EAST">
              <option>Dallas Cowboys</option>
              <option>New York Giants</option>
              <option>Philadelphia Eagles</option>
              <option>Washington Redskins</option>
            </optgroup>
            <optgroup label="NFC NORTH">
              <option>Chicago Bears</option>
              <option>Detroit Lions</option>
              <option>Green Bay Packers</option>
              <option>Minnesota Vikings</option>
            </optgroup>
            <optgroup label="NFC SOUTH">
              <option>Atlanta Falcons</option>
              <option>Carolina Panthers</option>
              <option>New Orleans Saints</option>
              <option>Tampa Bay Buccaneers</option>
            </optgroup>
            <optgroup label="NFC WEST">
              <option>Arizona Cardinals</option>
              <option>St. Louis Rams</option>
              <option>San Francisco 49ers</option>
              <option>Seattle Seahawks</option>
            </optgroup>
            <optgroup label="AFC EAST">
              <option>Buffalo Bills</option>
              <option>Miami Dolphins</option>
              <option>New England Patriots</option>
              <option>New York Jets</option>
            </optgroup>
            <optgroup label="AFC NORTH">
              <option>Baltimore Ravens</option>
              <option>Cincinnati Bengals</option>
              <option>Cleveland Browns</option>
              <option>Pittsburgh Steelers</option>
            </optgroup>
            <optgroup label="AFC SOUTH">
              <option>Houston Texans</option>
              <option>Indianapolis Colts</option>
              <option>Jacksonville Jaguars</option>
              <option>Tennessee Titans</option>
            </optgroup>
            <optgroup label="AFC WEST">
              <option>Denver Broncos</option>
              <option>Kansas City Chiefs</option>
              <option>Oakland Raiders</option>
              <option>San Diego Chargers</option>
            </optgroup>
          </select>
        </div>
      </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.js" type="text/javascript"></script>
  <script src="chosen/chosen.jquery.js" type="text/javascript"></script>
  <script src="chosen/docsupport/prism.js" type="text/javascript" charset="utf-8"></script>
  <script src="chosen/docsupport/init.js" type="text/javascript" charset="utf-8"></script>
  </form>
      </div>
      </div>
<?php
$SBMatiralType = 'Raw';


include 'ImpSelectBoxOption.php';
for ($x = 0; $x <= 50; $x++) {
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

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
/document.getElementById("").innerHTML = person;
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

$(document).ready(function(){
        $("#test1").hide();
});

</script>


</body>
</html>

