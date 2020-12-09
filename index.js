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
      choices: ["Add", "View", "Update", "Delete", "Exit"]
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
        inquirer.prompt({
          name: "whichUpdate",
          type: "list",
          message: "Which would you like to update?",
          choices: ["Role", "Manager"]
        }).then(function(answer){
        if (answer.whichUpdate === "Role"){
          updateRole()}
        else {updateManager()}})
      }
      else if (answer.task === "Exit"){
        connection.end();
      }
      else if (answer.task === "Delete"){
        inquirer.prompt({
          name: "whichDelete",
          type: "list",
          message: "Which would you like to delete?",
          choices: ["Employee", "Department", "Role"]
        }).then(function(answer){
          if (answer.whichDelete === "Employee"){deleteEmployee()}
          else if (answer.whichDelete === "Department"){deleteDepartment()}
          else {deleteRole()}
        })
      }
      else {
        inquirer.prompt({
          name:"typeView",
          type: "list",
          message: "Which would you like to view?",
          choices: ["Employees", "Managers", "Departments", "Roles"]
        })
        .then(function(answer){
          if (answer.typeView === "Employees"){
            viewEmployee()
          }
          else if (answer.typeView === "Departments"){
            viewDepartment()
          } 
          else if (answer.typeView === "Managers"){
            viewByManager()
          }
          else {viewRole()}
        })} 
    });
}


function addEmployee() {
  console.log("Creating new employee...\n");
  inquirer.prompt([
    {name: "id",
    type: "input",
    message: "What is the employee ID? (this should be their employees ID.)"},
    {name: "first_name",
    type: "input",
    message: "What is the new employees first name?"},
    {name: "last_name",
    type: "input",
    message: "What is the new employees last name?"},
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
  )
};

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
      {deptId: answer.deptId,
      name: answer.name},
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Department added!\n");
        viewDepartment()
  })
  })
};

function updateRole(){
  console.log("Update roles...\n")
  inquirer.prompt([
    {name: "id",
    type: "input",
    message: "What is the employee ID?"},
    {name: "title",
    type: "input",
    message: "What is the employee title?"},
    {name: "salary",
    type: "input",
    message: "What is the employee salary?"},
    {name: "deptId",
    type: "input",
    message: "What is the employee department ID?"}])
  .then(function(answer){
    connection.query(
      "INSERT INTO role SET ?",
      {id: answer.id,
      title: answer.title,
      salary: answer.salary,
      deptId: answer.deptId},
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Role updated!\n");
        viewRole()
  })
  })
}

function updateManager(){
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: "What is the Employees ID?"
  },
  {name: "mgrId",
  type: "input",
  message: "What is the new managers ID?"}])
  .then(function(answer){
    connection.query(
      "UPDATE employee SET mgrId = '" + answer.mgrId + "' WHERE id = " + answer.id,
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Manager updated!\n");
        viewEmployee()
      })
  })
 
}

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

function viewByManager(){
  console.log("View by manager...\n");
  connection.query("SELECT * FROM employee ORDER BY mgrId", function(err, res){
    if (err) throw err;
    console.log(res);
    console.table(res);
    connection.end();
  })
}

function deleteEmployee(){
  inquirer.prompt({
    name: "id",
    type: "input",
    message: "What is the employees ID that you want to delete?"
  }).then(function(answer){
  connection.query(
    "DELETE FROM employee WHERE id =" + answer.id,
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Manager updated!\n");
      viewEmployee()})
    })
};

function deleteDepartment(){
  inquirer.prompt({
    name: "id",
    type: "input",
    message: "What is the department ID that you want to delete?"
  }).then(function(answer){
  connection.query(
    "DELETE FROM department WHERE deptId = " + answer.id,
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " department updated!\n");
      viewDepartment()})
    })
};

function deleteRole(){
  inquirer.prompt({
    name: "id",
    type: "input",
    message: "What is the role ID that you want to delete?"
  }).then(function(answer){
  connection.query(
    "DELETE FROM role WHERE id =" + answer.id,
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " role updated!\n");
      viewRole()})
    })
};