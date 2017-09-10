
function PrintTable(response , FType , Masters , Raws , MatiralType){  
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
			txt += MatList[x].LastModify;
			txt += '</td>';
			txt += '<td><div class="btn-group">';
		        txt += '<button class="btn btn-primary btn-xs mybtn-edit" data-title="Edit" data-toggle="modal" data-target="#EditMatiral" data-placement="top" data-toggle="tooltip" title="Edit">';
			txt += '<span class="glyphicon glyphicon-pencil"></span></button>';
			txt += '<button class="btn btn-danger btn-xs mybtn-delete" data-title="Delete" data-toggle="modal" data-target="#DeleteMatiral"';
			txt += ' data-placement="top" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></button>';
			txt += '<button class="btn btn-success btn-xs" data-title="Prodaction" data-toggle="modal" data-target="#Prodaction" data-placement="top" data-toggle="tooltip" title="Prodaction">';
			txt += '<span class="glyphicon glyphicon-filter"></span></button></td>';
			txt += '<td></td>';
			$('#mytable').append(txt);
                 }

        $(".mybtn-delete").click(function(){

		var MatiralName = $(this).parentsUntil("tr").parent().find("td:eq(0)").text();
 		$("#MyDelSpan").html("    Are you sure you want to delete  " + MatiralName);
		$("#DelSpanHeadline").text("Deleting  " + MatiralName);
		$("#DeleteMatiral").attr("data-MatiralName" , MatiralName);
         })
	$(".mybtn-new").click(function(){
		var GroupType = MatiralsJson.GroupType;
		var MasterOptions = MatiralsJson.MasterOptions;
		var RawOptions = MatiralsJson.RawOptions;
		var OptionList =''; 
		$("#NewMatiralHeading").text('New '+ $("#MenuContent").attr("data-Matiral-type"));

		if (FType) {
			$("#NewGroupsTypeDiv").removeClass('hidden');
			for (x in GroupType) 
				OptionList+='<option value=' +  GroupType[x].Id + '>' + GroupType[x].GroupType + '</option>';
			$("#NewGroupsTypeSelect").html(OptionList);
		}
                if (Masters) {
			$("#NewMasterDiv").removeClass('hidden');
			$("#NewMasterSelect").val('');
			for (x in MasterOptions) 
				$("#NewMasterSelect").append('<option>' + MasterOptions[x].Name + '</option>');
			$("#NewMasterSelect").trigger("chosen:updated");
		}
		if (Raws) {
			$("#NewRawDiv").removeClass('hidden');
			$("#NewRawSelect").val('');
			for (x in RawOptions) 
				$("#NewRawSelect").append('<option>' + RawOptions[x].Name + '</option>');
			$("#NewRawSelect").trigger("chosen:updated");
		}

	})
	$(".mybtn-edit").click(function(){
		var GroupType = MatiralsJson.GroupType;
		var MasterOptions = MatiralsJson.MasterOptions;
		var RawOptions = MatiralsJson.RawOptions;
		var OptionList =''; 
		var OldName = $(this).parentsUntil("tr").parent().find("td:eq(0)").text();
		var CurrentGroupType = $(this).parentsUntil("tr").parent().find("td:eq(1)").text();
		var CurrentMasterList = $(this).parentsUntil("tr").parent().find("td:eq(2)").text().split(',');
		var CurrentRawList = $(this).parentsUntil("tr").parent().find("td:eq(3)").text().split(',');
		var CurrentComment = $(this).parentsUntil("tr").parent().find("td:eq(4)").text();

		$("#EditMatiral").attr("data-MatiralName" , OldName);
		$("#EditMatiralHeading").text('Edit '+ OldName);
		$("#EditMatiralName").val(OldName);
		$("#EditMatiralComments").val(CurrentComment);

		if (FType) {
			$("#EditGroupsTypeDiv").removeClass('hidden');
			for (x in GroupType) 
			{
				if (CurrentGroupType == GroupType[x].GroupType)
					OptionList+='<option value=' +  GroupType[x].Id + ' selected>' + GroupType[x].GroupType + '</option>';
				else
					OptionList+='<option value=' +  GroupType[x].Id + '>' + GroupType[x].GroupType + '</option>';
			}
			$("#EditGroupsTypeSelect").html(OptionList);
		}
                if (Masters) {
			$("#EditMasterDiv").removeClass('hidden');
			$("#EditMasterSelect").val('');
			for (x in MasterOptions) 
			{
				if(jQuery.inArray(MasterOptions[x].Name, CurrentMasterList) !== -1)
					$("#EditMasterSelect").append('<option selected>' + MasterOptions[x].Name + '</option>');
				else
					$("#EditMasterSelect").append('<option>' + MasterOptions[x].Name + '</option>');
			}
			$("#EditMasterSelect").trigger("chosen:updated");
		}
		if (Raws) {
			$("#EditRawDiv").removeClass('hidden');
			$("#EditRawSelect").val('');
			for (x in RawOptions) 
			{
				if(jQuery.inArray(RawOptions[x].Name, CurrentRawList) !== -1)
					$("#EditRawSelect").append('<option selected>' + RawOptions[x].Name + '</option>');
				else
					$("#EditRawSelect").append('<option>' + RawOptions[x].Name + '</option>');
			}
			$("#EditRawSelect").trigger("chosen:updated");
		}





	})

}  


