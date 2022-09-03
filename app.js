/*
 * Christopher Sasanuma
 * Copyright (c)
 * 8/10/2022
 * app.js
 */


// Main imports
import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import path from 'path';
import bodyParser from 'body-parser';
import AWS from "aws-sdk";
import mongoose from "mongoose";
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient

import User from './models/users.js';

import { allowedNodeEnvironmentFlags } from "process";
import { clear } from "console";




const __dirname = path.resolve();
const port = 8000;

// List where the JSON Data of the User Emails will be stored 
var USERS = ""

// Connect to MongoDB
//Purpose: Insert your 'Connection string' to connect to database
const dbURI = #MongoDB URI;

/** Purpose: Connecting to the MongoDB and pulling the data from the database 
 *           after a connection to the MongoDB is made
 */
MongoClient.connect(dbURI, (err, client) =>{

    if(err) throw err;

    app.listen(port, () => {
        console.log("Port running on http://localhost:" + port);
    })

    let database = client.db('Database name');

    /** Fetching the list of users from the MongoDB **/
    database.collection("Collection Name").find({}).toArray(function(err, result) {
        if (err) throw err;
        USERS = result
        client.close();
      });

})

const app = express();
app.use(express.static(__dirname +'.public'));
app.use(express.json());
app.use(cors());
app.use("/", express.static("public"));



/** Purpose: Sending the front end HTML file to the front end to render website 
 *           on user device
*/
app.get("/", (request, response)=> {
    response.status(200).sendFile(__dirname + '/index.html');
});


/** Purpose: Get all user information at the given path ** */
app.get('/all-users', (req, res) => {
    User.find()
      .then((result) => {
          res.send(result)
      })
      .catch((err) => {
          console.log(err)
      })
  
})

/** Purpose: Get Single user information at the given path ** */
app.get('/single-user', (req, res) => {
    User.findById("EXAMPLEID")
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    });
});


// API Middlware
app.use(express.json()); //Used to accept the data in JSON format
app.use(express.urlencoded()); //Used to decode the data sent through html form



// App.post handler
/* Purpose: post handler for the user message. The form data is passed through
            urlencodedParser variable, and can be access through the 'req' */

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/* Purpose: Fetching User form data from front end, then sending email 
            to the list of segments that were selectected by the user */

app.post('/', (req, res) => {
    // Email Message & Segment Boolean value 
    var segment1 = req.body["segment1"];
    var segment2 = req.body["segment2"];
    var segment3 = req.body["segment3"];
    var subject = req.body["subject"];
    var emailBody = req.body["emailBody"];


    var emailList = [];
    if (segment1 == '1'){
        console.log("Seg 1!!");
        //Get segment 1 user emails from MongoDB, then load to Email list
        for (var i in USERS[0]["users"]["segment1"]){
            emailList.push(USERS[0]["users"]["segment1"][i]["email"]);
        }
    }
    if (segment2 == '1'){
          //Get segment 2 user emails from MongoDB, then load to Email list
        console.log("Seg 2!!");
        for (var i in USERS[0]["users"]["segment2"]){
            emailList.push(USERS[0]["users"]["segment2"][i]["email"]);
        }
    }

    if (segment3 == '1'){
        console.log("Seg 3!!")
        //Get segment 3 user emails from MongoDB, then load to Email list
        for (var i in USERS[0]["users"]["segment1"]){
            emailList.push(USERS[0]["users"]["segment3"][i]["email"]);
        }
    }

    // Set the region 
    AWS.config.update({region: 'us-west-2'});
    // Create sendEmail params
    var params = {
        Destination: { /* required */
          CcAddresses: [
            'CC EMAIL ADDRESS',
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
        Source: 'SOURCE EMAIL ADDRESS', /* required */
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
