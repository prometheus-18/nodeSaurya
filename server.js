const path = require('path');
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));


app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define the port
const Port = 3000;

// Parse application/json
app.use(bodyParser.json());

//================= Cors ===================//
const corsOpts = {
  origin: "*",
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

app.get('', (req, res) => {
  res.send("Shaurya is Ready to go");
});



// DB import and sync (if needed in the future)
// const db = require("./IndexFiles/modelsIndex");
// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db success...");
//   }).catch((err) => {
//     console.log("Failed to sync db...", err.message)
//   });

//================= Router ==================//
require('./APIs/admin/routes/admin.routes')(app);
require('./APIs/product/router/productRouter')(app);

// Server listen
app.listen(Port, () => {
  console.log(`Service is running on port number ${Port}`);
});
