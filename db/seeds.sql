INSERT INTO department  (name)
VALUES  ( "manufacuring"),
        ( "legal");

INSERT INTO role (department_id, title, salary)
VALUES  (001, "manager", 80000),
        ( 001, "project lead", 60000),
        ( 001, "operator", 50000),
        ( 002, "human resources", 60000);

INSERT INTO employee (role_id, first_name, last_name)
VALUES  (001, "Ronald", "Brown"),
        (003, "Jacob", "Wright"),
        (004, "Steven", "Universe"),
        (002, "Jesse", "Smart"),
        (003, "Marcus", "Dutton"),
        (003, "Sara", "Strong");


