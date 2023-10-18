INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 1200000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Sandler", 1, NULL);
