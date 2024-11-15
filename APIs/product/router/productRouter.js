
const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controller/productController');  // Make sure the controller is 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix); 
  }
});

const upload = multer({ storage: storage });







module.exports = app =>{
    app.post('/api/v1/createProducts',upload.single('product_image'), productController.createProduct);
    app.get('/api/v1/getAllProducts', productController.getAllProduct);
    app.get('/api/v1/getProductsbyId/:id', productController.getAllProductById);
    app.put('/api/v1/updateProducts/:id',upload.single('product_image'),productController.updateProduct)
    app.delete('/api/v1/deleteProducts/:id', productController.DeleteProduct);
}