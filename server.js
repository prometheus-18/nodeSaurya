const path = require('path');
const cors = require("cors");
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//================= Cors ===================//

const corsOpts = {
    origin: "*",
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  };
  app.use(cors(corsOpts));

app.get('',(req,res)=>{
    res.send("Shaurya is Ready to go")
})

const db = require("./IndexFiles/modelsIndex");
const Role = db.role; 

//========== DB Sync ==========//

// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db success...");
//   }).catch((err) => {
//     console.log("Failed to sync db...", err.message)
//   });

  
//============ Express ===========//

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the ERP Back-End!" });
  });
  
  db.sequelize.sync()          
    .then(() => {  
    console.log("Synced db success...");
    }).catch((err) => {
    console.log("Failed to sync db...", err.message)
    }) 

const Port =3000
app.listen(Port,()=>{
    console.log(`service is running on the port number ${Port}`)
})
  

//================= Router ==================//
require('./APIs/admin/routes/admin.routes')(app);