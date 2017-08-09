<!DOCTYPE html>
<html>
<body>

<style>
table.Serialtable {
	border-collapse: collapse;
        border=1;
width: 43.4%;
}

th.Serialtable, td.Serialtable {
	text-align: center;
padding: 8px;
}

tr.Serialtable:nth-child(even){background-color: #f2f2f2}

th.Serialtable {
	background-color: gray;
        color: white;
}

select.Serialtable {
        width: 150px;
}
</style>

<?php
$Material = $_GET['Material'];
$SERIAL = $_GET['SERIAL'];


echo "<script> document.getElementById(\"SaveTheProdaction\").disabled = false   </script>";
$con = mysqli_connect('localhost','chem','mistry','ChemistryTest');
if (!$con) { 
	die('Could not connect: ' . mysql_error()); 
} 
// select database
mysqli_select_db($con,"ChemistryTest");
// fire mysql query

//$sql="SELECT Material2,Id from  MaterialsRecipe where Material1='".$Material."'";
$sql=sprintf("SELECT A.Material2,A.Id from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Raw' and A.Material2=B.Name",$Material);
$result1 = mysqli_query($con,$sql);
$RawSize = mysqli_num_rows($result1);

$sql=sprintf("SELECT A.Material2,A.Id from  MaterialsRecipe AS A,Materials as B where Material1='%s' and B.Type='Master' and A.Material2=B.Name",$Material);
$result2 = mysqli_query($con,$sql);
$MasterSize = mysqli_num_rows($result2);

$MaxS =  max($RawSize , $MasterSize);
printf ("<input type='hidden' name='TotalMaterials' value=%d>",$MasterSize+$RawSize); 
if ($MaxS>0) {

	printf("<h3> Recipe: </h3>");
	// play with return result array 
	$Count = 1;
	printf("<table class='Serialtable'>");
        printf("<tr class='Serialtable'>");
        if ($RawSize > 0)
		printf("<th class='Serialtable'>Raw</th><th class='Serialtable'>Serial<br>Number</th>");
        if ($MasterSize > 0)
		printf("<th class='Serialtable'>Master</th><th class='Serialtable'>Serial<br>Number</th>");
        printf("</tr>");
        


        for ($index = 0; $index < $MaxS; $index++) {
		printf("<tr class='Serialtable'>");
                foreach (array($result1 , $result2) as &$result) {
		if ($row = mysqli_fetch_array($result , MYSQLI_NUM)){   
			printf ("<input type='hidden' name='RecipeId_%d' value=%d>",$Count,$row[1]); 
			printf("<td class='Serialtable'>%s</td>", $row[0]); 

			$sql="select SerialNumber from ProductionMaterials where name='".$row[0]."'";
			$result3 = mysqli_query($con,$sql);
			if (mysqli_num_rows($result3)>0) {
				printf("<td class='Serialtable'><select class='Serialtable' name='Rsn_%d' ' >",$Count);
				while($row2 = mysqli_fetch_array($result3 , MYSQLI_NUM)){   
					printf("<option>%s</option>", $row2[0]);
				}
			}

			else {
				printf("<td class='Serialtable'>%s</td>", "Not exist please define it."); 
				echo "<script> document.getElementById(\"SaveTheProdaction\").disabled = true   </script>";
			}
			printf("</select>");
			printf("</td>");

		}
		else if (mysqli_num_rows($result)) 
			printf("<td class='Serialtable'></td><td class='Serialtable'></td>"); 
		$Count = $Count +1;
                }
		printf("</tr>");
	}
	printf("</table>");
}
mysqli_close($con);
$INCLUDE = 'Production_'.$_GET['Type'].'.php';
include $INCLUDE;;
echo "<script> document.getElementById(\"SerialId\").innerHTML = $SERIAL   </script>";


?>

</body>
<br>
<br>
<br>
</html>
