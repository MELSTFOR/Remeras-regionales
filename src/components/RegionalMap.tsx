'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const regions = [
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    description: 'La capital cosmopolita',
    culture: 'Tango, vida nocturna, arquitectura europea',
    color: '#3B82F6',
    position: { x: 60, y: 70 }
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    description: 'Tierra de aventuras',
    culture: 'Glaciares, montañas, naturaleza extrema',
    color: '#10B981',
    position: { x: 45, y: 85 }
  },
  {
    id: 'noroeste',
    name: 'Noroeste',
    description: 'Raíces ancestrales',
    culture: 'Folklore, tradiciones, quebradas coloridas',
    color: '#F59E0B',
    position: { x: 35, y: 25 }
  },
  {
    id: 'cuyo',
    name: 'Cuyo',
    description: 'Tierra del vino',
    culture: 'Viñedos, montañas, tradición vitivinícola',
    color: '#8B5CF6',
    position: { x: 40, y: 55 }
  },
  {
    id: 'litoral',
    name: 'Litoral',
    description: 'Naturaleza acuática',
    culture: 'Ríos, esteros, biodiversidad',
    color: '#06B6D4',
    position: { x: 65, y: 40 }
  },
  {
    id: 'pampa',
    name: 'Pampa',
    description: 'Corazón gaucho',
    culture: 'Campo, tradición gaucha, llanura infinita',
    color: '#EF4444',
    position: { x: 55, y: 60 }
  }
]

export default function RegionalMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId)
  }

  const selectedData = selectedRegion ? regions.find(r => r.id === selectedRegion) : null

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map Container */}
          <div className="relative">
            <div className="relative w-full h-96 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Argentina Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-8xl opacity-20">🇦🇷</div>
              </div>
              
              {/* Interactive Regions */}
              {regions.map((region) => (
                <motion.div
                  key={region.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${region.position.x}%`,
                    top: `${region.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRegionClick(region.id)}
                  onHoverStart={() => setHoveredRegion(region.id)}
                  onHoverEnd={() => setHoveredRegion(null)}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
                      selectedRegion === region.id
                        ? 'ring-4 ring-white ring-opacity-50 scale-150'
                        : hoveredRegion === region.id
                        ? 'scale-125'
                        : ''
                    }`}
                    style={{ backgroundColor: region.color }}
                  />
                  
                  {/* Region Label */}
                  <AnimatePresence>
                    {(hoveredRegion === region.id || selectedRegion === region.id) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      >
                        <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                          {region.name}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Hacé clic en cualquier región para explorar su cultura
              </p>
            </div>
          </div>

          {/* Region Information */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedData ? (
                <motion.div
                  key={selectedData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: selectedData.color }}
                    />
                    <h3 className="text-2xl font-bold text-gray-900">{selectedData.name}</h3>
                  </div>
                  
                  <p className="text-lg text-gray-700 font-medium mb-3">
                    {selectedData.description}
                  </p>
                  
                  <p className="text-gray-600 mb-6">
                    {selectedData.culture}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Ver Productos
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
                    >
                      Más Información
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                    🗺️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Explorá Argentina
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Seleccioná una región en el mapa para descubrir su cultura única y los diseños inspirados en su identidad.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {regions.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => handleRegionClick(region.id)}
                        className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: region.color }}
                        />
                        <span className="text-gray-700">{region.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}