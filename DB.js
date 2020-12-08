var mysql = require("mysql");

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
  createProduct();
});


function createEmployee() {
  console.log("Creating new employee...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: "Peter",
      last_name: "Boyle",
      roleId: 03,
      mgrId: 48,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Employee added!\n");

      updateTable();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}


function viewEmployee() {
  console.log("Table Employee...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function viewRole() {
  console.log("Table Roles...\n");
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function viewDepartment() {
  console.log("Table Department...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}