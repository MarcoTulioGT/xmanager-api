const products = require('../../models/products.model');
const pool2 = require('../../../db');

async function getAllProducts(req, res){
    //return res.status(200).json(products);
   await pool2.query("SELECT * FROM invoices ORDER BY invoice_date asc", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}


async function getProductsByDateRange(req, res){
    const dateStart = req.query.dateStart;
    const dateEnd = req.query.dateEnd;
    console.log(dateStart, dateStart)
    await pool2.query("SELECT * FROM invoices WHERE invoice_date BETWEEN '"+dateStart+"' and '"+dateEnd+"' ORDER BY invoice_date asc", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

async function getHealth(req, res){
    res.status(200).json({result: "OK"})
}

module.exports = {
    getAllProducts,
    getProductsByDateRange,
}