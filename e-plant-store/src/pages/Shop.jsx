// src/pages/Shop.jsx
import { useState, useMemo } from 'react'
import { plants } from '../data/plants'
import ProductGrid from '../components/ProductGrid'

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(plants.map(plant => plant.category))]

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Plant Shop</h1>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search plants..."
          className="px-4 py-2 border rounded flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <ProductGrid products={filteredPlants} />
    </div>
  )
}

export default Shop