
/*here we import the modules that we have installed for the application */
/*express is a module to create a server app based on http core module of node */
const express = require('express');
/*we need the http module fot support the http protocol */
const http = require('http');
/* */
const morgan=require('morgan');
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
/* here we are saying that for every GET, PUT, POST and DELETE request to 
the path /dishes (the fisrt middleware to be called and then any other middleware) 
will be send a plain text and then we use the function next that is for saying that 
the current middleware is not the end of this request and then pass it to the next middleware
by using the  next() function*/
app.all('/dishes',(req,res,next)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','txt/plain');
  /*saying that is not the end to*/
  next();
});
/*So next we will create another middleware, because the reques can be an GET, PUT, POST and DELETE
request */
app.get('/dishes', (req,res,next)=>{
  res.end('Will send all the dishes to you !')
});
app.post('/dishes',(req,res,next)=>{
  res.end(`will add the dish ${req.body.name} with details: ${req.body.description}`)
});
app.put('/dishes', (req,res,next)=>{
  /*for the status 403 this means that is not supported or forbidden*/
  res.statusCode=403;
  res.end('PUT operations are not supported on dishes')
});

app.delete('/dishes', (req,res,next)=>{
  /*for the status 403 this means that is not supported */
    res.end('Deleting all the dishes!')
});

app.get('/dishes/:dishesId', (req,res,next)=>{
  res.end(`We will send the details of the dish: 
  ${req.params.dishesId} to you!`)
});
app.post('/dishes/:dishesId',(req,res,next)=>{
  res.end(`POST operations are not supportted in dishes/ ${req.params.dishesId}`)
});
app.put('/dishes/:dishesId', (req,res,next)=>{
  /*for the status 403 this means that is not supported or forbidden*/
  res.write(`Updating the dish:${req.params.dishesId}\n`)
  res.end(`Will update the dish: ${req.body.name} with details ${req.body.description} `)
});

app.delete('/dishes/:dishesId', (req,res,next)=>{
  /*for the status 403 this means that is not supported */
    res.end(`Deleting dishe! ${req.params.dishesId}`)
});



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