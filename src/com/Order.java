package com;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class Order {
	

	public Connection connect()
	{
		Connection conn = null;
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/paf","root","Abcd123#");
			System.out.println("Successfully connected");
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return conn;
	}
	
	
	public String readOrder()
	{
		String output = "";
		try {
			Connection conn =connect();
			if(conn == null)
			{
				return "Error occured connecting  to  database while reading";
				
			}
		
		/*Prepare the html table to be display the output*/
		output = "<table border='1'><tr><th>Order Code</th> <th>Order Name</th><th>Order Price</th>"
				+ "<th>Order Description</th> <th>Quantity</th><th>Update</th><th>Remove</th></tr>";
		
		String query = "select * from order";
		Statement st = conn.createStatement();
		ResultSet rs = st.executeQuery(query);
		
		// iterating  the rows in the result set
					while (rs.next()) {
						String orderID = Integer.toString(rs.getInt("orderID"));
						String orderCode = rs.getString("orderCode");
						String orderName = rs.getString("orderName");
						String orderPrice = Double.toString(rs.getDouble("orderPrice"));
						String orderDesc = rs.getString("orderDesc");
						String Quantity = rs.getString("Quantity");
						
						// Add into the html table
						output += "<tr><td><input id='hidOrderIDUpdate' name='hidOrderIDUpdate' type='hidden' value='" + orderID
								+ "'>" + orderCode + "</td>";
						output += "<td>" + orderName + "</td>";
						output += "<td>" + orderPrice + "</td>";
						output += "<td>" + orderDesc + "</td>";
						output += "<td>" + Quantity + "</td>";
						
						// buttons
						output += "<td><input name='btnUpdate' type='button' value='Update' "
								+ "class='btnUpdate btn btn-secondary' data-itemid='" + orderID + "'></td>"
								+ "<td><input name='btnRemove' type='button' value='Remove' "
								+ "class='btnRemove btn btn-danger' data-itemid='" + orderID + "'></td></tr>";
					}
					
					conn.close();
					
					// Complete the html table
					output += "</table>";
				} catch (Exception e) {
					output = "Error occured while reading the orders";
					System.err.println(e.getMessage());
				}
				return output;
	}
	
	
	public String insertOrder(String code, String name, String price, String desc , String qty) 
	{
		String output = "";
		
		
		try {
			Connection conn = connect();
			if (conn == null) {
				return "Error occured while connecting to the database when inserting";
			}

			
			// create a prepared statement
			String query = " insert into order (`orderID`,`orderCode`,`orderName`,`orderPrice`,`orderDesc`,'Quantity')"
					+ " values (?, ?, ?, ?, ?, ?)";
			
			PreparedStatement ps = conn.prepareStatement(query);
			// binding values
			ps.setInt(1, 0);
			ps.setString(2, code);
			ps.setString(3, name);
			ps.setDouble(4, Double.parseDouble(price));
			ps.setString(5, desc);
			ps.setString(6, qty);
			
			ps.execute();
			
			conn.close();
			String newOrders = readOrder();
			output = "{\"status\":\"success\", \"data\": \"" + newOrders + "\"}";
			
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\": \"Error occured while  inserting order\"}";
			System.err.println(e.getMessage());
		}
		return output;
	}
	

	public String updateOrder(String orderID, String code, String name, String price, String desc , String qty)
	{
		String output = "";
		
		try {
			Connection conn = connect();
			if (conn == null) {
				return "Error occured  connecting  to the database while updating.";
			}
			
			// create a prepared statement
			String query = "UPDATE order SET orderCode = ?, orderName = ?, orderPrice = ?, orderDesc = ?, Quantity = ?  WHERE orderID=?";
			PreparedStatement ps = conn.prepareStatement(query);
			
			// binding values
			ps.setString(1, code);
			ps.setString(2, name);
			ps.setDouble(3, Double.parseDouble(price));
			ps.setString(4, desc);
			ps.setString(5, qty);
			ps.setInt(6, Integer.parseInt(orderID));
			ps.execute();
			
			conn.close();
			
			String newOrders = readOrder();
			output = "{\"status\":\"success\", \"data\": \"" + newOrders + "\"}";
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\": \"Error occured while updating order\"}";
			
			System.err.println(e.getMessage());
		}
		return output;
	}
	

	public String deleteOrder(String orderID) {
		String output = "";
		
		try {
			Connection conn = connect();
			if (conn == null) {
				return "Error occured while connecting to the database for deleting";
			}
			
			String query = "delete from order where orderID=?";
			
			PreparedStatement ps = conn.prepareStatement(query);
			// binding values
			ps.setInt(1, Integer.parseInt(orderID));
			ps.execute();
			
			conn.close();
			String newOrder = readOrder();
			output = "{\"status\":\"success\", \"data\": \"" + newOrder + "\"}";
			
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":  \"Error occured while deleting order\"}";
			System.err.println(e.getMessage());
		}
		return output;
	}
	
}