'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Brain, Heart, Music, Palette } from 'lucide-react'
import { QuizResult } from '@/store/appStore'

interface Question {
  id: number
  question: string
  options: {
    text: string
    value: string
    weight: Record<string, number>
  }[]
  icon: React.ReactNode
}

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (result: QuizResult) => void
}

export default function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      question: "¿Cómo describís tu estilo de vida?",
      icon: <Heart className="w-6 h-6" />,
      options: [
        {
          text: "Urbano y cosmopolita, me gusta la vida de ciudad",
          value: "urbano",
          weight: { "Buenos Aires": 3, "Noroeste": 1, "Patagonia": 1, "Cuyo": 2, "Litoral": 1, "Pampa": 1 }
        },
        {
          text: "Aventurero, disfruto la naturaleza y los deportes",
          value: "aventurero",
          weight: { "Buenos Aires": 1, "Noroeste": 2, "Patagonia": 3, "Cuyo": 2, "Litoral": 2, "Pampa": 2 }
        },
        {
          text: "Tradicional, valoro la historia y las costumbres",
          value: "tradicional",
          weight: { "Buenos Aires": 2, "Noroeste": 3, "Patagonia": 1, "Cuyo": 3, "Litoral": 2, "Pampa": 3 }
        },
        {
          text: "Relajado, busco tranquilidad y simplicidad",
          value: "relajado",
          weight: { "Buenos Aires": 1, "Noroeste": 2, "Patagonia": 2, "Cuyo": 2, "Litoral": 3, "Pampa": 3 }
        }
      ]
    },
    {
      id: 2,
      question: "¿Qué colores preferís en tu ropa?",
      icon: <Palette className="w-6 h-6" />,
      options: [
        {
          text: "Colores vibrantes y llamativos",
          value: "vibrantes",
          weight: { "Buenos Aires": 3, "Noroeste": 3, "Patagonia": 1, "Cuyo": 2, "Litoral": 2, "Pampa": 1 }
        },
        {
          text: "Tonos neutros y elegantes",
          value: "neutros",
          weight: { "Buenos Aires": 2, "Noroeste": 1, "Patagonia": 2, "Cuyo": 3, "Litoral": 1, "Pampa": 2 }
        },
        {
          text: "Colores pasteles y suaves",
          value: "pasteles",
          weight: { "Buenos Aires": 1, "Noroeste": 1, "Patagonia": 2, "Cuyo": 2, "Litoral": 3, "Pampa": 2 }
        },
        {
          text: "Colores oscuros y profundos",
          value: "oscuros",
          weight: { "Buenos Aires": 2, "Noroeste": 2, "Patagonia": 3, "Cuyo": 2, "Litoral": 1, "Pampa": 2 }
        }
      ]
    },
    {
      id: 3,
      question: "¿Qué música te representa?",
      icon: <Music className="w-6 h-6" />,
      options: [
        {
          text: "Tango y música clásica argentina",
          value: "tango",
          weight: { "Buenos Aires": 3, "Noroeste": 1, "Patagonia": 1, "Cuyo": 2, "Litoral": 1, "Pampa": 2 }
        },
        {
          text: "Folklore y música tradicional",
          value: "folklore",
          weight: { "Buenos Aires": 1, "Noroeste": 3, "Patagonia": 2, "Cuyo": 3, "Litoral": 2, "Pampa": 3 }
        },
        {
          text: "Rock nacional y alternativo",
          value: "rock",
          weight: { "Buenos Aires": 2, "Noroeste": 2, "Patagonia": 3, "Cuyo": 2, "Litoral": 1, "Pampa": 1 }
        },
        {
          text: "Pop y música internacional",
          value: "pop",
          weight: { "Buenos Aires": 2, "Noroeste": 1, "Patagonia": 1, "Cuyo": 1, "Litoral": 3, "Pampa": 1 }
        }
      ]
    },
    {
      id: 4,
      question: "¿Qué valorás más en una remera?",
      icon: <Brain className="w-6 h-6" />,
      options: [
        {
          text: "El diseño y el impacto visual",
          value: "diseño",
          weight: { "Buenos Aires": 3, "Noroeste": 3, "Patagonia": 2, "Cuyo": 2, "Litoral": 1, "Pampa": 1 }
        },
        {
          text: "La comodidad y la calidad",
          value: "comodidad",
          weight: { "Buenos Aires": 1, "Noroeste": 2, "Patagonia": 3, "Cuyo": 3, "Litoral": 3, "Pampa": 3 }
        },
        {
          text: "La historia y el significado cultural",
          value: "cultura",
          weight: { "Buenos Aires": 2, "Noroeste": 3, "Patagonia": 1, "Cuyo": 3, "Litoral": 2, "Pampa": 3 }
        },
        {
          text: "La versatilidad para combinar",
          value: "versatilidad",
          weight: { "Buenos Aires": 3, "Noroeste": 1, "Patagonia": 2, "Cuyo": 2, "Litoral": 2, "Pampa": 2 }
        }
      ]
    }
  ]

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      processQuizResults(newAnswers)
    }
  }

  const processQuizResults = async (allAnswers: string[]) => {
    setIsProcessing(true)

    // Calculate regional scores
    const regionScores: Record<string, number> = {
      "Buenos Aires": 0,
      "Noroeste": 0,
      "Patagonia": 0,
      "Cuyo": 0,
      "Litoral": 0,
      "Pampa": 0
    }

    // Process each answer and add weights
    allAnswers.forEach((answer, index) => {
      const question = questions[index]
      const selectedOption = question.options.find(opt => opt.value === answer)
      
      if (selectedOption) {
        Object.entries(selectedOption.weight).forEach(([region, weight]) => {
          regionScores[region] += weight
        })
      }
    })

    // Find the region with highest score
    const bestRegion = Object.entries(regionScores)
      .sort(([,a], [,b]) => b - a)[0]
    
    const maxScore = Math.max(...Object.values(regionScores))
    const normalizedScore = maxScore / (questions.length * 3) // Max possible score per question is 3

    // Generate personality description
    const personality = generatePersonalityDescription(allAnswers)
    
    // Generate recommendations
    const recommendations = generateRecommendations(bestRegion[0])

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    const result: QuizResult = {
      personality,
      preferredRegion: bestRegion[0],
      score: normalizedScore,
      recommendations
    }

    setIsProcessing(false)
    onComplete(result)
  }

  const generatePersonalityDescription = (allAnswers: string[]): string => {
    const traits = {
      urbano: 'Urbano Cosmopolita',
      aventurero: 'Aventurero Natural',
      tradicional: 'Tradicionalista Cultural',
      relajado: 'Espíritu Libre'
    }
    
    // Use the first answer as primary personality trait
    return traits[allAnswers[0] as keyof typeof traits] || 'Personalidad Única'
  }

  const generateRecommendations = (region: string) => {
    const products = {
      "Buenos Aires": [
        { id: 1, name: 'Tango Porteño', region: 'Buenos Aires', price: 8500, image: '/api/placeholder/150/150', description: 'Diseño que captura la pasión del tango', tags: ['urbano', 'tango'] },
        { id: 2, name: 'Noche Porteña', region: 'Buenos Aires', price: 7800, image: '/api/placeholder/150/150', description: 'La vida nocturna de la capital', tags: ['urbano', 'noche'] }
      ],
      "Patagonia": [
        { id: 3, name: 'Glaciar Eterno', region: 'Patagonia', price: 9200, image: '/api/placeholder/150/150', description: 'La majestuosidad de los glaciares', tags: ['aventura', 'naturaleza'] },
        { id: 4, name: 'Viento Patagónico', region: 'Patagonia', price: 8900, image: '/api/placeholder/150/150', description: 'La libertad de los vientos del sur', tags: ['aventura', 'viento'] }
      ],
      "Noroeste": [
        { id: 5, name: 'Cerro Ancestral', region: 'Noroeste', price: 7500, image: '/api/placeholder/150/150', description: 'Tradiciones milenarias del NOA', tags: ['tradición', 'ancestral'] },
        { id: 6, name: 'Pachamama', region: 'Noroeste', price: 8000, image: '/api/placeholder/150/150', description: 'Conexión con la madre tierra', tags: ['tradición', 'pachamama'] }
      ]
    }
    
    return products[region as keyof typeof products] || products["Buenos Aires"]
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setIsProcessing(false)
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
          className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Quiz de Personalidad</h3>
                  <p className="text-sm opacity-90">Descubrí tu estilo argentino</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Progress bar */}
            {!isProcessing && (
              <div className="mt-4">
                <div className="flex justify-between text-sm opacity-80 mb-2">
                  <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <motion.div
                    className="bg-white h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {isProcessing ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Analizando tu personalidad...</h4>
                <p className="text-gray-600">Nuestro algoritmo de IA está procesando tus respuestas para encontrar tu región ideal argentina.</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      {questions[currentQuestion].icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {questions[currentQuestion].question}
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full p-4 text-left bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 group-hover:text-purple-700 transition-colors">
                            {option.text}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          
          {/* Footer */}
          {!isProcessing && (
            <div className="px-6 pb-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={resetQuiz}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  Reiniciar
                </button>
                <p className="text-sm text-gray-500">
                  Basado en algoritmos de Machine Learning
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}