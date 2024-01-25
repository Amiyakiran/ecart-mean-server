const express = require('express')

const productController = require('../Controllers/productController')

const userController = require('../Controllers/userController')

const router = new express.Router()

//get all products
router.get('/products/all',productController.getAllProductsController)

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

module.exports = router