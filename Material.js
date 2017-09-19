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
			var DisableProdactionBtn = false;

			if (Raws)
			{
				for (i in MatList[x].Raw) {
					var ClassStr="btn-info  btn-xs";
					if (MatList[x].Raw[i].InstancesCount == '0') 
					{
						ClassStr="btn-warning  btn-xs";
						DisableProdactionBtn = true;
					}
					RawStr+='<span class="' + ClassStr +  '">' + MatList[x].Raw[i].Name  + '</span>';
				}
			}
			if (Masters)
			{
				for (i in MatList[x].Master) {
					var ClassStr="btn-info  btn-xs";
					if (MatList[x].Master[i].InstancesCount == '0') 
					{
						ClassStr="btn-warning  btn-xs";
						DisableProdactionBtn = true;
					}
					MasterStr+='<span type="button" class="' + ClassStr +  '">' + MatList[x].Master[i].Name  + '</span>';
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
			txt += '<button class="btn btn-success btn-xs mybtn-prodaction ';
			if (DisableProdactionBtn)
				txt += 'disabled=/"disabled/""'; 
			txt += 'data-title="Prodaction"  data-toggle="tooltip" title="Prodaction">';
			txt += '<span class="glyphicon glyphicon-cog"></span></button></td>';
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

		$(".MychosenSelect").chosen( { width: '100%' } );
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


		$(".MychosenSelect").chosen( { width: '100%' } );
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
	      console.log("MatiralName="+MatiralName + " MatiralType=" + MatiralType);
	      $("#MainDiv").attr("data-MatiralName" , MatiralName);
	      $("#MyHeadline").text(MatiralType + ": " + MatiralName);
	      $("#mytable").load("Production.html");
	      //$("#ActionsContent").load("ProductionActions.html");
	      $("#ActionsContent").load("Actions.html");

         })
}


function LoadProductionTable(PJson , Raws , Masters){  
        var InstancesList = PJson.InstancesList;
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

                for (x in InstancesList) {
			var txt='<tr><td>';
			RawStr="";
			MasterStr="";

			if (Raws)
			{
				delimiter="";
				for (i in InstancesList[x].Raw) 
					RawStr+='<span class="btn-info  btn-xs">' + InstancesList[x].Raw[i].MaterialName + '(' + InstancesList[x].Raw[i].MaterialSN  + ')</span>';
			}
			if (Masters)
			{
				delimiter="";
				for (i in InstancesList[x].Master) 
					MasterStr +='<span class="btn-info  btn-xs">' + InstancesList[x].Master[i].MaterialName + '(' + InstancesList[x].Master[i].MaterialSN  + ')</span>';
			}

			txt += InstancesList[x].SerialNumber;
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

			txt += InstancesList[x].Quantity;
			if (InstancesList[x].QuantityType == 1)
				txt += " Gram";
			else if (InstancesList[x].QuantityType == 2)
                                txt += " Liter";
			txt += '</td><td>';
			txt += InstancesList[x].Comment;
			txt += '</td><td>';
			txt += "Yair";
			txt += '</td><td>';
			txt += InstancesList[x].LastModify;
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
		LoadProdactionTableAction(MatiralsJson , Masters , Raws , "New");

	})
}

function LoadProdactionTableActionEdit(PJson ,  Masters , Raws ){  
	$(".mybtn-edit").click(function(){
		LoadProdactionTableAction(PJson , Masters , Raws , "Edit");
		var OldName = $(this).parentsUntil("tr").parent().find("td:eq(0)").text();
		var InstancesList = PJson.InstancesList;
                for (x in InstancesList) {
			if (InstancesList[x].SerialNumber == OldName)
			{
				var arr=[];
				for (i in InstancesList[x].Raw) 
				{
					var SelectedInstance = InstancesList[x].Raw[i].MaterialName + '(' + InstancesList[x].Raw[i].MaterialSN  + ')';
					arr.push(SelectedInstance);
					var elems = $('#EditRawSelect[name="' + SelectedInstance + '"]')
					console.log(elems);
					elems.siblings().prop('disabled', true);

				}
				console.log("arr=" + arr);
				//$(":disabled").siblings().prop('disabled', true);

					

				$('#EditRawSelect').val(arr).trigger('chosen:updated');
			}
		}
		$('#EditRawSelect').trigger('chosen:updated');

	})

}

