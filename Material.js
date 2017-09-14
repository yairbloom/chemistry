function LoadMainTable(MatiralsJson , FType , Masters , Raws ){  
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
			txt += '<button class="btn btn-success btn-xs mybtn-prodaction" data-title="Prodaction"  data-toggle="tooltip" title="Prodaction">';
			txt += '<span class="glyphicon glyphicon-filter"></span></button></td>';
			txt += '<td></td>';
			$('#mytable').append(txt);
                 }

}  


function LoadMainTableActionDelete(){  
	$(".mybtn-delete").click(function(){

		var MatiralName = $(this).parentsUntil("tr").parent().find("td:eq(0)").text();
		$("#MyDelSpan").html("    Are you sure you want to delete  " + MatiralName);
		$("#DelSpanHeadline").text("Deleting  " + MatiralName);
		$("#DeleteMatiral").attr("data-MatiralName" , MatiralName);

		$("#SaveDeleteMatiral").off('click').on('click' , function(){
			$.ajax({
				type : "GET",
				url : "DeleteMatiral.php",
				data: {MatiralName: $("#DeleteMatiral").attr("data-MatiralName") },
				success : function(response) {
					setTimeout(function()
						{
							location.reload();  //Refresh page
						}, 1000);
				}
			});


		});

	})
}

