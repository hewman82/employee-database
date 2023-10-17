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



async function viewData(stringIn) {
  if(stringIn === 'View all departments') {
      var queryString = `SELECT * 
      FROM department`
  } else if(stringIn === 'View all roles') {
      var queryString = `SELECT role.id, role.title, role.salary, department.department_name 
      FROM role 
      JOIN department on role.department_id = department.id;`
  } else if(stringIn === 'View all employees') {
      var queryString = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee.manager_id
      FROM employee 
      JOIN role on employee.role_id = role.id
      JOIN department on role.department_id = department.id;`
  }
  db.query(`${queryString}`, function (err, results) {
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
        console.log(`${res.department} department added`);
        });
    }, (err) => err ? console.log(err) : console.log('User data saved'));

  }

}

module.exports = { viewData, addData };