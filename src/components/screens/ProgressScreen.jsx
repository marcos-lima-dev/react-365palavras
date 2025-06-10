import React from 'react'
import { Trophy, Target, Flame, TrendingUp, Crown } from 'lucide-react'
import { achievements } from '../../data/achievements'
import ProgressBar from '../ui/ProgressBar'

const ProgressScreen = ({ stats }) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pt-6">
        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Trophy className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-800">Seu Progresso</h2>
          <p className="text-gray-600">Acompanhe suas conquistas e estatísticas</p>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Target className="text-white" size={28} />
          </div>
          <div className="text-3xl font-black text-emerald-600 mb-2">{stats.totalCompleted}</div>
          <p className="text-gray-600 font-medium">Leituras Completas</p>
          <p className="text-xs text-gray-500 mt-1">de {stats.totalDays} no ano</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Flame className="text-white" size={28} />
          </div>
          <div className="text-3xl font-black text-orange-600 mb-2">{stats.streak}</div>
          <p className="text-gray-600 font-medium">Dias Seguidos</p>
          <p className="text-xs text-gray-500 mt-1">sequência atual</p>
        </div>
      </div>

      {/* Progresso Anual */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-black text-gray-800 text-lg">Progresso Anual</h3>
            <p className="text-gray-600 text-sm">Sua jornada de {stats.totalDays} dias</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-black text-blue-600 mb-2">{stats.yearPercentage}%</div>
          <p className="text-gray-600">do ano completo</p>
        </div>

        <ProgressBar 
          percentage={stats.yearPercentage} 
          height="h-6" 
          gradient="from-blue-500 to-indigo-600"
        />

        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <span>{stats.totalCompleted} leituras</span>
          <span>{stats.daysRemaining} restantes</span>
        </div>
      </div>

      {/* Conquistas */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Crown className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-black text-gray-800 text-lg">Conquistas</h3>
            <p className="text-gray-600 text-sm">Medalhas desbloqueadas</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const isUnlocked = stats.achievements[achievement.id] || false
            
            // Animações específicas para cada conquista
            const getAnimationClass = (achievementId, isUnlocked) => {
              if (!isUnlocked) return ''
              
              switch(achievementId) {
                case 'firstStep':
                  return 'animate-bounce'
                case 'oneWeek':
                  return 'animate-pulse'
                case 'perseverance':
                  return 'animate-pulse hover:animate-bounce'
                case 'dedicated':
                  return 'animate-pulse hover:animate-spin'
                case 'faithful':
                  return 'animate-pulse hover:animate-ping'
                case 'completist':
                  return 'animate-bounce hover:animate-spin'
                default:
                  return 'animate-pulse'
              }
            }
            
            // Efeitos especiais para Completista
            const isCompletist = achievement.id === 'completist'
            
            return (
              <div 
                key={achievement.id}
                className={`relative overflow-hidden p-6 rounded-3xl text-center transition-all duration-500 ${
                  isUnlocked 
                    ? `bg-gradient-to-r ${achievement.color} text-white shadow-2xl scale-105 hover:scale-110` 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                } ${isCompletist && isUnlocked ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}`}
              >
                {/* Efeito de brilho para Completista */}
                {isCompletist && isUnlocked && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-2 left-2 text-yellow-300 animate-bounce text-xs" style={{animationDelay: '0.1s'}}>✨</div>
                      <div className="absolute top-3 right-3 text-yellow-300 animate-bounce text-xs" style={{animationDelay: '0.3s'}}>⭐</div>
                      <div className="absolute bottom-2 left-3 text-yellow-300 animate-bounce text-xs" style={{animationDelay: '0.5s'}}>🎉</div>
                      <div className="absolute bottom-3 right-2 text-yellow-300 animate-bounce text-xs" style={{animationDelay: '0.7s'}}>🏆</div>
                    </div>
                  </>
                )}
                
                {/* Ícone com animação específica */}
                <div className={`text-4xl mb-3 ${getAnimationClass(achievement.id, isUnlocked)} ${
                  isCompletist && isUnlocked ? 'filter drop-shadow-lg' : ''
                }`}>
                  {achievement.icon}
                </div>
                
                <h4 className="font-black text-lg mb-2">{achievement.name}</h4>
                <p className="text-sm opacity-90">{achievement.description}</p>
                
                {isUnlocked && (
                  <div className={`mt-3 text-xs font-bold opacity-80 ${
                    isCompletist ? 'animate-pulse text-yellow-200' : ''
                  }`}>
                    {isCompletist ? '🎯 PLANO COMPLETO! 🎯' : '✨ DESBLOQUEADO!'}
                  </div>
                )}
                
                {!isUnlocked && (
                  <div className="mt-3 text-xs">
                    {achievement.type === 'total' ? `${achievement.requirement} leituras` : `${achievement.requirement} dias seguidos`}
                  </div>
                )}
                
                {/* Efeito especial de ÉPICO para Completista */}
                {isCompletist && isUnlocked && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                    <span className="text-xs">👑</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ProgressScreen