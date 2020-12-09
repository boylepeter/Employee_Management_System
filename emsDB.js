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
        inquirer.prompt({
          name: "whichAdd",
          type: "list",
          message: "Would you like to add an employee or department?",
          choices: ["Employee", "Department"]
        }).then(function(answer){
          if (answer.whichAdd === "Employee"){
            addEmployee();
          }else{addDepartment()}
        })
      }
      else if (answer.task === "Update"){
        updateEmployee()
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


function addEmployee() {
  console.log("Creating new employee...\n");
  inquirer.prompt([{
    name: "first_name",
    type: "input",
    message: "What is the new employees first name?"},
    {name: "last_name",
    type: "input",
    message: "What is the new employees last name?"},
    {name: "id",
    type: "input",
    message: "What is the employee ID? (this should be their employees ID.)"},
    {name: "roleId",
    type: "input",
    message: "What is the new employees role ID?"},
    {name: "mgrId",
    type: "input",
    message: "What is the employees managers ID"}
  ]).then(function(answer){
    connection.query(
    "INSERT INTO employee SET ?",
    {
      id: answer.id,
      first_name: answer.first_name,
      last_name: answer.last_name,
      roleId: answer.roleId,
      mgrId: answer.mgrId,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Employee added!\n");

      viewEmployee();
    })}
  )}

function addDepartment(){
  console.log("Creating department...\n")
  inquirer.prompt([
    {name: "deptId",
    type: "input",
    message: "What is the department id?"},
    {name: "name",
    type: "input",
    message: "What is the department name?"}])
  .then(function(answer){
    connection.query(
      "INSERT INTO department SET ?",
      {id: answer.deptId,
      name: answer.name},
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Department added!\n");
        viewDepartment()
  })
  })};


function viewEmployee() {
  console.log("Table Employee...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    console.table(res);
    connection.end();
  });
};

function viewRole() {
  console.log("Table Roles...\n");
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    console.table(res);
    connection.end();
  });
};

function viewDepartment() {
  console.log("Table Department...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    console.table(res);
    connection.end();
  });
}