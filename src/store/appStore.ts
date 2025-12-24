import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: number
  name: string
  region: string
  price: number
  image: string
  description: string
  tags: string[]
}

export interface QuizResult {
  personality: string
  preferredRegion: string
  score: number
  recommendations: Product[]
}

interface AppState {
  // Cart
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  
  // Favorites
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: number) => void
  
  // Quiz results
  quizResults: QuizResult | null
  setQuizResults: (results: QuizResult) => void
  
  // User preferences
  userPreferences: {
    region?: string
    style?: string
    colors?: string[]
  }
  updateUserPreferences: (preferences: Partial<AppState['userPreferences']>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product) => 
        set((state) => ({ 
          cart: [...state.cart, product] 
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter(item => item.id !== productId)
        })),
      clearCart: () => set({ cart: [] }),
      
      // Favorites state
      favorites: [],
      addToFavorites: (product) =>
        set((state) => ({ 
          favorites: [...state.favorites, product] 
        })),
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter(item => item.id !== productId)
        })),
      
      // Quiz state
      quizResults: null,
      setQuizResults: (results) => set({ quizResults: results }),
      
      // User preferences
      userPreferences: {},
      updateUserPreferences: (preferences) =>
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...preferences }
        }))
    }),
    {
      name: 'regional-wear-storage'
    }
  )
)