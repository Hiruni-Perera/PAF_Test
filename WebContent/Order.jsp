<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import = "com.Order" %>
<%@ page import = "com.OrderAPI" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/order.js"></script>
<title>Sales Order Management</title>
</head>
<body>
	
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Sales Order Management </h1>
				<form id="formOrder" name="formOrder">
					OrderCode: 
					<input id="orderCode" name="orderCode" type="text" class="form-control form-control-sm">
					 <br> 
					OrderName:
					<input id="orderName" name="orderName" type="text" class="form-control form-control-sm"> 
					<br>
				    OrderPrice:
				    <input id="orderPrice" name="orderPrice" type="text" class="form-control form-control-sm"> 
				    <br> 
				    OrderDescription: 
				    <input id="orderDesc" name="orderDesc" type="text" class="form-control form-control-sm"> 
				    <br>
				    Quantity: 
				    <input id="qty" name="qty" type="text" class="form-control form-control-sm"> 
				    <br> 
				    <input id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidOrderIDSave" name="hidOrderIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				
				<div id="divOrderGrid">
					<%
						Order orderObj = new Order();
						out.print(orderObj.readOrder());
					%>
				</div>
			</div>
		</div>
	</div>

</body>
</html>