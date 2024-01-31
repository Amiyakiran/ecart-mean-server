const express = require('express')

const productController = require('../Controllers/productController')

const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')

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

//add to cart
router.post('/add-cart',jwtMiddleware,cartController.addToCartController)

//getcart
router.get('/cart/get-allproduct',jwtMiddleware,cartController.getCartController)
module.exports = router