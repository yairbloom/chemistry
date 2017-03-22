<form id=<?php echo $MatiralFormName ?> action="SaveToDB.php" method="GET" style="margin-left: 2em">
  <input type='hidden' name='Type' value=<?php echo $MatiralType ?> > 
   <h1 align="left"> <?php echo $TheHeadline  ?> </h1>
  <br>
  <h3> <?php echo $MatiralType ?> name: </h3>
  <input type="text" name="Name">
  <br>

  <h3> Comments: </h3>
  <textarea rows="4" cols="100" name="Comment">
  Please enter your comment here.
  </textarea>
  <br>

