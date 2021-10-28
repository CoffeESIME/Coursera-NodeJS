
/*here we import the modules that we have installed for the application */
/*express is a module to create a server app based on http core module of node */
const express = require('express');
/*we need the http module fot support the http protocol */
const http = require('http');
/* */
const morgan=require('morgan');

/* we use the route that we created*/
const dishRouter = require('./routes/dishRouter');
const leaderRouter=require('./routes/leaderRouter');
const promoRouter=require('./routes/promoRouter')
/*ip address */
const hostname = '192.168.1.71';
/*port */
const port = 3000;
/*we use the body parser because the data send to the server will be extracted in form of json or xml 
body is the name bacuse this uses the body of the request message like when we use the post request*/
const bodyParser=require('body-parser')

const app = express();
/*
app.use() acts as a middleware in express apps. Unlike app.get() and app.post() or so, 
you actually can use app.use() without specifying the request URL. 
In such a case what it does is, it gets executed every time no matter what URL's been hit. */
app.use(morgan('dev'))
/*here we use an inbuild middleware called static  To serve static files such as images, 
CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
The function signature is:
express.static(root, [options])*/
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use('/dishes',dishRouter)
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)
/*

*/


app.use((req, res, next) => {
  /*here we use the code of the response, we send the 200 because its the code for everything is ok with
  the request and we send the correct data to the user  */
  res.statusCode = 200;
  /*with setHeader we send the header of the htpp response and we specify the content type send 
  and then http protocol encode that appropiate*/
  res.setHeader('Content-Type', 'text/html');
  /*and finally we end the response with an simple html  */
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});
/*we create a sercer with the app
this means that the app will be in charge to respond to the request and sending a respond */
const server = http.createServer(app);
/*we now say to the server that will listen the port and the ip direction when the server
has been started then send a message to the console with the data for the server */
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});