var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "",
  database: "emsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add", "View", "Update", "Exit"]
    })
    .then(function(answer) {
      console.log(answer)
      // based on their answers
      if (answer.task === "Add") {
        addEmployee();
      }
      else if (answer.task === "Update"){

      }
      else if (answer.task === "Exit"){
        connection.end();
      }
      else {
        inquirer.prompt({
          name:"typeView",
          type: "list",
          message: "Which would you like to view?",
          choices: ["Employees", "Departments", "Roles"]
        })
        .then(function(answer){
          if (answer.typeView === "Employees"){
            viewEmployee()
          }
          else if (answer.typeView === "Departments"){
            viewDepartment()
          } 
          else {viewRole()}
        })} 
    });
}


// function addEmployee() {
//   console.log("Creating new employee...\n");
//   var query = connection.query(
//     "INSERT INTO employee SET ?",
//     {
//       first_name: "Peter",
//       last_name: "Boyle",
//       roleId: 03,
//       mgrId: 48,
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " Employee added!\n");

//       updateTable();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }


// function viewEmployee() {
//   console.log("Table Employee...\n");
//   connection.query("SELECT * FROM employee", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }

// function viewRole() {
//   console.log("Table Roles...\n");
//   connection.query("SELECT * FROM role", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }

// function viewDepartment() {
//   console.log("Table Department...\n");
//   connection.query("SELECT * FROM department", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }