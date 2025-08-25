// src/pages/Cart.jsx
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'

const Cart = () => {
  const { cart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link 
          to="/" 
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="lg:w-96">
          <CartSummary />
          <Link 
            to="/" 
            className="block text-center mt-4 text-green-600 hover:text-green-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart