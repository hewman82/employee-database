const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const {viewData, addData} = require('./handleInput.js');


const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  inquirer
    .prompt([{
        type: 'checkbox',
        name: 'option',
        choices: ['View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role']
    }])
        .then((res) => {
            const stringIn = `${res.option}`;
            if (stringIn === "View all departments" || stringIn === "View all roles" || stringIn === "View all employees") {
              viewData(stringIn);
            } else {
              addData(stringIn);
            }
        }, (err) => err ? console.log(err) : console.log('User data saved'));



  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
