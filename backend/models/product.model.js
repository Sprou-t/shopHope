// create the product models

import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image : {
        type: String,
        required: true
    },
}, {
    timestamps: true // createdAt
})

// mongoose will create a collection called products. a collection is a folder that is inside a cluster created in URI
const Product = mongoose.model('Product', productSchema);

export default Product;

