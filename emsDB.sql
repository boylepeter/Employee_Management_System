DROP DATABASE IF EXISTS emsDB;

CREATE DATABASE emsDB;

USE emsDB;

CREATE TABLE department (
  id INT(3) NULL,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT(2) NULL,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  deptId INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT(3) NULL,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  roleId INT NULL,
  mgrId INT NULL,
  PRIMARY KEY (id)
);