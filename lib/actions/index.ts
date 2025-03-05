"use server";

import { Product } from "../models/product.model";
// import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
// import { Product } from "../models/product.model";
import { scrapeProducts } from "@/scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeProducts(productUrl);

    if (!scrapedProduct) return;
    
    const newProduct = new Product({
        url: productUrl,
        currency: scrapedProduct.pgPriceSymbol,
        image: scrapedProduct.imageProduct,
        title: scrapedProduct.pgTitle,
        currentPrice: scrapedProduct.pgProductPrice,
        originalPrice: scrapedProduct.pgOriginalPrice,
    });

    // await newProduct.save();

    return [newProduct];
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error}`);
  }
}
