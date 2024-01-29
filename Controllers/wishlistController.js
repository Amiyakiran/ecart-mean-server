const wishlists = require('../Models/wishListModel')


exports.addToWishlistController = async(req,res)=>{
    //get product id
    const {id} = req.params
    //get userId
    const userId = req.payload
    console.log(userId);
    try {
        const existingProduct = await wishlists.findOne({productId:id,userId})
        if(existingProduct){
            res.status(406).json('Product Already in  Wishlist')
        }
        else{
            const newProduct = new wishlists({
                productId:id,
                userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}