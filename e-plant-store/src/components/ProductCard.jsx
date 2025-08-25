// src/components/ProductCard.jsx
import { useCart } from '../context/useCart'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-700 font-bold">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard