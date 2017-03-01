      <div class=<?php echo $MatiralColSizeType ?>>
  <h4><?php echo 'Unselected '.$SBMatiralType ?></h4>
  <select id=<?php echo 'Unselected'.$SBMatiralType ?>  multiple="multiple"  size="10" style="width:140" >


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
  <div class=<?php echo $MatiralColSizeType ?>>
    <input type="button" id=<?php echo $SBMatiralType."Left" ?>  value="  <  " />
  <br>
    <input type="button" id=<?php echo $SBMatiralType."Right" ?> value="  >  " />
  <br>
    <input type="button" id=<?php echo $SBMatiralType."LeftAll" ?> value=" << " />
  <br>
    <input type="button" id=<?php echo $SBMatiralType."RightAll" ?> value=" >> " />
  </div>
    <div class="col-sm-2">
  <h4><?php echo 'Selected '.$SBMatiralType ?></h4>
  <select id=<?php echo "Selected".$SBMatiralType ?>  multiple="multiple"   size="10" style="width:140" name=<?php echo $SBMatiralType.'s[]' ?> >
  </Select>
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


