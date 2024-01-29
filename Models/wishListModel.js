const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    productId:{
        type:Number,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const wishlists = mongoose.model("wishlists",wishlistSchema)

module.exports = wishlists