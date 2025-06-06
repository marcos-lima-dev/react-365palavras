/**
 * Sistema de conquistas do app 365Palavras
 */

export const achievements = [
  {
    id: 'firstStep',
    name: 'Primeiro Passo',
    description: 'Complete sua primeira leitura',
    icon: '🌱',
    requirement: 1,
    type: 'total',
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'oneWeek',
    name: 'Uma Semana',
    description: 'Leia por 7 dias consecutivos',
    icon: '⭐',
    requirement: 7,
    type: 'streak',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'perseverance',
    name: 'Perseverança',
    description: 'Complete 30 leituras',
    icon: '🏆',
    requirement: 30,
    type: 'total',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'dedicated',
    name: 'Dedicado',
    description: 'Complete 100 leituras',
    icon: '💎',
    requirement: 100,
    type: 'total',
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'faithful',
    name: 'Leitor Fiel',
    description: 'Complete 200 leituras',
    icon: '👑',
    requirement: 200,
    type: 'total',
    color: 'from-indigo-400 to-purple-600'
  },
  {
    id: 'completist',
    name: 'Completista',
    description: 'Complete todas as 365 leituras',
    icon: '🎯',
    requirement: 365,
    type: 'total',
    color: 'from-pink-400 to-red-500'
  }
]

/**
 * Versículos motivacionais para rotação
 */
export const motivationalVerses = [
  {
    text: "Lâmpada para os meus pés é tua palavra e luz para o meu caminho.",
    reference: "Salmos 119:105"
  },
  {
    text: "Toda Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça.",
    reference: "2 Timóteo 3:16"
  },
  {
    text: "Não se aparte da tua boca o livro desta Lei; antes, medita nele dia e noite, para que tenhas cuidado de fazer conforme tudo quanto nele está escrito.",
    reference: "Josué 1:8"
  },
  {
    text: "A palavra de Deus é viva, e eficaz, e mais cortante do que qualquer espada de dois gumes.",
    reference: "Hebreus 4:12"
  }
]

/**
 * Obter uma conquista por ID
 */
export function getAchievementById(id) {
  return achievements.find(achievement => achievement.id === id)
}

/**
 * Obter conquistas desbloqueadas baseado no progresso
 */
export function getUnlockedAchievements(totalCompleted, streak) {
  return achievements.filter(achievement => {
    if (achievement.type === 'total') {
      return totalCompleted >= achievement.requirement
    }
    if (achievement.type === 'streak') {
      return streak >= achievement.requirement
    }
    return false
  })
}

/**
 * Obter versículo motivacional aleatório
 */
export function getRandomVerse() {
  const randomIndex = Math.floor(Math.random() * motivationalVerses.length)
  return motivationalVerses[randomIndex]
}

/**
 * Obter versículo motivacional baseado no dia
 */
export function getDailyVerse() {
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  const verseIndex = dayOfYear % motivationalVerses.length
  return motivationalVerses[verseIndex]
}