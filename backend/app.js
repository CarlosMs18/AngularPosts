const express = require('express')
/* mongodb+srv://carlos:<bDifvzvxNdABDszT>@cluster0.vpcao9r.mongodb.net/test */

const postsRoutes =  require('./routes/posts')

/* */
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

app.use("/api/posts" ,postsRoutes);
/*  */

module.exports = app;
