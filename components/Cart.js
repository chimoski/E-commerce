import React, {useRef} from 'react';
import {Link} from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping
} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast';
import {useStateContext} from '../context/StateContext';
import {urlFor} from '../lib/client';
import { ClearCartPrompt, Prompt } from './Prompt';
import getStripe from '../lib/getStripe';

// import { Product } from '../../components/Product'

function Cart() {
  const handleCheckOut = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartQuantity,
    onRemove,
    clearCart
  } = useStateContext();

  const cartRef = useRef(null);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [showClearCartPrompt, setShowClearCartPrompt] = React.useState(false);


  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type='button' className='cart-heading' onClick={()=> setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>{totalQuantities} {totalQuantities>1 ? '(items)' : '(item)'}</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart"> 
            <AiOutlineShopping size={235} />
            <h3>Your shopping cart is empty</h3>
           
              <button type='button'
               className='btn' 
               onClick={()=> setShowCart(false)}>
                Continue Shopping
              </button>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item)=>(
          
            <div className="product" key={item._id}>
               { console.log(item.image)}
              <img 
              className='cart-product-image'
              src={urlFor(item?.image[0])} alt="image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <div className="quantity-desc">
                <span className="minus" onClick={() =>  toggleCartQuantity(item._id, 'dec') }  ><AiOutlineMinus/></span>
                <span className="num">{item.quantity}</span>
                <span className="plus" onClick={() => toggleCartQuantity(item._id, 'inc') }><AiOutlinePlus/></span>
               </div>
                  </div>
                              {
                  showPrompt && (
                    <Prompt
                    setShowPrompt ={setShowPrompt}
                    onRemove={onRemove}
                    id={item._id}
                    />
                  )
                }
              <button type='button' className='remove-item' onClick={()=>setShowPrompt(true)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            
            </div>
            
          ))}
          <br /> <br /> 
           {
            cartItems.length >= 2 && (
              <span
              onClick={()=>setShowClearCartPrompt(true)}
               className='bttn'>Clear Cart</span>
            )
           }
               {
                  showClearCartPrompt && (
                    <ClearCartPrompt
                     setShowClearCartPrompt={setShowClearCartPrompt} 
                     clearCart = {clearCart}
                     />
                  )
                }
        </div>
        {cartItems.length >=1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Total:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type='button' className="btn" onClick={handleCheckOut}>
                Proceed to payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
