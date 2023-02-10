const inquirer = require("inquirer") 
// Import and require mysql2
const mysql = require('mysql2');
const {printTable} = require("console-table-printer")
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'number60',
    database: 'departments_db'
  },
  console.log(`Connected to the department_db database.`)
);

db.connect(function(){
  menu()
})

function menu() {
  inquirer.prompt([{
    type:"list",
    message:"Choose the following options",
    name:"option",
    choices:["view all departments", 
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role"
  ]

  }])
.then(response =>{
  if(response.option==="view all departments") {
    viewDepartment()
  }
  else if(response.option==="view all roles") {
    viewRoles()
  }
  else if(response.option==="view all employees") {
    viewEmployees()
  }
  else if(response.option==="add a department") {
    addDepartment()
  }
  else if(response.option==="add a role") {
    addRole()
  }
  else if(response.option==="add an employee") {
    addEmployee()
  }
  else if(response.option==="update an employee") {
    updateEmployee()
  }
})
}

function addEmployee() {
  db.query("select title as name,id as value from role",function(err,data){
   db.query("select concat(first_name,' ',last_name) as name, id as value from employee", function(err,employeeData){

    inquirer.prompt([{
      type: 'input',
      name: 'first_name',
      message: 'employees first name'
    },{
      type: 'input',
      name: 'last_name',
      message: 'employees last name'
    },{
      type: 'list',
      name: 'role',
      choices: data,
      message: "select the role of the employee"
    },{
      type: 'list',
      name: 'employee',
      choices: employeeData,
      message: "select their manager"
    }]).then(function(response){
      db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",[response.first_name,response.last_name,response.role,response.employee], function (err){
        viewEmployees()
      })
    })
   }) 
  
  })
}


function addRole() {
  db.query("select name, id as value from department", function(err,data){

 
  inquirer.prompt([{
    type: 'input',
    name: 'role',
    message: 'add the name of the role you want to create'
  },{
    type: 'input',
    name: 'salary',
    message: 'enter the salary for the added role'
  },{
    type: 'list',
    name: 'department',
    choices: data,
    message: "chose which department this role is in"
  }]).then(function(response){
    db.query("INSERT INTO role (title,salary,department_id) VALUES(?,?,?)",[response.role,response.salary,response.department],function(err){
      viewRoles()
    })
  })
})
}

function addDepartment() {
  inquirer.prompt([{
    type: 'input',
    name: 'department',
    message: 'add the name of the department you want to add'
  }]).then(function(response){
    db.query("INSERT INTO department (name) VALUES(?)",[response.department],function(err){
      viewDepartment()
        })
  })
}

function viewEmployees() {
  db.query("select * from employee", function(err,data){
    printTable(data)
    menu()
  })
}

function viewRoles() {
  db.query("select * from role", function(err, data){
    printTable(data)
    menu()
  })
}

function viewDepartment() {
  console.log("view department")
      db.query("select * from department", function(err,data){
        printTable(data)
        menu()
      })
}

