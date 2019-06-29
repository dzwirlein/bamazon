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
              console.log(res[i].itemid+ " | " + res[i].product_name + " | "+ res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");

          }
          selectItem(res);
      })

  }

  var selectItem = function(res){
    inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "What is the ID of the Item you would like to purchase?"
        },
        {   
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function(value){
                if(isNaN(value)===false){
                    return true;
                } else {
                    return false;
                }
            }

        }]).then(function(answer){

            console.log('Customer has selected: \n    item= '  + answer.item + '\n    quantity = ' + answer.quantity);
            var item = answer.item;
            var quantity = answer.quantity;
    
        
            var queryStr = 'SELECT * FROM products WHERE ?';
    
            connection.query(queryStr, {itemid: item}, function(err, res) {
                if (err) {throw err;
    
                } else {
                    var product = res[0];

                    if (quantity <= product.stock_quantity) {
                        console.log("The item you selected is in stock!");
    
                        var query = 'UPDATE products SET stock_quantity = ' + (product.stock_quantity - quantity) + ' WHERE itemid = ' + item ;
                      
                        connection.query(query, function(err, res) {
                            if (err) throw err;
    
                            console.log('Your oder has been placed! Your total is $' + product.price * quantity);
                            console.log("\n---------------------------------------------------------------------\n");
    
                            // End the database connection
                            connection.end();
                        })
                    } else {
                        console.log('Sorry, that item is not in stock');
                        console.log('Please modify your order.');
                        console.log("\n---------------------------------------------------------------------\n");
    
                       getInventory();
                    }
                }
            })
        })
    }
        

       