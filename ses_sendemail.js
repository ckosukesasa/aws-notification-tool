/*
 *  Christopher Sasanuma
 *  Copyright
 */


// Load the AWS SDK for Node.js
import * as AWS from '@aws-sdk/client-ses';
// var AWS = require('aws-sdk');

// import sendBulkEmail  from "aws-sdk";
// Set the region 

// var config = new AWS.Config({
//     accessKeyId: 'AKIA32VM4FFEUIYS7D5W', 
//     secretAccessKey: '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', 
//     region: 'us-west-2'
//   });

// AWS.config.update({region: 'us-west-2'});

// new aws.

// var config = new AWS.Config({
//     accessKeyId: 'AKIA32VM4FFEUIYS7D5W', 
//     secretAccessKey: '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', 
//     region: 'us-west-2'
//   });



/****** Creating the User data *************/

const users = [
    {
        username:"Christopher Sasanuma", 
        email: "christophersasanuma0@gmail.com"
    },
    {
        username: "Nitin Bali",
        email:"nitinbali2801@gmail.com"
    },
    {
        username: "Kosuke Sasanuma",
        email: "Christopher.sasanuma@tufts.edu"
    },
    {
        username: "Sasha Sasanuma",
        email: "sashasasanuma@gmail.com"

    },
    {
        username: "Alexandra Sasanuma",
        email: "Alexandra.sasanuma@tufts.edu"

    }
]; // sample array of users


/***** Inserting user data into the destinations array in correct form****/

let toAddresses = [];

for (const user of users) {
    toAddresses.push(
        user.email
    );
};

console.log(toAddresses);


/******* Parameter Object   *****************/
// Create sendEmail params 
var params = {
 BulkEmailEntries: [ 
      { 
         Destination: { 
            BccAddresses: "sasanumac@gmail.com",
            CcAddresses: "sasanumac@gmail.com",
            ToAddresses: [
                'christophersasanuma0@gmail.com',
                'nitinbali2801@gmail.com',
                'Christopher.sasanuma@tufts.edu',
                'sashasasanuma@gmail.com',
                'Alexandra.sasanuma@tufts.edu'
              ]
         }
        //  "ReplacementEmailContent": { 
        //     "ReplacementTemplate": { 
        //        "ReplacementTemplateData": "string"
        //     }
        //  }
        //  "ReplacementTags": [ 
        //     { 
        //        "Name": "string",
        //        "Value": "string"
        //     }
        //  ]


      }
   ],

//    "ConfigurationSetName": "string",
    "DefaultContent": "Hey everyone, I'm testing the bulk email ",

    //   "Template": { 
    //      "TemplateArn": "string",
    //      "TemplateData": "string",
    //      "TemplateName": "string"
    //   }


//    "DefaultEmailTags": [ 
//       { 
//          "Name": "string",
//          "Value": "string"
//       }
//    ],
//    "FeedbackForwardingEmailAddress": "string",
//    "FeedbackForwardingEmailAddressIdentityArn": "string",
   FromEmailAddress: "sasanumac@gmail.com",
//    "FromEmailAddressIdentityArn": "string", NOT REQUIRED
   ReplyToAddresses: [
       "sasanumac@gmail.com"
    ] /* This can also be in an array */

};

// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendBulkEmail(params).promise();

// console.log("Before the bulk email function call!!!");
// var sendPromise = new AWS.SES({apiVersion: '2010-12-01'});

// sendPromise.sendBulkEmail(params, (err, data) => {
//     console.log("In the promise bitch");
//     if (err) console.log(err, err.stack); // an error occurred
//     else    console.log("Hey fucker"); 
// });

// // // Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
});