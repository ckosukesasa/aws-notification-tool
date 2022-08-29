// const AWS = require("aws-sdk");
import AWS from "aws-sdk";
// var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-west-2'});

// const ses = new AWS.SES({
//     AWS_ACCESS_KEY_ID: AKIA32VM4FFEUIYS7D5W,
//     AWS_SECRET_ACCESS_KEY: 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,
//     region: 'us-west-2'
//   }); 

  

const params1 = {
  Template: {
    TemplateName: "MyTemplate",
    SubjectPart: "Test mail for {{username}}!",
    HtmlPart: "<p>Dear {{username}}</p>, <p>Your email is {{email}}.</p>"
  }
}

var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendBulkTemplatedEmail(params1).promise();

sendPromise.createTemplate(params1, (err, data) =>  {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
