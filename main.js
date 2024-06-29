require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const path = require("path");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const teaRouter = require("./src/routes/student");
const connectDb = require("./src/config/dbConnection");


// Example usage in an async function
async function startServer() {
  try {
    await connectDb();
    // Start your server here
    console.log('Server started successfully');
    app.listen(port, () => {
      console.log(`APP is listening on port ${port}`)
    })
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
    // Shutdown your app or handle the error appropriately
    process.exit(1); // Exit with error
  }
}

startServer(); 

const port = process.env.PORT;

app.use(bodyParser.json({limit: '16mb'})); 

app.use((req,res,next)=>{

  console.log("CALLING MIDDLEWARE",req.headers);
  next();

})

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'SAMPLE API TEST',
      version: '1.0.0',
      description: 'API Documentation with Swagger',
    },
    basePath: '/',
  },
  apis: [path.join(__dirname, 'src', 'routes', '*.js')], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/student",teaRouter); 

// app.use((req, res, next) => {
//     const body = req.body;
//     const Modifiedbody = {
//         ...body,
//         lastName : "Rajawat"
//     }
//     req.body = Modifiedbody
//     console.log("middleware Called");
//     next();
//   })


// app.get('/h', (req, res) => {
//     res.send('Hello World! from h')
//   })

// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.send('Hello World!')
// })

