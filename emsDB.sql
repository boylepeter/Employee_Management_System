DROP DATABASE IF EXISTS emsDB;

CREATE DATABASE emsDB;

USE emsDB;

CREATE TABLE department (
  deptId INT(3) PRIMARY KEY,
  name VARCHAR(45) NULL
);

CREATE TABLE role (
  id INT(2) PRIMARY KEY,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  deptId INT NULL
);

CREATE TABLE employee (
  id INT(3) PRIMARY KEY,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  roleId INT NULL,
  mgrId INT NULL
);


INSERT INTO department (deptId, name)
VALUES 
(01, "Manager"),
(02, "Developer"),
(03, "Engineer"),
(04, "Corporate");

INSERT INTO employee (id, first_name, last_name, roleId, mgrId)
VALUES (400, "Peter", "Boyle", 02, 312),
(312, "Courtenay", "Schrader", 01, 210),
(210, "Dennis", "Matlock", 04, 210),
(390, "Ryan", "Grendel", 02, 312),
(514, "Whitney", "Hayes", 03, 187),
(187, "William", "Malzo", 01, 210);

INSERT INTO role (id, title, salary, deptId)
VALUES 
(400, "Developer", 70000.00, 02),
(312, "Manager", 75000.00, 01),
(210, "Corporate", 110000.00, 04),
(514, "Engineer", 100000.00, 03);