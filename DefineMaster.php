 <?php include('Menu.html'); ?>
 <?php
$MatiralType = 'Master';
$MatiralFormName = 'MasterForm';
include 'DefineHeader.php';
?>
  </div>

  <div class="container">
<?php
$SBMatiralType = 'Raw';


include 'ImpSelectBoxOption.php';
?>
  <br>
  <br>
    <input type="button" onclick="myFunction()" value="Submit">
  </div>
</form> 

<script src="./jquery-2.2.3.min.js"></script>
<script>
function myFunction() {
    selectBox = document.getElementById("SelectedRaw");

    for (var i = 0; i < selectBox.options.length; i++) 
    { 
	    selectBox.options[i].selected = true;
    } 
    document.getElementById("MasterForm").submit();
}
</script>


</body>
</html>


