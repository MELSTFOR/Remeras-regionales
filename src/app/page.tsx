'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ShoppingCart, Search, Mic, MapPin, Sparkles, Brain, Heart, Instagram, Facebook, Twitter, Phone } from 'lucide-react'
import ChatbotModal from '@/components/ChatbotModal'
import QuizModal from '@/components/QuizModal'
import ProductGrid from '@/components/ProductGrid'
import RegionalMap from '@/components/RegionalMap'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import { useAppStore } from '@/store/appStore'

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const { cart, addToCart, quizResults, setQuizResults } = useAppStore()
  
  // Progressive Web App install prompt
  useEffect(() => {
    let deferredPrompt: any = null

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      deferredPrompt = e
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Show proactive chatbot notification after 5 seconds
    const timer = setTimeout(() => {
      if (!isChatOpen) {
        // Trigger notification animation
        const chatToggle = document.getElementById('chat-toggle')
        if (chatToggle) {
          chatToggle.classList.add('notification-pulse')
        }
      }
    }, 5000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      clearTimeout(timer)
    }
  }, [isChatOpen])

  const handleInstallPWA = () => {
    // Handle PWA installation
    setShowInstallPrompt(false)
  }

  const handleQuizComplete = (results: any) => {
    setQuizResults(results)
    setIsQuizOpen(false)
    setIsChatOpen(true) // Open chat to show recommendations
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar cartCount={cart.length} onCartClick={() => console.log('Cart clicked')} />
      
      {/* Hero Section */}
      <HeroSection onQuizStart={() => setIsQuizOpen(true)} />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Featured Products */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Diseños Regionales Destacados
            </h2>
            <p className="text-lg text-gray-700">
              Cada remera cuenta la historia de una región argentina
            </p>
          </motion.div>
          
          <ProductGrid />
        </section>

        {/* Interactive Regional Map */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <MapPin className="text-gray-800" />
              Explora Argentina
            </h2>
            <p className="text-lg text-gray-700">
              Descubre la cultura y tradiciones de cada región
            </p>
          </motion.div>
          
          <RegionalMap />
        </section>

        {/* AI Features Section */}
        <section className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Brain className="text-gray-800" />
              Inteligencia Artificial
            </h2>
            <p className="text-lg text-gray-700">
              Tecnología avanzada para encontrar tu remera perfecta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-300 cursor-pointer hover:border-gray-600 transition-colors"
              onClick={() => setIsQuizOpen(true)}
            >
              <Sparkles className="w-12 h-12 text-gray-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quiz de Personalidad
              </h3>
              <p className="text-gray-700">
                Algoritmo ML que analiza tu estilo y te recomienda productos
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-300 cursor-pointer hover:border-gray-600 transition-colors"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircle className="w-12 h-12 text-gray-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chatbot Inteligente
              </h3>
              <p className="text-gray-700">
                Asistente con IA que conoce toda la cultura argentina
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-300 cursor-pointer hover:border-gray-600 transition-colors"
            >
              <Heart className="w-12 h-12 text-gray-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Recomendaciones ML
              </h3>
              <p className="text-gray-700">
                Sistema de aprendizaje automático para sugerencias personalizadas
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">RR</span>
                </div>
                <span className="text-xl font-bold">Remeras Regionales</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Diseños auténticos que celebran la diversidad cultural argentina. 
                Cada remera cuenta la historia de una región.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="https://instagram.com/remerasregionales"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://facebook.com/remerasregionales"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/remerasregionales"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Enlaces */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Productos</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Buenos Aires</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Patagonia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Noroeste</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cuyo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Litoral</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pampa</a></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: info@remerasregionales.com.ar</li>
                <li>Teléfono: +54 11 1234-5678</li>
                <li>WhatsApp: +54 9 11 1234-5678</li>
                <li>Atención: Lun-Vie 9-18hs</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Remeras Regionales. Todos los derechos reservados. Hecho con ❤️ en Argentina.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <motion.button
        id="chat-toggle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gray-800 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 flex items-center justify-center z-40 border-2 border-white"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        
        {/* Neural Network Animation */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
          <div className="absolute w-2 h-2 bg-white rounded-full top-3 left-4 animate-pulse" />
          <div className="absolute w-1 h-1 bg-white rounded-full top-6 right-3 animate-pulse delay-300" />
          <div className="absolute w-1 h-1 bg-white rounded-full bottom-4 left-3 animate-pulse delay-700" />
        </div>

        {/* Notification Badge */}
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-semibold notification-badge"
          >
            1
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/5491112345678?text=Hola! Me interesa conocer más sobre las Remeras Regionales"
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-24 w-14 h-14 bg-gray-700 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center z-40 border-2 border-white"
      >
        <Phone className="w-6 h-6 text-white" />
      </motion.a>

      {/* PWA Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-2xl shadow-xl border z-30 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">¡Instala Remeras Regionales!</h3>
                <p className="text-sm text-gray-600">Acceso rápido desde tu dispositivo</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleInstallPWA}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 transition-colors"
                >
                  Instalar
                </button>
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                >
                  Ahora no
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ChatbotModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        initialQuizResults={quizResults}
      />
      
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />
    </div>
  )
}