function LoadMainTableActionNew(MatiralsJson ,  Masters , Raws ){  

	$(".mybtn-new").click(function(){
		var MasterOptions = MatiralsJson.MasterOptions;
		var RawOptions = MatiralsJson.RawOptions;
		var OptionList =''; 
		$("#NewMatiralHeading").text('New '+ $("#MenuContent").attr("data-Matiral-type"));

                if (Masters) {
			$("#NewMasterDiv").removeClass('hidden');
			$("#NewMasterSelect").attr("data-placeholder","Select Master Matirals");
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

		$("#EditRawSelect,#EditMasterSelect,#NewRawSelect,#NewMasterSelect").chosen( { width: '100%' } );
		$("#IdSaveNewMatirial").off('click').on('click' , function(){

			$.ajax({
				type : "GET",
				url : "SaveNewMatiral.php",
				data: {Name: $("#NewMatiralName").val(), 
					Comment: $("#NewMatiralComments").val(), 
					MastersList: $("#NewMasterSelect").val() , 
					RawsList: $("#NewRawSelect").val() , 
					GroupTypeName: $("#NewGroupsTypeSelect").val()  , 
					MatiralType : $("#MenuContent").attr("data-Matiral-type")},
				success : function(response) {
					setTimeout(function()
						{
							location.reload();  //Refresh page
						}, 1000);
				}
			});



		});

	})
}



function LoadMainTableActionEdit(MatiralsJson ,  Masters , Raws ){  

	$(".mybtn-edit").click(function(){
		var RawOptions = MatiralsJson.RawOptions;
		var OldName = $(this).parentsUntil("tr").parent().find("td:eq(0)").text();
		var CurrentMasterList = $(this).parentsUntil("tr").parent().find("td:eq(2)").text().split(',');
		var CurrentRawList = $(this).parentsUntil("tr").parent().find("td:eq(3)").text().split(',');
		var CurrentComment = $(this).parentsUntil("tr").parent().find("td:eq(4)").text();
		var MasterOptions = MatiralsJson.MasterOptions;

		$("#EditMatiral").attr("data-MatiralName" , OldName);
		$("#EditMatiralHeading").text('Edit '+ OldName);
		$("#EditMatiralName").val(OldName);
		$("#EditMatiralComments").val(CurrentComment);

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


		$("#EditRawSelect,#EditMasterSelect").chosen( { width: '100%' } );
		$("#SaveEditedMatirial").off('click').on('click' , function(){
			$.ajax({
				type : "GET",
				url : "SaveEditedMatirial.php",
				data: {OldName: $("#EditMatiral").attr("data-MatiralName"),
					NewName: $("#EditMatiralName").val(), 
					Comment: $("#EditMatiralComments").val(), 
					MastersList: $("#EditMasterSelect").val() , 
					RawsList: $("#EditRawSelect").val() , 
					GroupTypeName: $("#EditGroupsTypeSelect").val()  , 
					MatiralType : $("#MenuContent").attr("data-Matiral-type")},
				success : function(response) {
					setTimeout(function()
						{
							location.reload();  //Refresh page
						}, 1000);
				}
			});


		});



	})
}

function LoadFormulationGroupType(MatiralsJson , Prefix){  
	var SelectionDivHtml = '<label class="control-label col-sm-2" >Type:</label><div class="col-sm-10" ><select class="form-control" id="' + Prefix+ 'GroupsTypeSelect"> </select></div>';
	var GroupType = MatiralsJson.GroupType;
	var CurrentGroupType = $(this).parentsUntil("tr").parent().find("td:eq(1)").text();
	var OptionList =''; 
	$("#" + Prefix + "SelectionDiv").removeClass('hidden');
	$("#" + Prefix + "SelectionDiv").html(SelectionDivHtml);
	for (x in GroupType) 
	{
		if (CurrentGroupType == GroupType[x].GroupType)
			OptionList+='<option value=' +  GroupType[x].Id + ' selected>' + GroupType[x].GroupType + '</option>';
		else
			OptionList+='<option value=' +  GroupType[x].Id + '>' + GroupType[x].GroupType + '</option>';
	}
	$("#" + Prefix + "GroupsTypeSelect").html(OptionList);
}

function LoadMainTableActionProduction(){  

      $(".mybtn-prodaction").click(function(){
	      var MatiralName = $(this).parentsUntil("tr").parent().find("td:eq(0)").text();
	      var MatiralType = $("#MainDiv").attr("data-MatiralType");
	      $("#MainDiv").attr("data-MatiralName" , MatiralName);
	      $("#MyHeadline").text(MatiralType + ": " + MatiralName);
	      $("#mytable").load("Production.html");
	      $("#ActionsContent").load("ProductionActions.html");

         })
}


function LoadProductionTable(PJson , Raws , Masters){  
	var x ;
	var theadStr =  '<thead><th>SerialId</th>';
	if (Masters)
		theadStr += '<th>Masters</th>';
	if (Raws)
		theadStr += '<th>Raws</th>';
	theadStr +=
		'<th>Quantity</th>' +
		'<th>Comment</th>'+
		'<th>Edit By</th>' +
		'<th>Last Edit</th>' +
		'<th>Actions</th>' +
		'<th>New</th>'+
		'</thead>';
	$('#mytable').append(theadStr);
	        var NewItemRow='<tr><td>';
	        if (Raws) 
		  NewItemRow+='</td><td>';
	        if (Masters) 
		  NewItemRow+='</td><td>';
	        NewItemRow+='<td></td><td></td><td></td><td></td><td></td><td><p data-placement="top" data-toggle="tooltip" title="New">';
	        NewItemRow+='<button class="btn btn btn-xs mybtn-new" data-title="New" data-toggle="modal" data-target="#NewMatiral" >';
	        NewItemRow+='<span class="glyphicon glyphicon-plus"></span></button></p></td></tr>';
	         $('#mytable').append(NewItemRow);

                for (x in PJson) {
			var txt='<tr><td>';
			RawStr="";
			MasterStr="";

			if (Raws)
			{
				delimiter="";
				for (i in PJson[x].Raw) {
					RawStr+=delimiter + PJson[x].Raw[i].MaterialName + '(' + PJson[x].Raw[i].MaterialSN + ')';
					delimiter=",";
				}
			}
			if (Masters)
			{
				delimiter="";
				for (i in PJson[x].Master) {
					MasterStr+=delimiter +  PJson[x].Master[i].MaterialName + '(' + PJson[x].Master[i].MaterialSN + ')';
					delimiter=",";
				}
			}

			txt += PJson[x].SerialNumber;
			txt += '</td><td>';
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

			txt += PJson[x].Quantity;
			if (PJson[x].QuantityType == 1)
				txt += " Gram";
			else if (PJson[x].QuantityType == 2)
                                txt += " Liter";
			txt += '</td><td>';
			txt += PJson[x].Comment;
			txt += '</td><td>';
			txt += "Yair";
			txt += '</td><td>';
			txt += PJson[x].LastModify;
			txt += '</td>';
			txt += '<td><div class="btn-group">';
		        txt += '<button class="btn btn-primary btn-xs mybtn-edit" data-title="Edit" data-toggle="modal" data-target="#EditMatiral" data-placement="top" data-toggle="tooltip" title="Edit">';
			txt += '<span class="glyphicon glyphicon-pencil"></span></button>';
			txt += '<button class="btn btn-danger btn-xs mybtn-delete" data-title="Delete" data-toggle="modal" data-target="#DeleteMatiral"';
			txt += ' data-placement="top" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></button>';
			txt += '<td></td>';
			$('#mytable').append(txt);
                 }
}  


function LoadProdactionTableActionNew(MatiralsJson ,  Masters , Raws ){  

	$(".mybtn-new").click(function(){
		var MasterOptions = MatiralsJson.MasterOptions;
		var RawOptions = MatiralsJson.RawOptions;
		var OptionList =''; 
		var MatiralName = $("#MainDiv").attr("data-MatiralName");
		$("#NewMatiralHeading").text('New instance of '+ MatiralName);

                if (Masters) {
			$("#NewMasterDiv").removeClass('hidden');
			$("#NewMasterSelect").attr("data-placeholder","Select Master Instances");
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

		$("#EditRawSelect,#EditMasterSelect,#NewRawSelect,#NewMasterSelect").chosen( { width: '100%' } );
		$("#IdSaveNewMatirial").off('click').on('click' , function(){

			$.ajax({
				type : "GET",
				url : "SaveNewMatiral.php",
				data: {Name: $("#NewMatiralName").val(), 
					Comment: $("#NewMatiralComments").val(), 
					MastersList: $("#NewMasterSelect").val() , 
					RawsList: $("#NewRawSelect").val() , 
					GroupTypeName: $("#NewGroupsTypeSelect").val()  , 
					MatiralType : $("#MenuContent").attr("data-Matiral-type")},
				success : function(response) {
					setTimeout(function()
						{
							location.reload();  //Refresh page
						}, 1000);
				}
			});



		});

	})
}


