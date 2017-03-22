 <?php include('Menu.html'); ?>
 <?php
$MatiralType = 'Raw';
$MatiralFormName = 'RawForm';
$TheHeadline = 'Add Raw Matiral';
include 'DefineHeader.php';
?>

<p id="BoDy"></p>

  <input type="button" onclick="myFunction()" value="Submit">
</form> 

<script>
function myFunction() {
    document.getElementById("RawForm").submit();
}
</script>

</div>

</body>
</html>
