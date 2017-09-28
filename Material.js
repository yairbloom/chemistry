function GeneralEvents()
{
	$('.PreventSpecialChars').bind('keypress', function(e) {
		var code = e.which;
		console.log(code);
		if (!((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57)) && code !=95){//underscore
			e.preventDefault();
		}
	});
	$('.PreventSpecialCharsAllowSpace').bind('keypress', function(e) {
		var code = e.which;
		if (!((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57)) && code !=95 && code !=32){//space bar
			e.preventDefault();
		}
	});


}

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
			var txt='<tr data-index=' + x +'><td>';
			RawStr="";
			RawHtmlStr="";
			RawArr = [];
			MasterStr="";
			MasterHtmlStr="";
			MasterArr = [];
			Delimiter="";
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
					RawHtmlStr+='<span class="' + ClassStr +  '">' + MatList[x].Raw[i].Name  + '</span>';
					RawStr+=Delimiter + "'" + MatList[x].Raw[i].Name + "'" ;
					Delimiter=",";
					RawArr.push(MatList[x].Raw[i].Name);
				}
			}
			if (Masters)
			{
				Delimiter="";
				for (i in MatList[x].Master) {
					var ClassStr="btn-info  btn-xs";
					if (MatList[x].Master[i].InstancesCount == '0') 
					{
						ClassStr="btn-warning  btn-xs";
						DisableProdactionBtn = true;
					}
					MasterHtmlStr+='<span type="button" class="' + ClassStr +  '">' + MatList[x].Master[i].Name  + '</span>';
					MasterStr+=Delimiter + "'" + MatList[x].Master[i].Name + "'";
					Delimiter=",";
					MasterArr.push(MatList[x].Master[i].Name);
				}
			}

			txt += MatList[x].Name + '</td>';
			if (FType)
				txt += '<td>' + MatList[x].GroupType + '</td>';
			if (Masters)
				txt += '<td data-ElementsList=' + JSON.stringify(MasterArr , ',') + '>' + MasterHtmlStr + '</td>';

			if (Raws)
				txt += '<td data-ElementsList=' + JSON.stringify(RawArr, ',') + '>' + RawHtmlStr  + '</td>';
			txt += '<td>' + MatList[x].Comment;
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
		var MasterOptions = MatiralsJson.MasterOptions;
		var index = $(this).parentsUntil("tr").parent().attr('data-index');
		var MatiralCurrentInfo = MatiralsJson.MatList[index]; 
		var OldName = MatiralCurrentInfo.Name;
		var CurrentComment = MatiralCurrentInfo.Comment;
		var RawNames = [];
		var MasterNames = [];
		$.each(MatiralCurrentInfo.Raw, function( index, value ) { RawNames[index] = value.Name;});
		$.each(MatiralCurrentInfo.Master, function( index, value ) { MasterNames[index] = value.Name;});

		$("#EditMatiral").attr("data-MatiralName" , OldName);
		$("#EditMatiralHeading").text('Edit '+ OldName);
		$("#EditMatiralName").val(OldName);
		$("#EditMatiralComments").val(CurrentComment);
		$("#EditGroupsTypeSelect").val(MatiralCurrentInfo.Id);

                if (Masters) {
			$("#EditMasterDiv").removeClass('hidden');
			$("#EditMasterSelect").val('');
			for (x in MasterOptions) 
			{
				if(jQuery.inArray(MasterOptions[x].Name, MasterNames) !== -1)
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
				//console.log(RawOptions[x].Name + ' index=' + (jQuery.inArray(RawOptions[x].Name, RawNames)));
				if(jQuery.inArray(RawOptions[x].Name, RawNames) !== -1)
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
	var SelectionDivHtml = '<label class="control-label col-sm-3" >Type:</label><div class="col-sm-9" ><select class="form-control" id="' + Prefix+ 'GroupsTypeSelect"> </select></div>';
	var GroupType = MatiralsJson.GroupType;
	var OptionList =''; 
	$("#" + Prefix + "SelectionDiv").removeClass('hidden');
	$("#" + Prefix + "SelectionDiv").html(SelectionDivHtml);
	for (x in GroupType) 
		OptionList+='<option value=' +  GroupType[x].Id + '>' + GroupType[x].GroupType + '</option>';
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
			var txt='<tr data-index=' + x +'><td>';
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
			txt += '</td>';
			if (Masters)
				txt += '<td>' +MasterStr + '</td>';
			if (Raws)
				txt += '<td>' + RawStr + '</td>';
			txt += '<td data-Quantity=' + InstancesList[x].Quantity + ' data-QuantityType=' + InstancesList[x].QuantityType + '>';

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
			txt += '<td></td></tr>';
			$('#mytable').append(txt);
                 }
}  


