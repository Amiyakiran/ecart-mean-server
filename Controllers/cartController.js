const carts = require('../Models/cartModel')

//addtocart
exports.addToCartController = async(req,res)=>{
    const userId = req.payload
    const {id,title,price,description,category,image,rating,quantity}=req.body
    console.log(id,title,price,description,category,image,rating,quantity);
    try {
        const cartItem = await carts.findOne({id,userId})
        if(cartItem){
            cartItem.quantity+=1
            cartItem.grandTotal=cartItem.quantity*cartItem.price
            await cartItem.save()
            res.status(200).json('qauntity of item increamented')
        }
        else{
            const newCartItem = new carts({
                id,title,price,description,category,image,rating,quantity,grandTotal:price,userId
            })
            await newCartItem.save()
            res.status(200).json('new item added to cart')

        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}
//get cart
exports.getCartController = async(req,res)=>{
    const userId = req.payload
    try {
        const allPrpducts = await carts.find({userId})
        res.status(200).json(allPrpducts)
    } catch (error) {
        res.status(401).json(error)
    }
}

//increment count
exports.increamentCartController = async(req,res)=>{
    const {id}= req.params
    try {
        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity +=1
            selectedProduct.grandTotal = selectedProduct.quantity*selectedProduct.price

            await selectedProduct.save()
            res.status(200).json("quantity incremented")
        }else{
            res.status(404).json('Product not found')
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}

//decrement count
exports.decrementCartController = async(req,res)=>{
    const {id}= req.params
    try {
        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity -=1
            if(selectedProduct.quantity==0){
                await carts.deleteOne({_id:id})
                res.status(200).json('item removed')
            }
            else{
                selectedProduct.grandTotal = selectedProduct.quantity*selectedProduct.price
                await selectedProduct.save()
                res.status(200).json("quantity decremented")
            }

           
        }else{
            res.status(404).json('Product not found')
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}

//remove cart item
exports.removeCartItemController = async(req,res)=>{
    const {id}= req.params
    try {
        await carts.deleteOne({_id:id})
        res.status(200).json('product removed')
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//empty cart
exports.emptyCartController = async(req,res)=>{
    const userId = req.payload
    try {
        await carts.deleteMany({userId})
        res.status(200).json('all item removed')
    } catch (error) {
        res.status(401).json(error)
    }
}