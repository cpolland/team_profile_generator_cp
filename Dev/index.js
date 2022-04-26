const inquirer = require('inquirer');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const path = require("path");
const fs = require('fs');
const generateHtml = require("./src/generatehtml");
const dist = path.resolve(__dirname,"dist");
const placeFile = path.join(dist,"index.html");
const teamMembers = [];

function addManager (){
    inquirer.prompt([
       {
           type: "input",
           name: "Name",
           message: "What is the name of the manager"

       },
    {
        type: "input",
        name: "ID",
        message: "What is the Employees ID"

    },
    {
        type: "input",
        name: "OfficeNum",
        message: "What is the employee's office number?"

    },
    {
        type: "input",
        name: "email",
        message: "What is the email?"

    },
    

       
    ]).then(response =>{
        teamMembers.push(new Manager(response.Name,response.email,response.ID,response.OfficeNum))
        addMember()
        
    })}

    function addEngineer (){
        inquirer.prompt([
           {
               type: "input",
               name: "Name",
               message: "What is the name of the employee?"
    
           },
        {
            type: "input",
            name: "ID",
            message: "What is the Employees ID"
    
        },
        {
            type: "input",
            name: "Github",
            message: "What is the employee's Github Username?"
    
        },
        {
            type: "input",
            name: "email",
            message: "What is the email?"
    
        },
        
    
           
        ]).then(response =>{
            teamMembers.push(new Engineer(response.Name,response.email,response.ID,response.Github))
            addMember()
            
        })}
    

function addIntern (){
    inquirer.prompt([
       {
           type: "input",
           name: "Name",
           message: "What is the name of the emplyee"

       },
    {
        type: "input",
        name: "ID",
        message: "What is the Employees ID"

    },
    {
        type: "input",
        name: "school",
        message: "What school does/did the intern attend?"

    },
    {
        type: "input",
        name: "email",
        message: "What is the email?"

    },
    

       
    ]).then(response =>{
        teamMembers.push(new Intern(response.Name,response.email,response.ID,response.school))
        addMember()
        
    })}
    
function addMember (){
    inquirer.prompt([
        {
            type: "list",
            name: "Position",
            message: "Which employee would you lke to add?",
            choices: ['Engineer','Intern','Manager','none']
    
        },  
    ]).then(response =>{
        if(response.Position === "Manager"){
            addManager()
        } else if (response.Position === "Engineer"){
            addEngineer()
        }else if (response.Position === "Intern"){
            addIntern()
        }else if (response.Position === "none"){
            generateTeamCards()
        }
            
    })
    function generateTeamCards (){
        fs.writeFileSync (placeFile,generateHtml(teamMembers))
    }
}

addMember();


