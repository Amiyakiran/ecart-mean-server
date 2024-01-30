const carts = require('../Models/cartModel')

//addtocart
exports.addToCartController = async(req,res)=>{
    const userId = req.payload
    const {id,title,price,description,category,image,rating,quantity}=req.body
    try {
        const cartItem = await carts.findOne({id,userId})
        if(cartItem){
            cartItem.qantity+=1
            cartItem.grandTotal=cartItem.qantity*cartItem.price
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
        res.status(401).json(error)
    }
}