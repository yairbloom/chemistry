function PrintTable(response , FType , Masters , Raws){  
  var jsonObject = JSON.parse(response);
	var x ;
	var theadStr =  '<thead><th>Name</th>';
	if (FType)
		theadStr += '<th>Type</th>';
	if (Masters)
		theadStr += '<th>Masters</th>';
	if (Raws)
		theadStr += '<th>Raws</th>';
	theadStr +=
		'<th>Comment</th>'+
		'<th>Edit By</th>' +
		'<th>Last Edit</th>' +
		'<th>Edit</th>' +
		'<th>Delete</th>' +
		'<th>Prodaction</th>' +
		'<th>New</th>'+
		'</thead>';
	$('#mytable').append(theadStr);
        
                for (x in jsonObject) {
			var txt='<tr><td>';
			Now = new Date($.now());
			RawStr="";
			MasterStr="";

			if (Raws)
			{
				delimiter="";
				for (i in jsonObject[x].Raw) {
					RawStr+=delimiter + jsonObject[x].Raw[i];
					delimiter=",";
				}
			}
			if (Masters)
			{
				delimiter="";
				for (i in jsonObject[x].Master) {
					MasterStr+=delimiter +  jsonObject[x].Master[i];
					delimiter=",";
				}
			}

			txt += jsonObject[x].Name;
			txt += '</td><td>';
			if (FType)
			{
				txt += jsonObject[x].GroupType;
				txt += '</td><td>';
			}
			if (Masters)
			{
				txt += MasterStr;
				txt += '</td><td>';
			}
			if (Raws)
			{
				txt += RawStr;
				txt += '</td><td>';
			}
			txt += jsonObject[x].Comment;
			txt += '</td><td>';
			txt += "Yair";
			txt += '</td><td>';
			txt += Now.getHours() + ":" + Now.getMinutes() + ":" + Now.getSeconds();
			txt += '</td>';
			txt += '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" id="llaa"><span class="glyphicon glyphicon-pencil"></span></button></p></td>';
			txt += '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs mybtn-delete" data-title="Delete" data-toggle="modal" data-target="#delete"  data-yourparameter=' + jsonObject[x].Name + '><span class="glyphicon glyphicon-trash"></span></button></p></td>';
			txt += '<td><p data-placement="top" data-toggle="tooltip" title="Prodaction"><button class="btn btn-success btn-xs" data-title="Prodaction" data-toggle="modal" data-target="#instance" ><span class="glyphicon glyphicon-filter"></span></button></p></td>';

			txt += '<td></td>';
			$('#mytable').append(txt);
                 }
	         $('#mytable').append(' <tr>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td></td>' + 
                                      '<td><p data-placement="top" data-toggle="tooltip" title="New"><button class="btn btn btn-xs" data-title="New" data-toggle="modal" data-target="#new" ><span class="glyphicon glyphicon-plus"></span></button></p></td>' +
                                      '</tr>');

        $(".mybtn-delete").click(function(){
		$("#MyDelSpan").text("   Delete " + $(this).attr("data-yourparameter") + ". Are you sure?");
         })

}  