function LoadProdactionTableActionNew(MatiralsJson ,  Masters , Raws ){  

	$(".mybtn-new").click(function(){
		var RecipeOptionMaster = MatiralsJson.RecipeOptionMaster;
		var RecipeOptionRaw = MatiralsJson.RecipeOptionRaw;
		var RawOptions = MatiralsJson.RawOptions;
		var OptionList =''; 
		var MatiralName = $("#MainDiv").attr("data-MatiralName");
		$("#NewMatiralHeading").text('New instance of '+ MatiralName);
		$("#NewMatiralName").val(MatiralsJson.Candidate);
		$("#NewMatLabel").text("Serial Id");

                if (Masters) {
			$("#NewMasterDiv").removeClass('hidden');
			$("#NewMasterSelect").attr("data-placeholder","Select Master Instances");
			var SelectStr='';
			for (ROM in RecipeOptionMaster) {
				var MasterMatiralName=(RecipeOptionMaster[ROM].MatiralName).replace(/\s+/, "") ;
				SelectStr+='<optgroup label=' + MasterMatiralName + ' value="' + MasterMatiralName + '">';
				for (Ins in RecipeOptionMaster[ROM].Instances) 
				{
					var InsName=(RecipeOptionMaster[ROM].Instances[Ins]).replace(/\s+/, "") ;
					var OptionName = '<option data-value="' + InsName + '">'+ MasterMatiralName + '(' +InsName + ')</option>';
					SelectStr+= OptionName;
				}
				SelectStr+= '</optgroup>';
			}
			$("#NewMasterSelect").html(SelectStr);
			$("#NewMasterSelect").trigger("chosen:updated");
		}
		if (Raws) {
			$("#NewRawDiv").removeClass('hidden');
			var SelectStr='';
			for (ROR in RecipeOptionRaw) {
				var RawMatiralName=(RecipeOptionRaw[ROR].MatiralName).replace(/\s+/, "") ;
				SelectStr+='<optgroup label=' + RawMatiralName + ' value="' + RawMatiralName + '">';
				for (Ins in RecipeOptionRaw[ROR].Instances) 
				{
					var InsName=(RecipeOptionRaw[ROR].Instances[Ins]).replace(/\s+/, "") ;
					var OptionName = '<option data-value="' + InsName + '">'+ RawMatiralName + '(' +InsName + ')</option>';
					SelectStr+= OptionName;
				}
				SelectStr+= '</optgroup>';
			}
			$("#NewRawSelect").html(SelectStr);
			$("#NewRawSelect").trigger("chosen:updated");
		}

		$("#NewSize").removeClass('hidden');
		var SizeHtml='<label class="control-label col-sm-3" >Quantity :</label>';
		SizeHtml+= '<div class="col-sm-9 container" >';
		SizeHtml+= '<input type="number" min="0" class="form-control" id="NewInstanceSize" placeholder="Select Quantity" name="NewQuantityInput"></div>';
		$("#NewSize").html(SizeHtml);

		$("#NewSizeType").removeClass('hidden');
		SizeHtml='<label class="control-label col-sm-3" >Units:</label>';
		SizeHtml+= '<div class="col-sm-9 container" ><select id="NewSizeSelect" class="form-control">';
		SizeHtml+= '<option selected value="1"> Gram </option><option value="2"> Liter </option> </select></div>';
		$("#NewSizeType").html(SizeHtml);

		$(".MychosenSelect").chosen( { width: '100%' } );
		$("#IdSaveNewMatirial").off('click').on('click' , function(){
			var SelectedRawInstances = [];
			var SelectedMasterInstances = [];
			$("#NewRawSelect option:selected").each(function(i){SelectedRawInstances[i] = { "InstanceName" : $(this).attr('data-value') , "MatiralName" : $(this).parent().attr('label') };})
			$("#NewMasterSelect option:selected").each(function(i){SelectedMasterInstances[i] = { "InstanceName" : $(this).attr('data-value'), "MatiralName" : $(this).parent().attr('label') };})



			$.ajax({
				type : "GET",
				url : "SaveNewInstance.php",
				data: {MatiralName: MatiralName,
					InstanceName: $("#NewMatiralName").val(), 
					Comment: $("#NewMatiralComments").val(), 
					SelectedRawInstances: JSON.stringify(SelectedRawInstances),
					SelectedMasterInstances: JSON.stringify(SelectedMasterInstances),
					Size: $("#NewInstanceSize").val(),
					SizeType: $("#NewSizeSelect").val()},
				success : function(response) {
					setTimeout(function()
						{
							$("#mytable").load("Production.html");
							//location.reload();  //Refresh page
						}, 1000);
				}
			});



		});

		NewSelectBehavior();
	})
}

