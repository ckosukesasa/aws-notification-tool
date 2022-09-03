## Christopher Sasanuma
## Open Avenues Micro Internship Program
## 8/18/2022
## Client: 1UpHealth

### Purpose
This document will describe the main components of the frontend, backend, as 
well as the steps necessary for the client to run this program on their 
computers


## How to run the code:#

1. Make sure to have NodeJs installed: 
  -  if not installed, run 'sudo apt install nodejs' in the terminal of the 
      project

2. Make sure to have nodemon, and 'aws-sdk' modules downloaded

  - if not installed, run 'npm install -g nodemon' in terminal of the 
      project
  - if not installed, run 'npm install aws-sdk' in terminal of the 
      project
- Run either 'node app.js' or 'npm start' in your IDE environment terminal



## Main Components:

1. Frontend: Vanilla html/CSS with Javascript and JQuery 

For the front end, there is a very simple vanilla implementation of a submission
form. When the user of the form clicks the segment, it will select the list of 
emails attached to each segment and will add it to the final list of emails 
where the email will be sent to. 


2. Backend: ExpressJs

- The backend architecture uses ExpressJs. The email submission triggers the 
javascript that:
    1. Fetches target audience, the subject, and body message passed from the front 
        end using a POST request

    2. Adds the protected list of emails into the final list to email 

    3. Copies the final email list, the subject, and body message into the final 
    JSON to send to the AWS Simple Email Services API to send bulk emails 



## Next Steps:

1. Amazon SES Set up

In order to successfully run this code, the client must have an AWS SES account. 

Before adding 1UpHealth's Customers' emails to the database, AWS SES must 
verify each of their email addresses. Without the email verification, AWS SES 
environment cannot send the emails to any of the emails.

2. Creation of Database of user emails 

In this project, the database was not implemented, but as next steps, there 
would be the need to integrate a Database into the backend to allow emails 
to be sent. 

3. More testing of app

Finally, the app necessitates more testing. Currently, the AWS account 
is operating in the Sandbox mode, thus, there can only be a very limited 
number of emails to be sent and all emails have to be verified. But with 
1UpHealth's premium AWS plan, there would need to be more testing to verify 
that the app works for our client. 



