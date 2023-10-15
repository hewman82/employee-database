DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  section INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  FOREIGN KEY (employee_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);