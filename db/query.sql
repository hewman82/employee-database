SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, employee.manager_id
FROM employee 
JOIN role on employee.role_id = role.id
JOIN department on role.department_id = department.id;
