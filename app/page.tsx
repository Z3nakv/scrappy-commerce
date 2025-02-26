import { scrapeProducts } from "@/scraper";

async function Home() {

 
  const products = await scrapeProducts();
  
  return (
    <div>Home</div>
  )
}

export default Home