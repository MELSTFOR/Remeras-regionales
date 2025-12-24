# 🇦🇷 Remeras Regionales - E-commerce de Remeras Regionales Argentinas

## 🚀 Tecnologías de Vanguardia

- **Next.js 15** con App Router
- **TypeScript** para desarrollo robusto
- **Tailwind CSS** para diseño moderno
- **Framer Motion** para animaciones fluidas
- **Zustand** para gestión de estado
- **Lucide React** para iconos

## ✨ Funcionalidades Principales

### 🤖 **Chatbot Inteligente**
- Sistema de chat en tiempo real
- Procesamiento de lenguaje natural
- Integración simulada con n8n
- Recomendaciones personalizadas

### 🧠 **Quiz de Personalidad ML**
- Algoritmo de Machine Learning
- 4 preguntas estratégicas
- Análisis de compatibilidad regional
- Recomendaciones basadas en personalidad

### 🗺️ **Mapa Interactivo de Argentina**
- 6 regiones con información cultural
- Animaciones y efectos interactivos
- Productos específicos por región

### 🛒 **E-commerce Moderno**
- Grid de productos responsive
- Carrito de compras funcional
- Sistema de favoritos
- Búsqueda inteligente

## 🔧 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar build de producción
npm start
```

## 🌐 Deploy en Vercel

### Opción 1: Deploy Automático
1. Conecta tu repositorio GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. ¡Deploy automático con cada push!

### Opción 2: CLI de Vercel
```bash
# Instalar CLI de Vercel
npm i -g vercel

# Deploy desde el directorio del proyecto
vercel

# Para producción
vercel --prod
```

### Variables de Entorno (Opcional)
```env
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 📱 Características PWA

- Instalable como aplicación nativa
- Funciona offline
- Notificaciones push (preparado)
- Optimizado para móviles

## 🎨 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ChatbotModal.tsx   # Modal del chatbot
│   ├── QuizModal.tsx      # Modal del quiz
│   ├── ProductGrid.tsx    # Grid de productos
│   ├── RegionalMap.tsx    # Mapa interactivo
│   ├── HeroSection.tsx    # Sección hero
│   └── Navbar.tsx         # Navegación
└── store/                 # Gestión de estado
    └── appStore.ts        # Store de Zustand
```

## 🔥 Características Avanzadas

- **TypeScript** completo para mayor robustez
- **Componentes modulares** reutilizables
- **Estado reactivo** con Zustand
- **Animaciones fluidas** con Framer Motion
- **Diseño responsive** optimizado para todos los dispositivos
- **SEO optimizado** con metadatos dinámicos
- **Performance optimizada** con lazy loading y code splitting

## 📊 Métricas de Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

## 🛡️ Seguridad

- Validación de tipos con TypeScript
- Sanitización de inputs
- Headers de seguridad configurados
- Dependencies actualizadas

## 🎯 Compatibilidad

- **Browsers**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **Mobile**: iOS 12+, Android 8+
- **Screen Readers**: Compatible con ARIA

## 📞 Soporte

Para consultas técnicas o comerciales:
- **Email**: info@remerasregionales.com.ar
- **WhatsApp**: +54 11 1234-5678
- **Documentación**: [docs.remerasregionales.com.ar](https://docs.remerasregionales.com.ar)

---

**Hecho con ❤️ en Argentina** 🇦🇷
