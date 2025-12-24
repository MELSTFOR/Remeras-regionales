'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingCart, Heart, User, Mic } from 'lucide-react'

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white bg-opacity-95 backdrop-blur-lg border-b border-gray-300 sticky top-0 z-30 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RR</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Remeras Regionales</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar diseños regionales..."
                className="w-full pl-10 pr-12 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:bg-white transition-colors placeholder-gray-600"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors relative">
              <Heart className="w-6 h-6" />
            </button>
            
            <button 
              onClick={onCartClick}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}