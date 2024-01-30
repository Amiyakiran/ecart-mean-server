const express = require('express')

const productController = require('../Controllers/productController')

const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

const wishlistController = require('../Controllers/wishlistController')

const router = new express.Router()

//get all products
router.get('/products/all',productController.getAllProductsController)

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//getproduct
router.get('/get-product/:id',productController.getProductController)

//add to wishlist
router.post('/wishlist/add',jwtMiddleware,wishlistController.addToWishlistController)

//get wishlist
router.get('/wishlist/get-products',jwtMiddleware,wishlistController.getWishlistController)
//remove item from wishlist
router.delete('/remove-wishlist/:id',jwtMiddleware,wishlistController.removefromWishlist)

module.exports = router