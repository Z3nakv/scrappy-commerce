import { scrapeAndStoreProduct } from "@/lib/actions";

async function Home() {

  const products = await scrapeAndStoreProduct('https://www.amazon.com/-/es/Razer-BlackShark-Auriculares-para-gamer/dp/B09PZG4R17?_encoding=UTF8&sr=8-3');
  console.log(products);
  
  return (
    <div>Home</div>
  )
}

export default Home