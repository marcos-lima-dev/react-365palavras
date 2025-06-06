import { useMemo } from 'react'
import { useReadingProgress } from './useLocalStorage'
import { readingPlan, getTotalDays, getCurrentMonth } from '../data/readingPlan'

/**
 * Hook para calcular estatísticas de progresso
 */
export function useProgress() {
  const [progress] = useReadingProgress()
  
  // Calcular estatísticas
  const stats = useMemo(() => {
    // Total de leituras completadas no ano
    const totalCompleted = Object.values(progress).reduce((total, monthProgress) => {
      if (Array.isArray(monthProgress)) {
        return total + monthProgress.filter(Boolean).length
      }
      return total
    }, 0)
    
    // Total de dias no ano
    const totalDays = getTotalDays()
    
    // Porcentagem anual
    const yearPercentage = Math.round((totalCompleted / totalDays) * 100)
    
    // Mês atual
    const currentMonth = getCurrentMonth()
    const currentMonthProgress = progress[currentMonth] || []
    const currentMonthReadings = readingPlan[currentMonth] || []
    
    // Estatísticas do mês atual
    const monthCompleted = currentMonthProgress.filter(Boolean).length
    const monthTotal = currentMonthReadings.length
    const monthPercentage = monthTotal > 0 ? Math.round((monthCompleted / monthTotal) * 100) : 0
    
    // Calcular sequência (streak) - dias consecutivos
    const streak = calculateStreak(progress)
    
    // Calcular dias restantes no ano
    const daysRemaining = totalDays - totalCompleted
    
    return {
      // Estatísticas anuais
      totalCompleted,
      totalDays,
      yearPercentage,
      daysRemaining,
      
      // Estatísticas mensais
      currentMonth,
      monthCompleted,
      monthTotal,
      monthPercentage,
      
      // Outras estatísticas
      streak,
      
      // Conquistas
      achievements: calculateAchievements(totalCompleted, streak)
    }
  }, [progress])
  
  return stats
}

/**
 * Hook para gerenciar leituras de um mês específico
 */
export function useMonthProgress(month) {
  const [progress, setProgress] = useReadingProgress()
  
  const monthKey = month.toLowerCase()
  const monthProgress = progress[monthKey] || []
  const monthReadings = readingPlan[monthKey] || []
  
  // Função para marcar/desmarcar uma leitura
  const toggleReading = (dayIndex) => {
    const newMonthProgress = [...monthProgress]
    
    // Garantir que o array tenha o tamanho correto
    while (newMonthProgress.length < monthReadings.length) {
      newMonthProgress.push(false) // Começar com false (não lido)
    }
    
    // Toggle do status
    newMonthProgress[dayIndex] = !newMonthProgress[dayIndex]
    
    // Atualizar o progresso
    setProgress(prev => ({
      ...prev,
      [monthKey]: newMonthProgress
    }))
  }
  
  return {
    readings: monthReadings,
    progress: monthProgress,
    toggleReading,
    completed: monthProgress.filter(Boolean).length,
    total: monthReadings.length,
    percentage: monthReadings.length > 0 ? Math.round((monthProgress.filter(Boolean).length / monthReadings.length) * 100) : 0
  }
}

/**
 * Calcular sequência de dias consecutivos
 */
function calculateStreak(progress) {
  // Esta é uma implementação simplificada
  // Em uma versão mais avançada, consideraríamos as datas reais
  let streak = 0
  const currentMonth = getCurrentMonth()
  const monthProgress = progress[currentMonth] || []
  
  // Contar dias consecutivos do final para o início
  for (let i = monthProgress.length - 1; i >= 0; i--) {
    if (monthProgress[i]) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

/**
 * Calcular conquistas baseadas no progresso
 */
function calculateAchievements(totalCompleted, streak) {
  return {
    firstStep: totalCompleted >= 1,      // Primeiro Passo
    oneWeek: streak >= 7,                // Uma Semana
    perseverance: totalCompleted >= 30,  // Perseverança
    dedicated: totalCompleted >= 100,    // Dedicado
    faithful: totalCompleted >= 200,     // Leitor Fiel
    completist: totalCompleted >= 365    // Completista
  }
}