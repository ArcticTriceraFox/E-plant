// src/context/CartContext.jsx
import React, { createContext, useReducer, useEffect } from 'react'

export const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload
    case 'ADD_ITEM':
        {
          const existingItem = state.find(item => item.id === action.payload.id)
          if (existingItem) {
            return state.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
          return [...state, { ...action.payload, quantity: 1 }]
        }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    const savedCart = localStorage.getItem('eplant-cart')
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('eplant-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = product => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeFromCart = productId => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// useCart hook moved to useCart.js for Fast Refresh compliance