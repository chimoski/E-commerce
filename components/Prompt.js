import React from 'react'

export const Prompt = ({setShowPrompt, onRemove, id}) => {
    const handleYes =()=>{
        setShowPrompt(false);
        onRemove(id);
    }
  return (
   <div className="prompt-wrapper">
     <div className='prompt-container'>
        <h3>Are you sure you want to remove item ?</h3>
        <div className="buts">
        <span 
        onClick={()=> setShowPrompt(false)}
        className='bttn'>no</span>
        <span
        onClick={handleYes}
         className='bttn'>yes</span>
        </div>
    </div>   
   </div>
  )
}

export const ClearCartPrompt = ({clearCart, setShowClearCartPrompt}) => {
    const handleYes =()=>{
        setShowClearCartPrompt(false);
        clearCart();
    }
  return (
   <div className="prompt-wrapper">
     <div className='prompt-container'>
        <p> <b>NB </b>:  All items will be cleared !!!</p>
        <h3>Are you sure you want to clear Cart ?</h3>
        <div className="buts">
        <span 
        onClick={()=> setShowClearCartPrompt(false)}
        className='bttn'>no</span>
        <span
        onClick={handleYes}
         className='bttn'>yes</span>
        </div>
    </div>   
   </div>
  )
}
