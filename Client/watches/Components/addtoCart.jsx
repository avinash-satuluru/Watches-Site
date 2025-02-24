import React from 'react'
import { useState } from 'react';
import './addtoCart.css'

const AddtoCart = () => {

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className='addtobag'>

            <div className='quantity'>
                <button className="quantityD" onClick={decreaseQuantity} >-</button>
                <input type="text" value={quantity} readOnly className="quantityIO" />
                <button className="quantityI" onClick={increaseQuantity} >+</button>
            </div>

            <button>Add to bag</button>
        </div>
    )
}

export default AddtoCart
