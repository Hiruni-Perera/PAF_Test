

$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// Save
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form Validation
	var status = validateOrderForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	

	$(document).ready(function() {
		if ($("#alertSuccess").text().trim() == "") {
			$("#alertSuccess").hide();
		}
		$("#alertError").hide();
	});

	$(document).on("click", "#btnSave", function(event) {
		
		// Clear alerts
		$("#alertSuccess").text("");
		$("#alertSuccess").hide();
		$("#alertError").text("");
		$("#alertError").hide();
		
		// Form Validation-------------------
		var status = validateOrderForm();
		if (status != true) {
			$("#alertError").text(status);
			$("#alertError").show();
			return;
		}
		
		// If it is valid
		var type = ($("#hidOrderIDSave").val() == "") ? "POST" : "PUT";
		$.ajax({
			url : "OrderAPI",
			type : type,
			data : $("#formOrder").serialize(),
			dataType : "text",
			complete : function(response, status) {
				onOrderSaveComplete(response.responseText, status);
			}
		});
	});


	function onOrderSaveComplete(response, status) {
		if (status == "success") {
			var resultSet = JSON.parse(response);
			if (resultSet.status.trim() == "success") {
				$("#alertSuccess").text("Successfully saved.");
				$("#alertSuccess").show();
				$("#divItemsGrid").html(resultSet.data);
			} else if (resultSet.status.trim() == "error") {
				$("#alertError").text(resultSet.data);
				$("#alertError").show();
			}
		} else if (status == "error") {
			$("#alertError").text("Error occured while saving");
			$("#alertError").show();
		} else {
			$("#alertError").text("Unknown error occured while saving");
			$("#alertError").show();
		}
		$("#hidOrderIDSave").val("");
		$("#formOrder")[0].reset();
	}
	

	// Delet
		function onOrderDeleteComplete(response, status) {
		if (status == "success") {
			var resultSet = JSON.parse(response);
			if (resultSet.status.trim() == "success") {
				$("#alertSuccess").text("Successfully deleted.");
				$("#alertSuccess").show();
				$("#divItemsGrid").html(resultSet.data);
			} else if (resultSet.status.trim() == "error") {
				$("#alertError").text(resultSet.data);
				$("#alertError").show();
			}
		} else if (status == "error") {
			$("#alertError").text("Error occured while deleting");
			$("#alertError").show();
		} else {
			$("#alertError").text("Unknown error occured while deleting");
			$("#alertError").show();
		}
	}


	$(document).on("click", ".btnRemove", function(event) {
		$.ajax({
			url : "OrderAPI",
			type : "DELETE",
			data : "orderID=" + $(this).data("orderid"),
			dataType : "text",
			complete : function(response, status) {
				onOrderDeleteComplete(response.responseText, status);
			}
		});
	});
	

	// Update
	$(document).on("click", ".btnUpdate", function(event) {
		$("#hidOrderIDSave").val($(this).data("orderid"));
		$("#orderCode").val($(this).closest("tr").find('td:eq(0)').text());
		$("#orderName").val($(this).closest("tr").find('td:eq(1)').text());
		$("#orderPrice").val($(this).closest("tr").find('td:eq(2)').text());
		$("#orderDesc").val($(this).closest("tr").find('td:eq(3)').text());
		$("#qty").val($(this).closest("tr").find('td:eq(4)').text());
	});

	// CLIENT-MODEL
	function validateItemForm() {
		
		//for order code
		if ($("#orderCode").val().trim() == "") {
			return "Please insert Order Code.";
		}
		
		//for order name
		if ($("#orderName").val().trim() == "") {
			return "Please insert Order Name";
		
		//for order price
		}
		if ($("#orderPrice").val().trim() == "") {
			return "Please insert Order Price";
		}
		
		// whether price is numerical value
		var tmpPrice = $("#orderPrice").val().trim();
		if (!$.isNumeric(tmpPrice)) {
			return "Please insert a numerical value for Order Price";
		}
		
		// convert to decimal price
		$("#orderPrice").val(parseFloat(tmpPrice).toFixed(2));
		//for description
		if ($("#itemDesc").val().trim() == "") {
			return "Please insert Order Description";
		}
		
		// for  order quantity
		if ($("#qty").val().trim() == "") {
			return " Please insert Quantity";

		}
		return true;
	}

	
	// If valid
	$("#formOrder").submit();
});

// Update
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidOrderIDSave").val(
					$(this).closest("tr").find('#hidOrderIDUpdate').val());
			$("#orderCode").val($(this).closest("tr").find('td:eq(0)').text());
			$("#orderName").val($(this).closest("tr").find('td:eq(1)').text());
			$("#orderPrice").val($(this).closest("tr").find('td:eq(2)').text());
			$("#orderDesc").val($(this).closest("tr").find('td:eq(3)').text());
			$("#qty").val($(this).closest("tr").find('td:eq(4)').text());
		});
		
		
// CLIENT-MODEL
function validateOrderForm() {
	
	//for order code
	if ($("#orderCode").val().trim() == "") {
		return "Please insert Order Code";
	}
	
	// for order name
	if ($("#orderName").val().trim() == "") {
		return "Please insert Order Name";
	}

	// for order price
	if ($("#orderPrice").val().trim() == "") {
		return "Please insert Order Price";
	}
	
	// whether price is numerical value
	var tmpPrice = $("#orderPrice").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Please insert a numerical value for Item Price";
	}
	
	// convert to decimal price
	$("#orderPrice").val(parseFloat(tmpPrice).toFixed(2));
	
	// for order description
	if ($("#orderDesc").val().trim() == "") {
		return "Please insert Order Description";
	}
	
	// for qty
		if ($("#qty").val().trim() == "") {
			return "Please insert Quantity";

		}
	return true;
}
