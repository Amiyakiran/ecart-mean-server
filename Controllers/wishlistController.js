const wishlists = require('../Models/wishListModel')


exports.addToWishlistController = async(req,res)=>{
    //get product id
    const {id, title, price, description, category,image,rating}= req.body
    //get userId
    const userId = req.payload
    console.log(userId);
    
    try {
        const existingProduct = await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json('Product Already in  Wishlist')
        }
        else{
            const newProduct = new wishlists({
               id, title, price, description, category,image,rating,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}


exports.getWishlistController = async(req,res)=>{
   const userId = req.payload

   try {

    const allproductsInWishlist = await wishlists.find({userId})
    res.status(200).json(allproductsInWishlist)
    
   } catch (error) {
    res.status(401).json(error)
   }
}

exports.removefromWishlist = async(req,res)=>{
    const {id}=req.params
    try {

        const removeItem = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}