const express = require('express');
const app = express();
const phpmyadmin = require('mysql')
const bodyParser = require('body-parser')
const cors = require("cors")
const path = require('path')
const { v4: uuidv4 } = require('uuid');


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


const db = phpmyadmin.createPool({
    host: "localhost",
    user: "root",
    port: "3030",
    password: "Anith@11",
    database: "alcovexdb",
    insecureAuth : true
})



app.get('/projects', function (request, response) {

    const q = "select * from projects";
    db.query(q,(err,res)=>{
        console.log(res); 
        response.send(res)  
         
    })

});


app.get('/todos', function (request, response) {

    const q = "select * from todo"
    db.query(q,(err,res)=>{
    console.log(res);
    response.send(res);
  })
});


app.get('/todo/:projectId', function (request, response) {
  
  const { projectId } = request.params;
  const q = `select * from todo where project_id = "${projectId}";`
  db.query(q,(err,res)=>{
  response.send(res);
})
});



app.post('/project-add',function(request,response){
    const uuid = uuidv4()
    const {projectDetails} = request.body;

  const {newProject} = projectDetails
  
    const q = `insert into projects values("${uuid}","${newProject}")`;
    db.query(q,(err,res)=>{
      console.log(res)  
        response.send(res)
    })

});


app.post('/todo-add',function(request,response){
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  const uuid = uuidv4()
  console.log(request)
  const {projectDetails} = request.body;
  conso
  const {newProjectName} = projectDetails
  console.log(request,"000000000000000000000000000000000000000000000000000000000000000000000000000000000000")

  const q = `insert into projects values("${uuid}","${newProjectName}")`;
  db.query(q,(err,res)=>{
    console.log(res)  
      response.send(res)
  })

});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});