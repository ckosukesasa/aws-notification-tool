import express from 'express';
// var express = require('express');
var router = express.Router();

import aws from "aws-sdk"
// var aws = require('aws-sdk');

const ses = new aws.SES({region: "us-west-2"})

router.post('/email', (req, res)=>{
    const {email, message, name} = req.body;
    sesTest("sasanumac@gmail.com", email, message, name).then((val) => {
        console.log("Got this message", val)
        res.send("successful")
    }).catch((err)=>{
        console.log("ERROR ")
        res.send('/error' + err)
    })
})


function sesTest(emailTo, emailFrom, message, name){

    console.log("Hey there");
    //Constructing object that we are sending over using email
    const params = {
        Destination:{
            ToAddresses:[emailTo]
        },

        Message:{
            Body:{
                Text: {
                    Data: "From Contact: " + name + "\n" + message 
                }
            },
            Subject:{
                Data:"Name: " + emailFrom
            }
        },

        Source: "christophersasanuma0@gmail.com"
    
    
    };

    return ses.sendEmail(params).promise();
}


export default router;