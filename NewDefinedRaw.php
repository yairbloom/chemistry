 <?php include('Menu.html'); ?>

<form id='RawForm' action="SaveToDB.php" method="GET" style="margin-left: 2em">
  <input type='hidden' name='Type' value='Raw' > 
   <h1 align="left"> New Defined Raw Material </h1>
  <br>
  <div id="myDIV">
  <h3> Raw name: </h3>
  <input type="text" name="Name">
  <br>
  </div>

  <h3> Comments: </h3>
  <textarea rows="4" cols="100" name="Comment">
  </textarea>
  <br>


<p id="BoDy"></p>

  <input type="button" onclick="myFunction()" value="Submit">
</form> 

<script>
var x = document.getElementById('myDIV');
x.style.display = 'none';
function myFunction() {
    document.getElementById("RawForm").submit();
}
</script>

</div>

</body>
</html>
