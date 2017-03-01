<!DOCTYPE html>
<html>
<body>

<style>
.floating-box {
      display: inline-block;
      width: 150px;
      height: 75px;
      margin: 10px;
      border: 3px solid #73AD21;  
}

</style>


<?php
$Material = $_GET['Material'];

    $con = mysqli_connect('localhost','chem','mistry','chemistry');
    if (!$con) { 
	    die('Could not connect: ' . mysql_error()); 
    } 
    // select database
    mysqli_select_db($con,"chemistry");
    // fire mysql query

    $sql="SELECT Material2 from  MaterialsRecipe where Material1='".$Material."'";
    $result = mysqli_query($con,$sql);
    // play with return result array 
    $str1 ="";
    while($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
	    printf("<div class='floating-box'>"); 
	    printf("<div style='display: inline-block' align='center'> <h5 style='margin: 10px'>%s</h5> </div>", $row[0]); 
	    printf("<div style='display: inline-block' align='center'> <select>");
            $sql="select SerialNumber from ProductionMaterials where name='".$row[0]."'";
	    $result2 = mysqli_query($con,$sql);
	    while($row2 = mysqli_fetch_array($result2 , MYSQLI_NUM)){   
              printf("<option>%s</option>", $row2[0]);
            }
            printf("</select> </div>");
            printf("</div>");
    }
mysqli_close($con);

?>

</body>
</html>