function GetCurrentItemByName(CurrentItemsList , Name) {
	var CurrentItem = null;
	for (i in CurrentItemsList) 
		if (CurrentItemsList[i].MaterialName == Name)
			CurrentItem=CurrentItemsList[i];
	return CurrentItem;
}
				
function LoadProdactionTableActionEdit(PJson ,  Masters , Raws ){  
	$(".mybtn-edit").click(function(){
		var RecipeOptionMaster = PJson.RecipeOptionMaster;
		var RecipeOptionRaw = PJson.RecipeOptionRaw;
		var RawOptions = PJson.RawOptions;
		var OptionList =''; 
		var MatiralName = $("#MainDiv").attr("data-MatiralName");
		var index = $(this).parentsUntil("tr").parent().attr('data-index');

		var CurrentInstance = PJson.InstancesList[index];

		var OldQuantity = CurrentInstance.Quantity;
		var OldQuantityType = CurrentInstance.QuantityType;
		var OldComment = CurrentInstance.Comment;

		$("#EditMatiralName").val(CurrentInstance.SerialNumber);
		$("#EditMatLabel").text("Serial Id");

                if (Masters) {
			$("#EditMasterDiv").removeClass('hidden');
			$("#EditMasterSelect").attr("data-placeholder","Select Master Instances");
			var SelectStr='';
			for (ROM in RecipeOptionMaster) {
				var MasterMatiralName=(RecipeOptionMaster[ROM].MatiralName).replace(/\s+/, "") ;
				SelectStr+='<optgroup label=' + MasterMatiralName + ' value="' + MasterMatiralName + '">';
				var CurrentMasterItem = GetCurrentItemByName(CurrentInstance.Master , RecipeOptionMaster[ROM].MatiralName);
				for (Ins in RecipeOptionMaster[ROM].Instances) 
				{
					var InsName = RecipeOptionMaster[ROM].Instances[Ins].replace(/\s+/, "");
					var OptionName = MasterMatiralName + '(' +Ins + ')';

					if (CurrentMasterItem) {
						if (CurrentMasterItem.MaterialSN == InsName)
							SelectStr+= '<option selected data-value=' + InsName + '>' + OptionName + '</option>';
					        else
							SelectStr+= '<option disabled=/"disabled/" data-value=' + InsName + '>' + OptionName + '</option>';
					}
					else
						SelectStr+= '<option data-value=' + InsName + '>' + OptionName + '</option>';
				}
				SelectStr+= '</optgroup>';
			}
			$("#EditMasterSelect").html(SelectStr);
			$("#EditMasterSelect").trigger("chosen:updated");
		}
		if (Raws) {
			$("#EditRawDiv").removeClass('hidden');
			var SelectStr='';
			for (ROR in RecipeOptionRaw) {
				var RawMatiralName=(RecipeOptionRaw[ROR].MatiralName).replace(/\s+/, "") ;
				SelectStr+='<optgroup label=' + RawMatiralName + ' value="' + RawMatiralName + '">';
				var CurrentRawItem = GetCurrentItemByName(CurrentInstance.Raw , RawMatiralName);
				
				for (Ins in RecipeOptionRaw[ROR].Instances) 
				{
					var InsName = RecipeOptionRaw[ROR].Instances[Ins].replace(/\s+/, "");
					var OptionName = RecipeOptionRaw[ROR].MatiralName + '(' +InsName + ')';

					if (CurrentRawItem) {
						if (CurrentRawItem.MaterialSN == InsName)
							SelectStr+= '<option selected value=' + InsName +'>' + OptionName + '</option>';
					        else
							SelectStr+= '<option disabled=/"disabled/" value=' + InsName +'>' + OptionName + '</option>';
					}
					else
						SelectStr+= '<option value=' + InsName +'>' + OptionName + '</option>';
				}
				SelectStr+= '</optgroup>';
			}
			$("#EditRawSelect").html(SelectStr);
			$("#EditRawSelect").trigger("chosen:updated");
		}

		$("#EditSize").removeClass('hidden');
		var SizeHtml='<label class="control-label col-sm-3" >Quantity :</label>';
		SizeHtml+= '<div class="col-sm-9 container" >';
		SizeHtml+= '<input type="number" class="form-control" id="UpdateQuantity" placeholder="Select Quantity" name="EditQuantityInput" value=' + OldQuantity + '></div>';
		$("#EditSize").html(SizeHtml);

		$("#EditSizeType").removeClass('hidden');
		SizeHtml='<label class="control-label col-sm-3" >Units:</label>';
		SizeHtml+= '<div class="col-sm-9 container" ><select class="form-control" id="UpdateQuantityType">';
		SizeHtml+= '<option value="1"'
		if (OldQuantityType == 1) 
			SizeHtml+= 'selected';
		SizeHtml+= '> Gram </option>';
		SizeHtml+= '<option value="2"'
		if (OldQuantityType == 2) 
			SizeHtml+= 'selected';
		SizeHtml+= '> Liter </option> </select></div>';
		$("#EditSizeType").html(SizeHtml);


		$("#EditMatiralComments").val(OldComment);


		$(".MychosenSelect").chosen( { width: '100%' } );
		$("#SaveEditedMatirial").off('click').on('click' , function(){
			var SelectedRawInstances = [];
			var SelectedMasterInstances = [];
			$("#EditRawSelect option:selected").each(function(i){SelectedRawInstances[i] = { "InstanceName" : $(this).attr('data-value') , "MatiralName" : $(this).parent().attr('label') };})
			$("#EditMasterSelect option:selected").each(function(i){SelectedMasterInstances[i] = { "InstanceName" : $(this).attr('data-value') , "MatiralName" : $(this).parent().attr('label') };})



			$.ajax({
				type : "GET",
				url : "UpdateInstance.php",
				data: {MatiralName: MatiralName,
					OldInstanceName:CurrentInstance.SerialNumber,
					InstanceName: $("#EditMatiralName").val(), 
					Comment: $("#EditMatiralComments").val(), 
					SelectedRawInstances: JSON.stringify(SelectedRawInstances),
					SelectedMasterInstances: JSON.stringify(SelectedMasterInstances),
					Size: $("#UpdateQuantity").val(),
					SizeType: $("#UpdateQuantityType").val()},
				success : function(response) {
					setTimeout(function()
						{
							$("#mytable").load("Production.html");
						}, 1000);
				}
			});



		});

		EditSelectBehavior();
              
	})
}


