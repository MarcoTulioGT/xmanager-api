const express = require('express');
const {
    getAllProducts,
    getProductsByDateRange,
    getHealth
      } = require('./products.controller')

const productsRouter = express.Router();

productsRouter.get('/products',  getAllProducts);
productsRouter.get('/invoices', getProductsByDateRange);
productsRouter.get('/health', getHealth);



module.exports = productsRouter;