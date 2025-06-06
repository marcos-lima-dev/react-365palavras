import React from 'react'
import { BookOpen, Calendar, Target, Sparkles, Flame } from 'lucide-react'
import { getMonthName } from '../../utils/dateUtils'
import { getDailyVerse } from '../../data/achievements'
import ProgressBar from '../ui/ProgressBar'
import ReadingCard from '../ui/ReadingCard'

const HomeScreen = ({ 
  activeMonth, 
  stats, 
  readings, 
  progress, 
  percentage, 
  completed, 
  total, 
  animatingIndex,
  onToggleReading 
}) => {
  const dailyVerse = getDailyVerse()

  return (
    <>
      {/* Header Aprimorado */}
      <div className="text-center mb-6 pt-6">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12">
              <BookOpen className="text-white" size={28} />
            </div>
            {stats.streak > 0 && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <Flame className="text-white" size={14} />
              </div>
            )}
          </div>
          
          <div className="text-left">
            <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              365Palavras
            </h1>
            <p className="text-gray-600 font-medium">
              Olá! Vamos ler hoje? 📖
            </p>
            {stats.streak > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <Flame className="text-orange-500" size={14} />
                <span className="text-orange-600 font-bold text-sm">{stats.streak} dias seguidos!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Versículo Motivacional */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-2xl mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-violet-200 text-sm font-medium">Versículo do Dia</span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>
              <p className="text-white font-semibold leading-relaxed mb-3">
                "{dailyVerse.text}"
              </p>
              <p className="text-violet-200 text-sm font-medium">— {dailyVerse.reference}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard de Progresso */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-black text-gray-800 text-lg">{getMonthName(activeMonth)} 2025</h3>
              <p className="text-gray-600 text-sm">Seu progresso este mês</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-indigo-600">{percentage}%</div>
            <div className="text-sm text-gray-500">{completed}/{total} leituras</div>
          </div>
        </div>
        
        {/* Barra de progresso com animação */}
        <ProgressBar percentage={percentage} />

        {/* Mini estatísticas */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
            <div className="text-xl font-black text-emerald-600">{stats.totalCompleted}</div>
            <p className="text-xs text-emerald-700 font-medium">Total</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
            <div className="text-xl font-black text-blue-600">{stats.yearPercentage}%</div>
            <p className="text-xs text-blue-700 font-medium">Anual</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
            <div className="text-xl font-black text-orange-600">{stats.streak}</div>
            <p className="text-xs text-orange-700 font-medium">Sequência</p>
          </div>
        </div>
      </div>

      {/* Lista Completa de Leituras do Mês */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Target className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-gray-800 text-lg">Todas as Leituras de {getMonthName(activeMonth)}</h3>
            <p className="text-gray-600 text-sm">Toque para marcar como concluída • {readings.length} leituras no total</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-emerald-600">{completed}/{total}</div>
            <div className="text-xs text-gray-500">completas</div>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {readings.map((reading, index) => (
            <ReadingCard
              key={index}
              reading={reading}
              dayIndex={index}
              isCompleted={progress[index] || false}
              isAnimating={animatingIndex === index}
              onClick={() => onToggleReading(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default HomeScreen