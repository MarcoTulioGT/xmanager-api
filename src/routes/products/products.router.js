const express = require('express');
const {
    getAllProducts,
    getProductsByDateRange
      } = require('./products.controller')

const productsRouter = express.Router();

productsRouter.get('/products',  getAllProducts);
productsRouter.get('/invoices', getProductsByDateRange);



module.exports = productsRouter;