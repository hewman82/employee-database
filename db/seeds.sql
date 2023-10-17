INSERT INTO department (department_name)
VALUES ("Accounting"),
       ("Sales"),
       ("Planetary Defense"),
       ("Planetary Offense");

INSERT INTO role (title, salary, department_id)
VALUES ("Defense Manager", 1200000, 3),
       ("Laser Operator", 20000, 3),
       ("Laser Technician", 40000, 3),
       ("Laser Sabatuer", 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Sandler", 1, NULL),
       ("Carl", "Sparks", 2, 1),
       ("Jodi", "Miller", 3, 1);
