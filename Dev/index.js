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
function addMember (){
    inquirer.prompt([
        {
            type: "list",
            name: "Position",
            message: "What kind of employee would you like to add?",
            choices: ['Engineer','Intern','Manager','none']
    
        },  
    ]).then(response =>{
        if(response.Position === "Manager"){
            addManager()
        } else if (response.Position === "Engineer"){
            //add engineer 
        }else if (response.Position === "Intern"){

        }else if (response.Position === "none"){
            generateTeamCards()
        }
            
    })
    function generateTeamCards (){
        fs.writeFileSync (placeFile,generateHtml(teamMembers))
    }
}

addManager(); 