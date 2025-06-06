/**
 * Utilitários para trabalhar com datas no app
 */

// Nomes dos meses em português
export const MONTH_NAMES = {
  january: 'Janeiro',
  february: 'Fevereiro', 
  march: 'Março',
  april: 'Abril',
  may: 'Maio',
  june: 'Junho',
  july: 'Julho',
  august: 'Agosto',
  september: 'Setembro',
  october: 'Outubro',
  november: 'Novembro',
  december: 'Dezembro'
}

// Meses em inglês (chaves)
export const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
]

/**
 * Obter o mês atual em formato de chave (inglês)
 */
export function getCurrentMonthKey() {
  const now = new Date()
  return MONTH_KEYS[now.getMonth()]
}

/**
 * Obter o nome do mês em português
 */
export function getMonthName(monthKey) {
  return MONTH_NAMES[monthKey] || monthKey
}

/**
 * Obter informações do mês atual
 */
export function getCurrentMonthInfo() {
  const now = new Date()
  const monthKey = MONTH_KEYS[now.getMonth()]
  const monthName = MONTH_NAMES[monthKey]
  const year = now.getFullYear()
  
  return {
    key: monthKey,
    name: monthName,
    year,
    displayName: `${monthName} ${year}`
  }
}

/**
 * Converter índice do mês (0-11) para chave
 */
export function monthIndexToKey(index) {
  return MONTH_KEYS[index] || 'january'
}

/**
 * Converter chave do mês para índice (0-11)
 */
export function monthKeyToIndex(key) {
  return MONTH_KEYS.indexOf(key.toLowerCase())
}

/**
 * Obter o próximo mês
 */
export function getNextMonth(currentMonthKey) {
  const currentIndex = monthKeyToIndex(currentMonthKey)
  const nextIndex = (currentIndex + 1) % 12
  return MONTH_KEYS[nextIndex]
}

/**
 * Obter o mês anterior
 */
export function getPreviousMonth(currentMonthKey) {
  const currentIndex = monthKeyToIndex(currentMonthKey)
  const prevIndex = currentIndex === 0 ? 11 : currentIndex - 1
  return MONTH_KEYS[prevIndex]
}

/**
 * Obter todos os meses para o seletor
 */
export function getAllMonths() {
  return MONTH_KEYS.map(key => ({
    key,
    name: MONTH_NAMES[key],
    index: monthKeyToIndex(key)
  }))
}

/**
 * Formatar data para exibição
 */
export function formatDate(date) {
  if (!date) return ''
  
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  
  return `${day}/${month}/${year}`
}

/**
 * Calcular dias desde uma data
 */
export function daysSince(startDate) {
  if (!startDate) return 0
  
  const start = new Date(startDate)
  const now = new Date()
  const diffTime = Math.abs(now - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

/**
 * Verificar se é um novo dia (para resetar streak)
 */
export function isNewDay(lastCheckDate) {
  if (!lastCheckDate) return true
  
  const last = new Date(lastCheckDate)
  const now = new Date()
  
  return (
    last.getDate() !== now.getDate() ||
    last.getMonth() !== now.getMonth() ||
    last.getFullYear() !== now.getFullYear()
  )
}