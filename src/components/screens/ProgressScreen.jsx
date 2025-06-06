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
          <p className="text-xs text-gray-500 mt-1">de 365 no ano</p>
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
            <p className="text-gray-600 text-sm">Sua jornada de 365 dias</p>
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
          <span>{365 - stats.totalCompleted} restantes</span>
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
            
            return (
              <div 
                key={achievement.id}
                className={`p-6 rounded-3xl text-center transition-all duration-300 ${
                  isUnlocked 
                    ? 'bg-gradient-to-r ' + achievement.color + ' text-white shadow-2xl scale-105' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="font-black text-lg mb-2">{achievement.name}</h4>
                <p className="text-sm opacity-90">{achievement.description}</p>
                
                {isUnlocked && (
                  <div className="mt-3 text-xs font-bold opacity-80">
                    ✨ DESBLOQUEADO!
                  </div>
                )}
                
                {!isUnlocked && (
                  <div className="mt-3 text-xs">
                    {achievement.type === 'total' ? `${achievement.requirement} leituras` : `${achievement.requirement} dias seguidos`}
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