DROP DATABASE IF EXISTS emsDB;

CREATE DATABASE emsDB;

USE emsDB;

CREATE TABLE department (
  deptId INT(3) PRIMARY KEY,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT(2) PRIMARY KEY,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  deptId INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT(3) PRIMARY KEY,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  roleId INT NULL,
  mgrId INT NULL,
);