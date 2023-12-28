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
  console.log(projectId,"&&&&&&&&&&&&&&&");
  const q = `select * from todo where project_id = "${projectId}";`
  db.query(q,(err,res)=>{
  console.log(res,"---------------");
  response.send(res);
})
});





app.post('projects/add',function(request,response){
    const uuid = uuidv4()
    const q = `insert into projects values("${uuid}","sai")`;
    db.query(q,(err,res)=>{
        console.log(res);    
        response.send(res)
    })

});

app.post('todos/add',function(req,res){

    const uuid = uuidv4();
    const uuid_project = uuidv4();
    const startTime =new Date()
    const endTime = new Date()
    console.log(startTime)
    const q = `INSERT INTO todo values ("${uuid}","${uuid_project}","Anitha",'2002-07-26','2002-07-26',"review")`;
  db.query(q,(err,ress)=>{
    console.log(ress);
  })
});









 












app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});