SELECT
    employee.first_name AS employee,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM
    employee
        LEFT JOIN
    employee m ON m.id = employee.manager_id;