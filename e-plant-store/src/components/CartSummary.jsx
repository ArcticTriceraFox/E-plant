// src/components/CartSummary.jsx
import { useState } from 'react'
import { useCart } from '../context/useCart'

const CartSummary = () => {
  const { cart, clearCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleCheckout = () => {
    // Simulate checkout process
    setShowSuccess(true)
    setTimeout(() => {
      clearCart()
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button 
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Checkout
      </button>
      
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Order placed successfully!
        </div>
      )}
    </div>
  )
}

export default CartSummary