import Head from 'next/head';
import Cart from '../components/Cart';
import { FooterBanner } from '../components/FooterBanner';
import { HeroBanner } from '../components/HeroBanner';
import { Navbar } from '../components/Navbar';
import { Product } from '../components/Product';
import { client } from '../lib/client';

export default function Home({products, bannerData}) {
 
  
  return (
    <>
        {/* Hero Banner  */}
        <HeroBanner  heroBanner = {bannerData.length && bannerData[0]}/>
  
        <div className='products-heading'>
          <h2>Best selling Products</h2>
          <p>Speakers of many variations</p>
        </div>

        <div className="products-container">
          {products?.map(product=>(
          <Product key={product._id} product ={product} />
          ))}
        </div>

          <footer>
            {/* Footer */}
            <FooterBanner footerBanner={bannerData && bannerData[0]} />
          </footer>
    </>
  )
}

export const getServerSideProps = async()=>{
  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery);
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);
  return {
    props:{
      products, bannerData
    }
  }

}