const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://carlitos:sdRnoQYjA7iVmQFP@cluster0.vpcao9r.mongodb.net/testt"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;

/* const path = require('path')
const express = require('express')


const postsRoutes =  require('./routes/posts')


const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')





const app = express();
app.use(cors())



mongoose.connect('mongodb+srv://carlitos:sdRnoQYjA7iVmQFP@cluster0.vpcao9r.mongodb.net/testt')
                        .then(() => {
                          console.log('Connected to database!')
                        })
                        .catch((err) => {
                          console.log('Connection Failed!')
                          console.log(err)
                        })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.use("/images", express.static(path.join("backend/images")))

app.use("/api/posts" ,postsRoutes);
/*  */

/* module.exports = app; */

