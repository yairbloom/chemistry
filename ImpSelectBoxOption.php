
<style>
div {
    vertical-align: text-bottom;
}
</style>

  <div style='display: inline-block'> 
  <div style='display: inline-block'> 
  <h4 ><?php echo 'Available '.$SBMatiralType ?></h4>
  <select id=<?php echo 'Unselected'.$SBMatiralType ?>  style="height: 200px;width:140px" multiple="multiple" >


<?php
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

$sql="SELECT Name from  Materials where Type=\"$SBMatiralType\"";
$result = mysqli_query($con,$sql);
// play with return result array 
while($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
    $selectBoxOption .="<option value = '".$row[0]."'>".$row[0]."</option>"; 
}
mysqli_close($con);
// create select box tag with mysql result
echo $selectBoxOption;
?>
  </Select>
 </div>
  <div style='display: inline-block'> 
    <h4><?php echo 'Selected '.$SBMatiralType ?></h4>
  <select  id=<?php echo "Selected".$SBMatiralType ?>  multiple="multiple"    style="height: 200px;width:140px;margin-left:50px" name=<?php echo $SBMatiralType.'s[]' ?> >
  </Select>
 </div>
  <br>
  <input type="button" id=<?php echo $SBMatiralType."Left" ?>  value="  <  " style="width:68px" />
   <input type="button" id=<?php echo $SBMatiralType."Right" ?> value="  >  " style="width:68px"/>
   <input type="button" id=<?php echo $SBMatiralType."LeftAll" ?> value=" << " style="width:68px;margin-left:50px"/>
   <input type="button" id=<?php echo $SBMatiralType."RightAll" ?> value=" >> " style="width:68px"/>

  </div>

<script src="./jquery-2.2.3.min.js"></script>
<script>
$(function () { function moveItems(origin, dest) {
    $(origin).find(':selected').appendTo(dest);
}
 
function isSelectType(element) {
  return element.tagName == "SELECT";
}

function moveAllItems(origin, dest) {
    var lsit = $(origin).children();
    lsit.appendTo(dest);
}
 
$('#<?php echo $SBMatiralType."Left" ?>').click(function () {
    moveItems('#<?php echo "Selected".$SBMatiralType ?>', '#<?php echo 'Unselected'.$SBMatiralType ?>');
});
 
$('#<?php echo $SBMatiralType."Right" ?>').on('click', function () {
    moveItems('#<?php echo 'Unselected'.$SBMatiralType ?>', '#<?php echo "Selected".$SBMatiralType ?>');
});
 
$('#<?php echo $SBMatiralType."LeftAll" ?>').on('click', function () {
    moveAllItems('#<?php echo "Selected".$SBMatiralType ?>', '#<?php echo 'Unselected'.$SBMatiralType ?>');
});
 
$('#<?php echo $SBMatiralType."RightAll" ?>').on('click', function () {
    moveAllItems('#<?php echo 'Unselected'.$SBMatiralType ?>', '#<?php echo "Selected".$SBMatiralType ?>');
});

});
</script>


