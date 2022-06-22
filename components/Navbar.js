import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '../context/StateContext'

export const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link  href="/">SMART Headphones</Link>
      </p>
      <button type='button'  
      className='cart-icon'
      onClick={() => setShowCart(prev=>!prev)}
      >
    <AiOutlineShopping />
    <span className={!totalQuantities < 1 ? 'cart-item-qty': ''}>{!totalQuantities < 1 && totalQuantities}</span>
      </button>

     {
      showCart && (
        <Cart/>
      )
     }
    </div>
  )
}
