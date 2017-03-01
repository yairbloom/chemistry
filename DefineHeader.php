<form id=<?php echo $MatiralFormName ?> action="SaveToDB.php" method="GET">
  <input type='hidden' name='Type' value=<?php echo $MatiralType ?>/> 
  <div class="container">
  <br>
  <br>
  <br>
   <h1 align="center"> Define <?php echo $MatiralType ?> Material </h1>
  <br>
  <br>
  <h3> <?php echo $MatiralType ?> name: </h3>
  <input type="text" name="Name">
  <br>
  <br>
  <h3> Comments: </h3>
  <textarea rows="4" cols="100" name="Comment">
  Please enter your comment here.
  </textarea>
  <br>
  <br>
  </div>

