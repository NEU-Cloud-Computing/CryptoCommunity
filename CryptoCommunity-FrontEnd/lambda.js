const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/App.js');
const server = awsServerlessExpress.createServer(app);

module.export.universal = (event, context) => awsServerlessExpress.proxy(server. event, context);