// src/components/CartItem.jsx
import { useCart } from '../context/useCart'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="bg-gray-200 px-2 py-1 rounded-l"
        >
          -
        </button>
        <span className="px-3 py-1 bg-white border-y border-gray-200">
          {item.quantity}
        </span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="bg-gray-200 px-2 py-1 rounded-r"
        >
          +
        </button>
      </div>
      <div className="ml-4">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button 
        onClick={handleRemove}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem