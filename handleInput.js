const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

function view(input) {
    const stringIn = `${input}`;
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


module.exports = view;