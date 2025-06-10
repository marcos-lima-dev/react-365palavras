import React, { useState, useEffect } from 'react'
import { readingPlan } from './data/readingPlan'
import { getUnlockedAchievements } from './data/achievements'
import { useProgress, useMonthProgress } from './hooks/useProgress'
import { useAppSettings } from './hooks/useLocalStorage'
import { getCurrentMonthInfo } from './utils/dateUtils'

// Importar componentes
import BottomNavigation from './components/ui/BottomNavigation'
import ToastNotification from './components/ui/ToastNotification'
import ShareAchievementModal from './components/ui/ShareAchievementModal'
import HomeScreen from './components/screens/HomeScreen'
import PlanScreen from './components/screens/PlanScreen'
import ProgressScreen from './components/screens/ProgressScreen'
import SettingsScreen from './components/screens/SettingsScreen'

function App() {
  // Estados principais
  const [activeTab, setActiveTab] = useState('home')
  const [showToast, setShowToast] = useState(null)
  const [animatingIndex, setAnimatingIndex] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  
  // 🎉 NOVO: Estado para modal de compartilhamento
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareData, setShareData] = useState(null)
  
  // Mês ativo persistente
  const [activeMonth, setActiveMonth] = useState(() => {
    const saved = localStorage.getItem('365palavras-active-month')
    return saved || getCurrentMonthInfo().key
  })
  
  // Salvar mês ativo no localStorage
  useEffect(() => {
    localStorage.setItem('365palavras-active-month', activeMonth)
  }, [activeMonth])
  
  // Hooks de dados
  const stats = useProgress()
  const displayMonth = activeTab === 'plan' && selectedMonth ? selectedMonth : activeMonth
  const { readings, progress, toggleReading, percentage, completed, total } = useMonthProgress(displayMonth)
  const [settings, setSettings] = useAppSettings()

  // Função para calcular progresso de qualquer mês
  const getMonthProgress = (monthKey) => {
    const savedProgress = JSON.parse(localStorage.getItem('365palavras-progress') || '{}')
    const monthProgress = savedProgress[monthKey] || []
    const monthReadings = readingPlan[monthKey] || []
    const completed = monthProgress.filter(Boolean).length
    const total = monthReadings.length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    
    return { completed, total, percentage }
  }

  // 🎯 FUNÇÃO PARA DETECTAR CONQUISTAS DE LEITURA
  const checkForReadingAchievement = (readingIndex, monthProgress) => {
    const reading = readings[readingIndex]
    if (!reading) return false

    // Verificar se completou uma leitura completa (ex: "Gênesis 1-3")
    const isMultiChapterReading = reading.includes('-')
    
    if (isMultiChapterReading) {
      // Para leituras multi-capítulo, verificar se completou
      const newCompleted = monthProgress.filter(Boolean).length
      const newPercentage = Math.round((newCompleted / readings.length) * 100)
      
      // Mostrar conquista a cada 25% ou leitura importante
      if (newPercentage >= 25 && (newPercentage % 25 === 0 || newCompleted === 1)) {
        return true
      }
    }
    
    return false
  }

  // Handler para toggle de leitura com animação E verificação de conquista
  const handleToggleReading = (index) => {
    const wasCompleted = progress[index] || false
    
    setAnimatingIndex(index)
    setTimeout(() => setAnimatingIndex(null), 600)
    
    toggleReading(index)
    
    if (!wasCompleted) {
      // Calcular novo progresso após marcar como lido
      const newProgress = [...progress]
      newProgress[index] = true
      
      // Verificar se deve mostrar modal de conquista
      if (checkForReadingAchievement(index, newProgress)) {
        const reading = readings[index]
        const newCompleted = newProgress.filter(Boolean).length
        
        setTimeout(() => {
          setShareData({
            reading,
            completed: newCompleted,
            total: readings.length,
            version: 'ACF' // ou pegar da configuração
          })
          setShowShareModal(true)
        }, 1000) // Mostrar após a animação
      }
      
      setTimeout(() => checkForNewAchievements(), 500)
    }
  }

  // Verificar novas conquistas (sistema existente)
  const checkForNewAchievements = () => {
    const newStats = { ...stats, totalCompleted: stats.totalCompleted + 1 }
    const newAchievements = getUnlockedAchievements(newStats.totalCompleted, newStats.streak)
    const currentAchievements = getUnlockedAchievements(stats.totalCompleted, stats.streak)
    
    if (newAchievements.length > currentAchievements.length) {
      const newAchievement = newAchievements[newAchievements.length - 1]
      setShowToast(newAchievement)
      setTimeout(() => setShowToast(null), 4000)
    }
  }

  // Função para trocar mês ativo
  const handleSetActiveMonth = (monthKey) => {
    setActiveMonth(monthKey)
    setActiveTab('home')
    setSelectedMonth(null)
  }

  // Reset progresso
  const handleResetProgress = () => {
    localStorage.removeItem('365palavras-progress')
    window.location.reload()
  }

  // Renderizar tela ativa
  const renderActiveScreen = () => {
    switch(activeTab) {
      case 'home':
        return (
          <HomeScreen
            activeMonth={activeMonth}
            stats={stats}
            readings={readings}
            progress={progress}
            percentage={percentage}
            completed={completed}
            total={total}
            animatingIndex={animatingIndex}
            onToggleReading={handleToggleReading}
          />
        )
      
      case 'plan':
        return (
          <PlanScreen
            selectedMonth={selectedMonth}
            activeMonth={activeMonth}
            readings={readings}
            progress={progress}
            percentage={percentage}
            completed={completed}
            total={total}
            getMonthProgress={getMonthProgress}
            onSelectMonth={setSelectedMonth}
            onSetActiveMonth={handleSetActiveMonth}
            onToggleReading={handleToggleReading}
            onBackToGrid={() => setSelectedMonth(null)}
          />
        )
      
      case 'progress':
        return <ProgressScreen stats={stats} />
      
      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={setSettings}
            onResetProgress={handleResetProgress}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-cyan-50 relative">
      
      {/* Toast de Conquista */}
      <ToastNotification 
        achievement={showToast} 
        onClose={() => setShowToast(null)} 
      />

      {/* 🎉 NOVO: Modal de Compartilhamento */}
      {shareData && (
        <ShareAchievementModal
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false)
            setShareData(null)
          }}
          reading={shareData.reading}
          completed={shareData.completed}
          total={shareData.total}
          version={shareData.version}
        />
      )}

      {/* Conteúdo Principal */}
      <div className="max-w-md mx-auto p-4">
        {renderActiveScreen()}
      </div>

      {/* Navegação Inferior */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  )
}

export default App