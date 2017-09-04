
function PrintTable(response , FType , Masters , Raws){  
  var MatiralsJson = JSON.parse(response);
  var MatList = MatiralsJson.MatList;
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
		'<th>Matiral Actions</th>' +
		'<th>New</th>'+
		'</thead>';
	$('#mytable').append(theadStr);
        
	        var NewItemRow='<tr><td>';
	        if (FType) 
		  NewItemRow+='</td><td>';
	        if (Raws) 
		  NewItemRow+='</td><td>';
	        if (Masters) 
		  NewItemRow+='</td><td>';
	        NewItemRow+='<td></td><td></td><td></td><td></td><td><p data-placement="top" data-toggle="tooltip" title="New">';
	        NewItemRow+='<button class="btn btn btn-xs mybtn-new" data-title="New" data-toggle="modal" data-target="#NewMatiral" ><span class="glyphicon glyphicon-plus"></span></button></p></td></tr>';
	         $('#mytable').append(NewItemRow);

                for (x in MatList) {
			var txt='<tr><td>';
			Now = new Date($.now());
			RawStr="";
			MasterStr="";

			if (Raws)
			{
				delimiter="";
				for (i in MatList[x].Raw) {
					RawStr+=delimiter + MatList[x].Raw[i];
					delimiter=",";
				}
			}
			if (Masters)
			{
				delimiter="";
				for (i in MatList[x].Master) {
					MasterStr+=delimiter +  MatList[x].Master[i];
					delimiter=",";
				}
			}

			txt += MatList[x].Name;
			txt += '</td><td>';
			if (FType)
			{
				txt += MatList[x].GroupType;
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
			txt += MatList[x].Comment;
			txt += '</td><td>';
			txt += "Yair";
			txt += '</td><td>';
			txt += Now.getHours() + ":" + Now.getMinutes() + ":" + Now.getSeconds();
			txt += '</td>';
			txt += '<td><div class="btn-group">';
		        txt += '<button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" data-placement="top" data-toggle="tooltip" title="Edit">';
			txt += '<span class="glyphicon glyphicon-pencil"></span></button>';
			txt += '<button class="btn btn-danger btn-xs mybtn-delete" data-title="Delete" data-toggle="modal" data-target="#delete"  data-yourparameter=';
			txt += MatList[x].Name; 
			txt += ' data-placement="top" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></button>';
			txt += '<button class="btn btn-success btn-xs" data-title="Prodaction" data-toggle="modal" data-target="#Prodaction" data-placement="top" data-toggle="tooltip" title="Prodaction">';
			txt += '<span class="glyphicon glyphicon-filter"></span></button></td>';
			txt += '<td></td>';
			$('#mytable').append(txt);
                 }

        $(".mybtn-delete").click(function(){
		$("#MyDelSpan").html("    Are you sure you want to delete  " + $(this).attr("data-yourparameter") + " item ?");
		$("#DelSpanHeadline").text("Deleting  " + $(this).attr("data-yourparameter"));
         })
	$(".mybtn-new").click(function(){
		var GroupType = MatiralsJson.GroupType;
		var MasterOptions = MatiralsJson.MasterOptions;
		var RawOptions = MatiralsJson.RawOptions;
		var OptionList =''; 

		if (FType) {
			$("#GroupsTypeDiv").removeClass('hidden');
			for (x in GroupType) 
				OptionList+='<option>' + GroupType[x].GroupType + '</option>';
			$("#GroupsTypeSelect").html(OptionList);
		}
                if (Masters) {
			$("#MasterDiv").removeClass('hidden');
			for (x in MasterOptions) 
				$("#MasterSelect").append('<option>' + MasterOptions[x].Name + '</option>');
			$("#MasterSelect").trigger("chosen:updated");
		}
		if (Raws) {
			$("#RawDiv").removeClass('hidden');
			for (x in RawOptions) 
				$("#RawSelect").append('<option>' + RawOptions[x].Name + '</option>');
			$("#RawSelect").trigger("chosen:updated");
		}



	})

}  


