const express = require('express');
const cors = require('cors')


const app = express();
// Monitoring with Swagger I
var swStats = require('swagger-stats');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(swStats.getMiddleware({swaggerSpec:swaggerDocument}));
//http://localhost:4001/api-docs/#/default/ListFeatures
//http://localhost:4001/swagger-stats/#/requests
// Monitoring with Swagger F

const productsRouter = require('./routes/products/products.router')


app.use(cors({
    origin: ['http://localhost:3000','http://*','https://*']
}));


app.use(express.json({ limit: '500kb'}));
app.use(express.urlencoded({ limit: '500kb' }));
app.use(productsRouter);

module.exports = app;