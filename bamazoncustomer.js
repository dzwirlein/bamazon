var mysql = require('mysql');

var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
  
    
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "OnWisconsin1!",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
   console.log("connection successful")

   getInventory();
  });


  var getInventory = function(){
      connection.query("SELECT * FROM products", function(err, res){
          for(var i=0; i<res.length; i++){

          }
      })

  }

  var selectItem = function(res){
    inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "What would you like to purchase?"
        }]).then(function(answer){
            
        })

  }