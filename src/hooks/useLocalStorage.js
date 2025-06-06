import { useState, useEffect } from 'react'

/**
 * Hook customizado para gerenciar localStorage
 * @param {string} key - Chave para o localStorage
 * @param {any} initialValue - Valor inicial se não existir no localStorage
 * @returns {[any, function]} - [valor, função para atualizar]
 */
export function useLocalStorage(key, initialValue) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    
    try {
      // Tentar obter do localStorage
      const item = window.localStorage.getItem(key)
      // Analisar JSON armazenado ou, se não existir, retornar valor inicial
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Se erro, retornar valor inicial
      console.error(`Erro ao ler localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Retornar uma versão wrapped da função setState do useState 
  // que persiste o novo valor no localStorage
  const setValue = (value) => {
    try {
      // Permitir que value seja uma função para que tenhamos a mesma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Salvar no estado
      setStoredValue(valueToStore)
      
      // Salvar no localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // Um log mais avançado poderia ser útil aqui
      console.error(`Erro ao salvar no localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Hook para gerenciar as leituras completadas
 * Formato: { "january": [true, false, true, ...], "february": [...], ... }
 */
export function useReadingProgress() {
  return useLocalStorage('365palavras-progress', {})
}

/**
 * Hook para gerenciar configurações do app
 * Formato: { notifications: true, theme: 'light', ... }
 */
export function useAppSettings() {
  return useLocalStorage('365palavras-settings', {
    notifications: true,
    theme: 'light',
    startDate: new Date().toISOString().split('T')[0] // Data de início do plano
  })
}

/**
 * Hook para gerenciar conquistas desbloqueadas
 * Formato: { achievement1: true, achievement2: false, ... }
 */
export function useAchievements() {
  return useLocalStorage('365palavras-achievements', {})
}