'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Sparkles } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const products = [
  {
    id: 1,
    name: 'Tango Porteño',
    region: 'Buenos Aires',
    price: 8500,
    description: 'Diseño que captura la pasión del tango en cada fibra',
    image: '/api/placeholder/300/300',
    tags: ['urbano', 'tango', 'porteño']
  },
  {
    id: 2,
    name: 'Glaciar Patagónico',
    region: 'Patagonia',
    price: 9200,
    description: 'La majestuosidad de los glaciares australes',
    image: '/api/placeholder/300/300',
    tags: ['aventura', 'naturaleza', 'patagonia']
  },
  {
    id: 3,
    name: 'Cerro de los Siete Colores',
    region: 'Noroeste',
    price: 7800,
    description: 'Tradiciones ancestrales del NOA',
    image: '/api/placeholder/300/300',
    tags: ['tradición', 'colores', 'ancestral']
  },
  {
    id: 4,
    name: 'Viñedos de Mendoza',
    region: 'Cuyo',
    price: 8200,
    description: 'La elegancia de la tradición vitivinícola',
    image: '/api/placeholder/300/300',
    tags: ['vino', 'elegancia', 'cuyo']
  },
  {
    id: 5,
    name: 'Esteros del Iberá',
    region: 'Litoral',
    price: 7500,
    description: 'La biodiversidad del litoral argentino',
    image: '/api/placeholder/300/300',
    tags: ['naturaleza', 'esteros', 'biodiversidad']
  },
  {
    id: 6,
    name: 'Espíritu Gaucho',
    region: 'Pampa',
    price: 8000,
    description: 'La tradición gaucha en toda su esencia',
    image: '/api/placeholder/300/300',
    tags: ['gaucho', 'tradición', 'pampa']
  }
]

export default function ProductGrid() {
  const { addToCart, addToFavorites } = useAppStore()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    // Could add toast notification here
  }

  const handleAddToFavorites = (product: any) => {
    addToFavorites(product)
    // Could add toast notification here
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Product Image */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
                👕
              </div>
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAddToFavorites(product)}
                className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              </motion.button>
            </div>

            {/* Region Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {product.region}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-lg text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">Envío gratis</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(product)}
                className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar
              </motion.button>
            </div>
          </div>

          {/* AI Recommendation Badge */}
          {index < 2 && (
            <div className="absolute top-0 left-0 bg-gray-800 text-white px-3 py-1 text-xs font-semibold rounded-br-xl flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              IA Recomienda
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}