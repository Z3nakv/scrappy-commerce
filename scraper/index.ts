import puppeteer from "puppeteer";

export async function scrapeProducts(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    // await page.waitForSelector("#productTitle", { timeout: 5000 });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    const products = await page.evaluate(() => {
      const pgTitle = document.querySelector("#productTitle");
      const pgPriceSymbol = document.querySelector(".a-price-symbol");
      const pgProductPrice = document.querySelector(".a-price-whole");
      const pgProductPriceDecimal = document.querySelector(".a-price-decimal");
      const pgProductPriceCents = document.querySelector(".a-price-fraction");
      const pgOriginalPrice = document.querySelector(".a-size-small .a-price .a-offscreen");
      const pgImageProduct = document.querySelector(".imgTagWrapper #landingImage")?.getAttribute("src");
      return {
        pgTitle: pgTitle?.innerHTML.trim(),
        pgPriceSymbol: pgPriceSymbol?.innerHTML,
        pgProductPrice: pgProductPrice?.textContent,
        pgProductPriceDecimal: pgProductPriceDecimal?.innerHTML,
        pgProductPriceCents: pgProductPriceCents?.innerHTML,
        pgOriginalPrice: pgOriginalPrice?.innerHTML,
        imageProduct: pgImageProduct
      };
    });

    return products;
  } catch (error) {
    console.error("Error al hacer scraping:", error);
  } finally {
    // await page.close();
    await browser.close();
  }
}
