 <?php include('Menu.html'); ?>
 <?php
$MatiralType = 'Formulation';
$MatiralFormName = 'FormulationForm';
include 'DefineHeader.php';
?>

  <div class="container">
    <div class="row">
<?php
$SBMatiralType = 'Raw';
$MatiralColSizeType = 'col-sm-2';


include 'ImpSelectBoxOption.php';
?>
<?php
$SBMatiralType = 'Master';
$MatiralColSizeType = 'col-sm-2';


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


