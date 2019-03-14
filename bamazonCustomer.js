var mysql = require("mysql");

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
    readItems();
  });

function readItems() {
    console.log("Reading all items...\n");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
        connection.end();
    });
}