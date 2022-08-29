/*
 * Christopher Sasanuma
 * Copyright (c)
 * 8/10/2022
 */


// Main imports
import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import path from 'path';
import bodyParser from 'body-parser';
import AWS from "aws-sdk";
import mongoose from "mongoose";

import User from './models/users.js';

// Imports that I'm not too sure about
import { allowedNodeEnvironmentFlags } from "process";
import { clear } from "console";




const __dirname = path.resolve();

const port = 8000;

// Connect to MongoDB
//Purpose: Connection string to connect to database
const dbURI = 'mongodb+srv://sasanumac:Jamallavine$0@1uphealth.akcwm6z.mongodb.net/1uphealth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    //Promise: then takes a call back function that is fired when the connection to the db is made

    // Key idea: We only want to listen to the app and load the data to a blog 
    //           when we've made connection to the data base
    .then((result) => app.listen(port, () => {
            console.log("Port running on http://localhost:" + port);
        }))
    .catch((err) => console.log(err));

const app = express();
app.use(express.static(__dirname +'.public'));
app.use(express.json());
app.use(cors());
app.use("/", express.static("public"));


app.get("/", (request, response)=> {
    response.status(200).sendFile(__dirname + '/index.html');
});


// Mongoose and mongo sandbox routes 
app.get('/add-user', (req, res) => {
    const user = new User({ 
        userId: "123jdkafds",
        userName: "christophersasanuma0", 
        email: "christophersasanuma0@gmail.com", 
        segment: 1
    });
    user.save()
      .then((result) => {
          res.send(result)
      })
      .catch((err)=>{
          console.log(err);
      });
});


app.get('/all-users', (req, res) => {
    User.find()
      .then((result) => {
          res.send(result)
      })
      .catch((err) => {
          console.log(err)
      })
  
})

// Handler for Single User 
app.get('/single-user', (req, res) => {
    User.findById("630463ca1bf7e0eadf85c538")
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    });
});







// app.listen(port, () => {
//     console.log("Port running on http://localhost:" + port);
// });

// API Middlware
app.use(express.json()); //Used to accept the data in JSON format
app.use(express.urlencoded()); //Used to decode the data sent through html form



// App.post handler
/* Purpose: post handler for the user message. The form data is passed through
            urlencodedParser variable, and can be access through the 'req' */

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/', (req, res) => {
    const users = 
        {
            'segment1': [
                "sashasasanuma@gmail.com",
                "christophersasanuma0@gmail.com"        
            ],
    
            'segment2':
            [
                "nandika.chirala@vanderbilt.edu",
                "nitinbali2801@gmail.com"
    
            ],
    
            'segment3': [
                "nandikachirala@gmail.com",
                "Alexandra.sasanuma@tufts.edu"
            ]
        };


    // Email Message & Segment Boolean value 
    var segment1 = req.body["segment1"];
    var segment2 = req.body["segment2"];
    var segment3 = req.body["segment3"];
    var subject = req.body["subject"];
    var emailBody = req.body["emailBody"];


    var emailList = [];
    if (segment1 == '1'){
        //Get segment 1 user emails from MongoDB, then load to Email list
        for (var i in users['segment1']){
            emailList.push(users['segment1'][i]);
        }
    }
    if (segment2 == '1'){
          //Get segment 2 user emails from MongoDB, then load to Email list
        for (var i in users['segment2']){
            emailList.push(users['segment2'][i])
        }
    }

    if (segment3 == '1'){
        //Get segment 3 user emails from MongoDB, then load to Email list
        for (var i in users['segment3']){
            emailList.push(users['segment3'][i]);
        }
    }

    // Set the region 
    AWS.config.update({region: 'us-west-2'});
    // Create sendEmail params
    var params = {
        Destination: { /* required */
          CcAddresses: [
            'sasanumac@gmail.com',
            /* more items */
          ],
          ToAddresses: emailList
        },
        Message: { /* required */
          Body: { /* required */
            Html: {
             Charset: "UTF-8",
             Data: emailBody
            },
            Text: {
             Charset: "UTF-8",
             Data: " "
            }
           },
           Subject: {
            Charset: 'UTF-8',
            Data: subject
           }
          },
        Source: 'sasanumac@gmail.com', /* required */
        ReplyToAddresses: [
          /* more items */
        ],
      };
      
      // Create the promise and SES service object
      var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
      
      // Handle promise's fulfilled/rejected states
      sendPromise.then(
        function(data) {
          console.log(data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });
  
      
      return res.send('post completed successfully');
});
