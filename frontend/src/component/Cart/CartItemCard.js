import React from 'react'
import {Link} from 'react-router-dom'
import './CartItemCard.css'

const CartItemCard = ({item , deleteCartItems}) => {
    // console.log(deleteCartItems)
  return (
    <div className="CartItemCard">
        <img  className = "CartItemCardImage" src={item.image} alt="" />
        <div className='cartItemDetail'>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price : ${item.price}`}</span>
            <p onClick={() => {
                deleteCartItems(item.product)
            }}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard