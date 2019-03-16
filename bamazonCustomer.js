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
        console.log(results);
        promptOption();
        // connection.end();
    });
}

function promptOption() { 
  inquirer
      .prompt([
          {
          type: "input",
          message: "What is the Item ID of the product you would like to purchase?",
          name: "option1"
          }
      ])
      .then(function(inquirerResponse1) {
          console.log("Searching item...\n");
          if (inquirerResponse1.option1) {
            // console.log(inquirerResponse.option1);
            connection.query(
              "SELECT * FROM products WHERE item_id=?", [inquirerResponse1.option1],
          
            function (err, results) {
                if (err) throw err;
                results.forEach(results=> {
                  inquirer
                      .prompt([
                          {
                          type: "input",
                          message: "How many units of " + results.product_name + " would you like to buy?",
                          name: "option2"
                          }
                      ])
                      .then(function(inquirerResponse2) {
                          var updatedStock = results.stock_quantity - inquirerResponse2.option2;
                          console.log("Checking stock... " + "We have " + results.stock_quantity + " units left\n");
                          if (results.stock_quantity < inquirerResponse2.option2) {
                              console.log("Sorry, there's not enough stock.");
                              connection.end();
                          }
                          else {
                              if (inquirerResponse2.option2) {
                              // console.log(inquirerResponse2.option2);                            
                              connection.query(
                                "SELECT * FROM products WHERE item_id=?", [inquirerResponse1.option1],
                            
                              function (err, results) {
                                  if (err) throw err;
                                  results.forEach(results=> {                                
                                  connection.query(
                                    "UPDATE products SET stock_quantity=" + updatedStock + " WHERE item_id=" + inquirerResponse1.option1,
                                    function (err, results) {
                                        if (err) throw err;
                                        console.log("Stock left: " + updatedStock + "\n");
                                    }
                                );
                                });


                              });
                            }
                          }
                      });
                });
                // console.log("How many units of " + results.product_name + " would you like to buy?")});
                // connection.end();
            });
          }
      });
}