const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cart API',
    description: 'Cart API',
  },
  host: 'cse341-sp24-project2.onrender.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);