import { scrapeAndStoreProduct } from "@/lib/actions";

async function Home() {
  const products = await scrapeAndStoreProduct(
    "https://www.amazon.com/-/es/S101-REDRAGON-Set-combo/dp/B00NLZUM36?_encoding=UTF8&sr=8-3"
  );
  // console.log(products);

  return (
    <div>
      {products &&
        products.map((product, idx) => {
          const { url, currency, image, title, currentPrice, originalPrice } = product;
          return (
            <div key={idx}>
              <p>{title}</p>
              <p>{url}</p>
              <p>{currency}</p>
              <p>{currentPrice}</p>
              <p>{originalPrice}</p>
              <p>{image}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
