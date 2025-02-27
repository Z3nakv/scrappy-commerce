'use server'

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { Product } from "../models/product.model";
import { scrapeProducts } from "@/scraper";

export async function scrapeAndStoreProduct(productUrl : string){
    if(!productUrl) return;

    try {
        connectToDB();

        const scrapedProduct = scrapeProducts(productUrl)

        if(!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url })

        if( existingProduct ){
            const updatedPriceHistory : any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]
            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: updatedPriceHistory,
                highestPrice: updatedPriceHistory,
                averagePrice: updatedPriceHistory,
            }
        }

        const newProduct = await Product.findOneAndUpdate( {url: scrapedProduct.url}, product, { upsert: true, new: true })
        revalidatePath(`/products/${newProduct._id}`)
    } catch (error) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}

