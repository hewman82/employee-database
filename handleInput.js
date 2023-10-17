const mysql = require('mysql2');
const inquirer = require ('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    }
  );

function viewData(stringIn) {
  if(stringIn === 'View all departments') {
      var queryString = `SELECT * 
      FROM department`
  } else if(stringIn === 'View all roles') {
      var queryString = `SELECT role.id, role.title, role.salary, department.department_name 
      FROM role 
      JOIN department on role.department_id = department.id;`
  } else if(stringIn === 'View all employees') {
      var queryString = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee 
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON m.id = employee.manager_id;`
  }
  db.query(`${queryString}`, function (err, results) {
    if(err) {
      console.log(err);
    }
    console.table(results);
  });
}

async function addData(stringIn) {
  if(stringIn === 'Add a department') {
    await inquirer.prompt([{
      type: 'input',
      name: 'department',
      message: 'Please enter a department name'
    }])
    .then((res) => {
      var queryString = `INSERT INTO department (name) 
      VALUES ("${res.department}")`;
      db.query(`${queryString}`, function (err, results) {
          if(results) {
          console.log(`${res.department} added to department table`);
          } else { console.log(err) }
      })
    }, (err) => err ? console.log(err) : console.log('User data saved'));
  } else if(stringIn === 'Add a role') {
    await inquirer.prompt([{
      type: 'input',
      name: 'title',
      message: 'Please enter a title for the role',
    }, {
      type: 'input',
      name: 'salary',
      message: 'Please enter a salary for the role'
    }, {
      type: 'input',
      name: 'id',
      message: 'Please enter a department id for the role',
    }])
    .then((res) => {
      var queryString = `INSERT INTO role (title, salary, department_id)
      VALUES ("${res.title}", "${res.salary}", "${res.id}")`;
      db.query(`${queryString}`, function (err, results) {
        if(results) {
          console.log(`${res.title} added to role table`);
        } else { console.log(err) }
      });
    }, (err) => err ? console.log(err) : console.log('User data saved'));
  } else if(stringIn === 'Add an employee') {
    await inquirer.prompt([{
      type: 'input',
      name: 'firstName',
      message: 'Please enter a first name for the employee',
    }, {
      type: 'input',
      name: 'lastName',
      message: 'Please enter a last name for the employee',
    }, {
      type: 'input',
      name: 'role',
      message: 'Please enter a role id for the employee',
    }, {
      type: 'input',
      name: 'manager',
      message: 'Please enter a manager id for the employee',
    }])
    .then((res) => {
      var queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ("${res.firstName}", "${res.lastName}", "${res.role}", "${res.manager}")`;
      db.query(`${queryString}`, function (err, results) {
        if(results) {
          console.log(`${res.firstName} ${res.lastName} added to employee table`);
        } else { console.log(err) }
      });
    }, (err) => err ? console.log(err) : console.log('User data saved'));
  } else if(stringIn === 'Update an employee role') {
    await inquirer.prompt([{
      type: 'input',
      name: 'employee',
      message: 'Please enter an employee id',
    }, {
      type: 'input',
      name: 'role',
      message: 'Please enter a new role id for the employee',
    }])
    .then((res) => {
      var queryString = `UPDATE employee 
      SET employee.role_id = ${res.role}
      WHERE employee.id = ${res.employee};`;
      db.query(`${queryString}`, function (err, results) {
        if(results) {
          console.log(`Role updated in employee table`);
        } else { console.log(err) }
      })
    }, (err) => err ? console.log(err) : console.log('User data saved'));
  }

}

module.exports = { viewData, addData };