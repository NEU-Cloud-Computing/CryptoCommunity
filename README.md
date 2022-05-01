# CryptoCommunity Deployment Guide  
## Richard Castaneda, Ernest Gurish, Zhiyuan Luo, and Akhil Maddipatla  
### Components
1) CryptoCommunity-BackEnd: This is the back-end of our application which is a SpringBoot application written in Java and built with Maven. This is then
deployed to Elastic Beanstalk and handles the API mappings to properly update the RDS database and serve responses to the front-end.
2) CryptoCommunity-FrontEnd: This is the front-end of our application which is a React application and is compiled with the Node Package Manager (NPM).
3) Bucket Permissions: This is the bucket policy used to host our front-end as a static website. The top portion is the CORS policy and the bottom portion
is the actual bucket policy JSON.
5) Procfile: This is just a file to include in the deployment to Elastic Beanstalk. It lets Elastic Beanstalk know the exact name of the .jar file to run
to start up the backend. 
5) .platform: This folder should also be included in the deployment and provides NGINX with knowledge of what data requests our application is making.

### Deployment
1) Set-up an S3 bucket to be deployed as a static website. Go to S3 on the AWS Management Console, create a new bucket, deselect "Block all public access", and 
create the bucket. Navigate to the "Permissions" tab to update the S3 bucket policy. Here you can add the bucket policy from our "Bucket Permissions" component 
noted above--just be sure that the "Resource" line in the bucket policy matches the Bucket ARN of the new S3 bucket and that it still ends in "/\*". The bucket 
also needs a cross-origin resource sharing (CORS) policy to be added on the "Permissions" tab. This CORS policy is also included in the "Bucket Permissions" file 
at the top. Now navigate to the "Properties" tab and at the bottom change "Static website hosting" to "Enable" and enter "index.html" for the Index document and 
Error document. Do not upload anything yet, but copy the URL of the static website.
2) Since the back-end controller code contains hardcoded links to our front-end for CORS, each of the four controllers needs to be updated before we build the back-
end. Navigate to "CryptoCommunity/CryptoCommunity-BackEnd/src/main/java/com/cryptocommunitytest/test/controllers/". Note that each of these four controllers
contains an @CrossOrigin annotation. In each controller, update the "origins" parameter here to match the endpoint URL of our new S3 static website from step (1).
3) The back-end can now be built with Maven. Navigate to the "CryptoCommunity-BackEnd" folder and run *mvn clean install* followed by *mvn clean package* to package 
it together. This creates a "target" folder and inside that folder is a .jar file called **test-0.0.1-SNAPSHOT.jar** which should be included in the deployment
package as this is the back-end code.
4) Zip together the Procfile, the .platform folder, and the backend (**test-0.0.1-SNAPSHOT.jar**) .jar file for upload to Elastic Beanstalk.
5) Go to Elastic Beanstalk on the AWS Management Console to deploy the previously zipped folder. The platform is Java and platform branch is Corretto 11 as well 
as the recommended platform version. At the bottom select "Upload your code" and upload the zipfile from step (4).
6) Once the Elastic Beanstalk environment is deployed, copy the application endpoint. Navigate to CryptoCommunity-FrontEnd/src/services/ 
and note that in all the services there (with the exception of the 3rd party "coin-exchange-service.js") there is a "REMOTE_API" link at the top. Each of these 
services "REMOTE_API" variables needs to be updated to our newly created Elastic Beanstalk application endpoint--be sure to keep the "/api" at the end.
7) Now the front-end can be built with Node Package Manager. With that installed, you should be able to navigate to the "CryptoCommunity-FrontEnd" 
folder and run *npm run build*. This creates a *build* folder which will be uploaded to Elastic Beanstalk for deployment.
8) Now go back to our S3 bucket that is used as our static website and upload all of the files in the *build* folder from step (7).
9) Now our front-end and back-end code is in place and lastly we need to set-up our MySQL instance in the Relational Database Service (RDS). 
Go back to our Elastic Beanstalk deployment on the AWS Management Console, go to the "Configuration" tab, and at the very bottom is "Database." Select "Edit" here
and create our database. The engine is "mysql", the version can be left as is, and the database size is up to you (we did t2.micro, 5 GB). Enter your desired database
username and password as well as availability. We also selected "Delete" under "Database deletion policy" for ease. Then deploy the database and copy the endpoint you
get once the database deploys.
10) We need to update our Elastic Beanstalk environment properties to include our new database information. In our Elastic Beanstalk deployment on the AWS 
Management Console, go back to the "Configuration" tab. Select "Edit" in the "Software" category and scroll to the "Environment properties" section.
Here add the following four properties under "Name": "RDS_HOSTNAME", "RDS_USERNAME", "RDS_PASSWORD", and "RDS_PORT". In the associated values, add the 
endpoint URL for the new RDS instance you created (from the previous step (9)), the username and password you setup the RDS instance with, and 3306 as the "RDS_PORT".
11) The application is now fully-deployed and you should be able to login, comment, and add coins on the front-end.
