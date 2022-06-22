import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client';

export const HeroBanner = ({heroBanner:{
  smallText,midText,largeText1,image,buttonText,desc,product
}}) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
          <img className='hero-banner-image' src={urlFor(image)} alt="head-phones" />
          <div>
            <Link href={`/product/${product}`}>
              <button type='button'>{buttonText}</button>
            </Link>
            <div className="desc">
              <h5>{desc}</h5>
              <p>DESCRIPTION</p>
            </div>
          </div>
      </div>
    </div>
  )
}
