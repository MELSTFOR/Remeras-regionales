'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, MapPin, Heart } from 'lucide-react'

interface HeroSectionProps {
  onQuizStart: () => void
}

export default function HeroSection({ onQuizStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-black bg-opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
            <span className="text-lg font-medium text-gray-200">Diseños Regionales Argentinos</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Remeras Regionales
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
            Cada remera cuenta la historia de una región. 
            <br className="hidden md:block" />
            Descubrí tu <span className="font-semibold">identidad argentina</span> perfecta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuizStart}
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 border-2 border-gray-200 hover:bg-gray-50"
          >
            <Sparkles className="w-6 h-6" />
            Descubrir mi Estilo
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-3"
          >
            <MapPin className="w-6 h-6" />
            Explorar Regiones
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-30">
            <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-white">IA Personalizada</h3>
            <p className="text-white text-opacity-90 text-sm">
              Algoritmo de Machine Learning que analiza tu personalidad
            </p>
          </div>
          
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-30">
            <MapPin className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-white">Autenticidad Regional</h3>
            <p className="text-white text-opacity-90 text-sm">
              Diseños inspirados en la verdadera cultura argentina
            </p>
          </div>
          
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-30">
            <Heart className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-white">Calidad Premium</h3>
            <p className="text-white text-opacity-90 text-sm">
              Sublimación de alta calidad en telas premium argentinas
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}