import puppeteer from "puppeteer";

export async function scrapeProducts ( url : string ) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, {
        });

        const grabTitle = await page.evaluate(() => {
            const pgTitle = document.querySelector("p.text-subtitle");
            return pgTitle ? pgTitle?.innerHTML : 'no se encontro titulo';
        });

        console.log("Título del producto:", grabTitle);
    } catch (error) {
        console.error("Error al hacer scraping:", error);
    } finally {
        await page.close();
        await browser.close();
    }
}