function OptgroupBehavior()
{


	$("#EditRawSelect,#EditMasterSelect,#NewRawSelect,#NewMasterSelect").off('change').on('change', function (e , params){
		console.log(params);
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
			return $( this ).val().indexOf( ChangeText ) >= 0;
		}).first();
		//console.log($( this ).find(ChangeText).val());

		TheOption.siblings().prop('disabled', Disable);
		$(this).trigger("chosen:updated");

	});


	$(".NewSelect").on('change', function (){
		NewSelectBehavior();
	});

	$(".EditSelect").on('change', function (){
		EditSelectBehavior();
	});

}

function NewSelectBehavior() {
	var RawAllSelected = ($('option:selected','#NewRawSelect').length == $('optgroup','#NewRawSelect').length);
	var MasterAllSelected = ($('option:selected','#NewMasterSelect').length == $('optgroup','#NewMasterSelect').length);
	var Color = 'red';
	if (RawAllSelected)
		Color = '';
	$('#NewRawSelect').parent().parent().find('label').css('color',Color);
	Color = 'red';
	if (MasterAllSelected)
		Color = '';
	$('#NewMasterSelect').parent().parent().find('label').css('color',Color);
	$("#IdSaveNewMatirial").prop('disabled', !(RawAllSelected&&MasterAllSelected));


}

function EditSelectBehavior(){
	var RawAllSelected = ($('option:selected','#EditRawSelect').length == $('optgroup','#EditRawSelect').length);
	var MasterAllSelected = ($('option:selected','#EditMasterSelect').length == $('optgroup','#EditMasterSelect').length);
	var Color = 'red';
	if (RawAllSelected)
		Color = '';
	$('#EditRawSelect').parent().parent().find('label').css('color',Color);
	Color = 'red';
	if (MasterAllSelected)
		Color = '';
	$('#EditMasterSelect').parent().parent().find('label').css('color',Color);
		$("#SaveEditedMatirial").prop('disabled', !(RawAllSelected&&MasterAllSelected));
}




