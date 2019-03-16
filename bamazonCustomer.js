var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Raprockchill!",
  database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });

function start() {
    console.log("Reading all items...\n");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        // For each entry in the results obtained from the products database, display item's info
        results.forEach(results=> {
          console.log("Product Name: " + results.product_name + "\n Item ID: " + results.item_id + 
          "\n Department: " + results.department_name + "\n Price: $" + results.price + "\n Current Stock: " + results.stock_quantity + "\n");
        });
        
        promptOption();
    });
}

function promptOption() { 
  inquirer
      // This is the first question asked
      .prompt([
          {
          type: "input",
          message: "What is the Item ID of the product you would like to purchase?",
          name: "option1"
          }
      ])
      .then(function(inquirerResponse1) {
          console.log("Searching item...\n");
          
          // Depending on user's chosen input to the first question, the following code will grab the item the user chose
          if (inquirerResponse1.option1) {
            connection.query(
              "SELECT * FROM products WHERE item_id=?", [inquirerResponse1.option1],
          
            function (err, results) {
                if (err) throw err;
                results.forEach(results=> {
                  inquirer
                      // This is the second question asked
                      .prompt([
                          {
                          type: "input",
                          message: "How many units of " + results.product_name + " would you like to buy?",
                          name: "option2"
                          }
                      ])
                      .then(function(inquirerResponse2) {
                          // The updatedStock variable lets us define the stock after user buys desired amount (i.e., subtract from current stock)
                          var updatedStock = results.stock_quantity - inquirerResponse2.option2;

                          // The total variable calculates the transaction total (item price * # of units user chose to buy)
                          // toFixed limits the decimal places to 2
                          var total = (results.price * inquirerResponse2.option2).toFixed(2);

                          console.log("Checking stock... " + "We have " + results.stock_quantity + " units left\n");

                          // If the current stock is less than the amount user wants to buy, say there's not enough stock and end the connection to database
                          if (results.stock_quantity < inquirerResponse2.option2) {
                              console.log("Sorry, there's not enough stock.");
                              connection.end();
                          }
                          // Otherwise, if there is enough stock, the following code will update the stock number of that specific item and display transaction total, and then end the connection
                          else {
                              if (inquirerResponse2.option2) {                                                    
                              connection.query(
                                "SELECT * FROM products WHERE item_id=?", [inquirerResponse1.option1],
                            
                              function (err, results) {
                                  if (err) throw err;
                                                                 
                                  connection.query(
                                    "UPDATE products SET stock_quantity=" + updatedStock + " WHERE item_id=" + inquirerResponse1.option1,
                                    function (err, results) {
                                        if (err) throw err;
                                        console.log("Stock left: " + updatedStock + "\n");
                                        console.log("Your total is: $" + total + "\n");
                                        connection.end();
                                    }
                                );

                                });
                              }
                          }
                      });
                });
            });
          }
      });
};