function LoadProdactionTableAction(MatiralsJson ,  Masters , Raws  , Prefix){  
		var RecipeOptionMaster = MatiralsJson.RecipeOptionMaster;
		var RecipeOptionRaw = MatiralsJson.RecipeOptionRaw;
		var RawOptions = MatiralsJson.RawOptions;
		var OptionList =''; 
		var MatiralName = $("#MainDiv").attr("data-MatiralName");
		$("#" + Prefix + "MatiralHeading").text('New instance of '+ MatiralName);
		$("#" + Prefix + "MatiralName").val(MatiralsJson.Candidate);
		$("#" + Prefix + "MatLabel").text("Serial Id");

                if (Masters) {
			$("#" + Prefix + "MasterDiv").removeClass('hidden');
			$("#" + Prefix + "MasterSelect").attr("data-placeholder","Select Master Instances");
			var SelectStr='';
			for (ROM in RecipeOptionMaster) {
				SelectStr+= '<optgroup label=' + RecipeOptionMaster[ROM].MatiralName + '>';
				for (Ins in RecipeOptionMaster[ROM].Instances) 
				{
					var OptionName = '<option>'+ RecipeOptionMaster[ROM].MatiralName + '(' + RecipeOptionMaster[ROM].Instances[Ins] + ')</option>';
					SelectStr+= OptionName.replace(/\s+/, "");
				}
				SelectStr+= '</optgroup>';
			}
			$("#" + Prefix + "MasterSelect").html(SelectStr);
			$("#" + Prefix + "MasterSelect").trigger("chosen:updated");
		}
		if (Raws) {
			$("#" + Prefix + "RawDiv").removeClass('hidden');
			var SelectStr='';
			for (ROR in RecipeOptionRaw) {
				SelectStr+='<optgroup label=' + RecipeOptionRaw[ROR].MatiralName + '>';
				for (Ins in RecipeOptionRaw[ROR].Instances) 
				{
					var OptionName = '<option>'+ RecipeOptionRaw[ROR].MatiralName + '(' +RecipeOptionRaw[ROR].Instances[Ins] + ')</option>';
					SelectStr+= OptionName.replace(/\s+/, "") ;
				}
				SelectStr+= '</optgroup>';
			}
			$("#" + Prefix + "RawSelect").html(SelectStr);
			$("#" + Prefix + "RawSelect").trigger("chosen:updated");
		}

		$("#" + Prefix + "Size").removeClass('hidden');
		var SizeHtml='<label class="control-label col-sm-2" >Quantity :</label>';
		SizeHtml+= '<div class="col-sm-10 container" >';
		SizeHtml+= '<input type="number" class="form-control" id="NewMatiralSize" placeholder="Select Quantity" name="NewQuantityInput"></div>';
		$("#" + Prefix + "Size").html(SizeHtml);

		$("#" + Prefix + "SizeType").removeClass('hidden');
		SizeHtml='<label class="control-label col-sm-2" >Units:</label>';
		SizeHtml+= '<div class="col-sm-10 container" ><select class="form-control">';
		SizeHtml+= '<option selected value="1"> Gram </option><option value="2"> Liter </option> </select></div>';
		$("#" + Prefix + "SizeType").html(SizeHtml);




		$(".MychosenSelect").chosen( { width: '100%' } );
	
}



function OptgroupBehavior()
{
		$("#EditRawSelect,#EditMasterSelect,#NewRawSelect,#NewMasterSelect").off('change').on('change', function (e , params){
			var ChangeText = '';
			var Disable=false;
			if (params.selected) 
			{
				ChangeText=params.selected;
				Disable=true;
			}
			if (params.deselected)
				ChangeText=params.deselected;

			var TheOption = $( "option" ).filter( function () {
				return $( this ).text().indexOf( ChangeText ) >= 0;
			}).first();

			TheOption.siblings().prop('disabled', Disable);
			$(this).trigger("chosen:updated");
		});
}


