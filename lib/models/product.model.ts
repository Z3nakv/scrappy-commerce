import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: { type: String, require: true, unique: true },
    currency: { type: String, required: true},
    image: { type: String, required: true},
    title: { type: String, required: true},
    currentPrice: { type: Number, required: true },
    originalPrice: { type: String, required: true }
})

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)