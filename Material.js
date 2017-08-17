function PrintTable(response){  
  var jsonObject = JSON.parse(response);
	        var x ;
			$('#mytable').append('<thead>' +
				'<th>Formulation Name</th>' +
				'<th>Formulation Type</th>' +
				'<th>Masters</th>' +
				'<th>Raws</th>' +
				'<th>Comment</th>'+
				'<th>Edit By</th>' +
				'<th>Last Edit</th>' +
				'<th>Edit</th>' +
				'<th>Delete</th>' +
				'<th>Prodaction</th>' +
				'<th>New</th>'+
				'</thead>');
        
                for (x in jsonObject) {
			var txt='<tr><td>';
			Now = new Date($.now());
			RawStr="";
			MasterStr="";
			delimiter="";
			for (i in jsonObject[x].Raw) {
				RawStr+=delimiter + jsonObject[x].Raw[i];
				delimiter=",";
			}
			delimiter="";
			for (i in jsonObject[x].Master) {
				MasterStr+=delimiter +  jsonObject[x].Master[i];
				delimiter=",";
			}


			txt += jsonObject[x].Name;
			txt += '</td><td>';
			txt += jsonObject[x].GroupType;
			txt += '</td><td>';
			txt += MasterStr;
			txt += '</td><td>';
			txt += RawStr;
			txt += '</td><td>';
			txt += jsonObject[x].Comment;
			txt += '</td><td>';
			txt += "Yair";
			txt += '</td><td>';
			txt += Now.getHours() + ":" + Now.getMinutes() + ":" + Now.getSeconds();
			txt += '</td>';
			txt += '<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>';
			txt += '<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>';
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

}  
