// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import './index.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App