import {
    useState,
    useEffect,
    createContext,
    useContext
} from 'react'
import {toast} from 'react-hot-toast';

 

const context = createContext();
  let foundProduct;
  let index;
  // let cartStorage
  // let priceStorage
  // let quantityStorage

export const StateContext = ({children})=>{
 
 
  // const ISSERVER = typeof window === "undefined";

  // const getCartItemFromStorage = ()=>{
  //   return localStorage.getItem('cartItems') 
  //   ? JSON.parse(localStorage.getItem('cartItems'))
  //   : []
  // }
  // const getTotalPriceFromStorage = ()=>{
  //   return localStorage.getItem('totalPrice') 
  //   ? JSON.parse(localStorage.getItem('totalPrice'))
  //   : 0
  // }
  // const getTotalQuantitiesFromStorage = ()=>{
  //   return localStorage.getItem('totalQuantities') 
  //   ? JSON.parse(localStorage.getItem('totalQuantities'))
  //   : 0
  // }

  // if(!ISSERVER) {
  //   cartStorage = getCartItemFromStorage();
  //   // priceStorage = getTotalPriceFromStorage();
  //   quantityStorage =  getTotalQuantitiesFromStorage();
  // } else{
  //   return
  // }

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const incQty = ()=>{
        setQty(prev=> prev + 1);
    }
    const decQty = ()=>{
        setQty((prev)=> {
            if(prev-1 < 1) return 1
            return prev -1
        });
    }

      // useEffect (()=>{
      //   localStorage.setItem('cartItems',JSON.stringify( cartItems));
      //   localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
      //   localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
      // });
 
    const onAdd = (product, quantity)=>{
      
        const checkProductInCart = cartItems.find(item=>item._id === product._id);
        if(checkProductInCart) {
            setTotalPrice(prev=> prev + product.price * quantity);
            setTotalQuantities(prev => prev + quantity );
           const updatedCartItems = cartItems.map(items=> {
            if(items._id ===  product._id)  return {
                ...items,
                quantity: items.quantity + quantity
            }
            return cartItems ;
           }) ;
           setCartItems(updatedCartItems);
        } else{
            setTotalPrice(prev=> prev + product.price * quantity);
            setTotalQuantities(prev => prev + quantity );
            product.quantity = quantity;
            setCartItems ([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart`);
        setQty(1);

        
    }

    const toggleCartQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        let newCartItems = cartItems.filter((item) => item._id !== id)
    
        if(value === 'inc') {
          foundProduct = { ...foundProduct, quantity: foundProduct.quantity + 1 };
          newCartItems.splice(index, 0, foundProduct);
          setCartItems([...newCartItems]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else {
          if (foundProduct.quantity > 1) {
            foundProduct = { ...foundProduct, quantity: foundProduct.quantity - 1 };
            newCartItems.splice(index, 0, foundProduct);
            setCartItems([...newCartItems]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
          } else if (foundProduct.quantity === 1) {
           onRemove(id);
          }
        }
      }

      const onRemove =(id)=>{
        foundProduct = cartItems.find((item) => item._id === id)
        let newCartItems = cartItems.filter((item) => item._id !== id)

        setTotalPrice (prev => prev-foundProduct.price *foundProduct.quantity);
        setTotalQuantities(prev => prev - foundProduct.quantity);
        setCartItems(newCartItems);
      }

      const clearCart = ()=>{
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
      }




    return (
        <context.Provider
        value ={
            {
                showCart,
                
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartQuantity,
                onRemove,
                clearCart,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }
        }
        >
            {children}
        </context.Provider>
    )
}

export const useStateContext = ()=> useContext(context);
