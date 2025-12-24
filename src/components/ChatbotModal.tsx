'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, Sparkles, MessageCircle, Brain, User } from 'lucide-react'
import { QuizResult } from '@/store/appStore'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  products?: any[]
  actions?: { label: string; action: string }[]
}

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuizResults?: QuizResult | null
}

export default function ChatbotModal({ isOpen, onClose, initialQuizResults }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState({
    userProfile: {},
    quizCompleted: false,
    currentFlow: null
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage()
      setMessages([{
        id: generateId(),
        type: 'bot',
        content: welcomeMessage,
        timestamp: new Date(),
        actions: [
          { label: '🧠 Hacer Quiz', action: 'start-quiz' },
          { label: '🗺️ Explorar Regiones', action: 'explore-regions' },
          { label: '👕 Ver Productos', action: 'view-products' }
        ]
      }])
    }
  }, [isOpen])

  // Handle quiz results
  useEffect(() => {
    if (initialQuizResults && isOpen) {
      const quizMessage = {
        id: generateId(),
        type: 'bot' as const,
        content: `¡Excelente! Completaste el quiz. Según tu personalidad "${initialQuizResults.personality}", tu región ideal es ${initialQuizResults.preferredRegion} con un ${Math.round(initialQuizResults.score * 100)}% de compatibilidad.`,
        timestamp: new Date(),
        products: initialQuizResults.recommendations,
        actions: [
          { label: '🛒 Ver más productos', action: 'view-more' },
          { label: '🔄 Hacer quiz otra vez', action: 'retake-quiz' }
        ]
      }
      
      setMessages(prev => [...prev, quizMessage])
      setConversationContext(prev => ({ 
        ...prev, 
        quizCompleted: true,
        userProfile: initialQuizResults 
      }))
    }
  }, [initialQuizResults, isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const getWelcomeMessage = () => {
    const welcomes = [
      '¡Hola! Soy Manu, tu asistente de estilo argentino potenciado por IA. Te ayudo a encontrar la remera que refleje tu esencia argentina 🇦🇷',
      '¡Che, qué tal! Soy Manu, especialista en conectar tu personalidad con los diseños regionales argentinos. ¿Empezamos?',
      '¡Buenas! Tu asistente virtual argentino acá. Con inteligencia artificial y mucho conocimiento cultural, te ayudo a elegir tu remera perfecta.'
    ]
    return welcomes[Math.floor(Math.random() * welcomes.length)]
  }

  const simulateAIResponse = async (userMessage: string): Promise<Message> => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    
    // Quiz flow detection
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('recomend')) {
      return {
        id: generateId(),
        type: 'bot',
        content: '¡Perfecto! El Quiz de Estilo es la mejor manera de encontrar tu remera ideal. Te voy a hacer algunas preguntas para entender tu personalidad y gustos argentinos.',
        timestamp: new Date(),
        actions: [
          { label: '🚀 Comenzar Quiz', action: 'begin-quiz' },
          { label: '📚 Más info del Quiz', action: 'quiz-info' }
        ]
      }
    }
    
    // Regional analysis
    if (detectRegionalIntent(lowerMessage)) {
      return handleRegionalQuery(lowerMessage)
    }
    
    // Product recommendation
    if (lowerMessage.includes('remera') || lowerMessage.includes('producto') || lowerMessage.includes('diseño')) {
      return generateProductRecommendation(lowerMessage)
    }
    
    // Size guidance
    if (lowerMessage.includes('talla') || lowerMessage.includes('medida') || lowerMessage.includes('tamaño')) {
      return {
        id: generateId(),
        type: 'bot',
        content: 'Te ayudo con las tallas. Nuestras remeras siguen el tallaje argentino estándar. Para una medida perfecta, te recomiendo medir el contorno de pecho y comparar con nuestra guía.',
        timestamp: new Date(),
        actions: [
          { label: '📏 Ver guía de tallas', action: 'size-guide' },
          { label: '📞 Asesoramiento personalizado', action: 'personal-help' }
        ]
      }
    }
    
    // Default contextual response
    return generateContextualResponse(userMessage)
  }

  const detectRegionalIntent = (message: string): boolean => {
    const regions = ['buenos aires', 'patagonia', 'noroeste', 'cuyo', 'litoral', 'pampa', 'porteño', 'norteño']
    return regions.some(region => message.includes(region))
  }

  const handleRegionalQuery = (message: string): Message => {
    const regions: Record<string, string> = {
      'buenos aires': '🏙️ Buenos Aires es pura pasión urbana. El tango, la vida nocturna y la cultura cosmopolita se reflejan en nuestros diseños porteños.',
      'patagonia': '🏔️ La Patagonia es tierra de aventureros. Glaciares, montañas y paisajes épicos que inspiran nuestros diseños más audaces.',
      'noroeste': '🌄 El Noroeste argentino conecta con nuestras raíces ancestrales. Colores, tradiciones y cultura milenaria en cada diseño.',
      'cuyo': '🍷 Cuyo es elegancia y tradición vitivinícola. La sofisticación de los vinos se refleja en nuestros diseños más refinados.',
      'litoral': '🌊 El Litoral es naturaleza acuática pura. Ríos, esteros y la rica cultura guaraní inspiran nuestros diseños más naturales.',
      'pampa': '🐎 La Pampa es libertad infinita. El espíritu gaucho y la inmensidad del campo argentino viven en nuestros diseños más tradicionales.'
    }
    
    for (const [region, description] of Object.entries(regions)) {
      if (message.includes(region)) {
        return {
          id: generateId(),
          type: 'bot',
          content: description,
          timestamp: new Date(),
          products: getRegionalProducts(region),
          actions: [
            { label: `Ver productos de ${region}`, action: `view-region-${region.replace(' ', '-')}` },
            { label: 'Comparar con otras regiones', action: 'compare-regions' }
          ]
        }
      }
    }
    
    return generateContextualResponse(message)
  }

  const generateProductRecommendation = (message: string): Message => {
    const recommendations = [
      {
        id: 1,
        name: 'Tango Porteño',
        region: 'Buenos Aires',
        price: 8500,
        match: 95,
        image: '/api/placeholder/150/150'
      },
      {
        id: 2,
        name: 'Glaciar Patagónico', 
        region: 'Patagonia',
        price: 9200,
        match: 87,
        image: '/api/placeholder/150/150'
      }
    ]
    
    return {
      id: generateId(),
      type: 'bot',
      content: 'Basándome en tu perfil y preferencias, estas son mis recomendaciones personalizadas:',
      timestamp: new Date(),
      products: recommendations,
      actions: [
        { label: '🔄 Más recomendaciones', action: 'more-recommendations' },
        { label: '🧠 Hacer quiz completo', action: 'start-quiz' }
      ]
    }
  }

  const generateContextualResponse = (message: string): Message => {
    const responses = [
      'Entiendo tu consulta. ¿Te puedo ayudar con algo específico sobre nuestras remeras regionales?',
      'Esa es una buena pregunta. ¿Te interesa explorar alguna región argentina en particular?',
      'Me parece genial tu interés. ¿Querés que te ayude a encontrar tu remera ideal con el quiz de personalidad?'
    ]
    
    return {
      id: generateId(),
      type: 'bot',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      actions: [
        { label: '🧠 Quiz de Estilo', action: 'start-quiz' },
        { label: '🗺️ Explorar Regiones', action: 'explore-regions' }
      ]
    }
  }

  const getRegionalProducts = (region: string) => {
    // Mock regional products
    return [
      {
        id: Math.random(),
        name: `Diseño ${region}`,
        region: region,
        price: 8500,
        match: 92,
        image: '/api/placeholder/100/100'
      }
    ]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const botResponse = await simulateAIResponse(userMessage.content)
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = {
        id: generateId(),
        type: 'bot',
        content: 'Disculpá, tuve un problemita técnico. ¿Podés repetir tu pregunta?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleActionClick = (action: string) => {
    // Handle different actions
    switch (action) {
      case 'start-quiz':
      case 'begin-quiz':
        onClose() // Close chat modal
        // Quiz modal would be opened by parent component
        break
      case 'explore-regions':
        // Scroll to regional map section
        document.getElementById('regional-map')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'view-products':
        // Scroll to products section
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
        break
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-800 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Manu AI</h3>
                  <p className="text-sm text-gray-300">Asistente de Estilo Argentino</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  
                  {/* Products */}
                  {message.products && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product, index) => (
                        <div key={index} className="bg-white bg-opacity-90 rounded-lg p-2 text-xs text-gray-900">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                              👕
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-gray-600">${product.price?.toLocaleString()}</p>
                            </div>
                            {product.match && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                {product.match}% match
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Actions */}
                  {message.actions && (
                    <div className="mt-3 space-y-1">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action.action)}
                          className="block w-full text-left px-3 py-2 bg-white bg-opacity-20 rounded-lg text-xs hover:bg-opacity-30 transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl max-w-xs border border-gray-200">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse delay-100"></div>
                      <div className="w-1 h-1 bg-gray-600 rounded-full animate-pulse delay-200"></div>
                    </div>
                    <span className="text-xs text-gray-600 ml-2">Manu está escribiendo...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-300">
                <Mic className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Preguntame sobre remeras argentinas..."
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-2xl resize-none max-h-20 focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-600"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}