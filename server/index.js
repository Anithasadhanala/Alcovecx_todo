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
    const {projectName} = request.body;
  
    const q = `insert into projects values("${uuid}","${projectName}")`;
    db.query(q,(err,res)=>{
      console.log(res)  
        response.send(res)
    })

});


app.post('/todo-add',function(request,response){
  
  const uuid = uuidv4()
  const {taskName,startDate,endDate,taskStatus,projectId} = request.body;


  const q = `insert into todo values("${uuid}","${projectId}","${taskName}","${startDate}","${endDate}","${taskStatus}");`

  console.log(q,"8888888888888888888888888888888888888888888888")

  db.query(q,(err,res)=>{
    console.log(res,"==========================================")  
      response.send(res)
  })

});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});