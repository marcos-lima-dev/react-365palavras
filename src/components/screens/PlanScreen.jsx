import React from 'react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getAllMonths } from '../../utils/dateUtils'
import { monthNames, readingPlan } from '../../data/readingPlan'
import MonthCard from '../ui/MonthCard'
import ReadingCard from '../ui/ReadingCard'

const PlanScreen = ({ 
  selectedMonth, 
  activeMonth,
  readings,
  progress,
  percentage,
  completed,
  total,
  getMonthProgress,
  onSelectMonth,
  onSetActiveMonth,
  onToggleReading,
  onBackToGrid
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pt-6">
        <button 
          onClick={onBackToGrid}
          className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/50 hover:scale-105 transition-all"
        >
          <ArrowLeft className="text-gray-600" size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-gray-800">
            {selectedMonth ? `${monthNames[selectedMonth]} 2025` : 'Plano Anual'}
          </h2>
          <p className="text-gray-600">
            {selectedMonth ? 'Leituras do mês selecionado' : 'Escolha um mês para ver as leituras'}
          </p>
        </div>
      </div>

      {selectedMonth ? (
        /* Detalhes do mês selecionado */
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-24">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-lg">{monthNames[selectedMonth]}</h3>
                <p className="text-gray-600 text-sm">{readings.length} leituras programadas</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-500">{completed}/{total}</div>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {readings.map((reading, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  (progress[index] || false)
                    ? 'bg-blue-50 border-blue-200 shadow-lg' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1'
                }`}
                onClick={() => onToggleReading(index)}
              >
                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  (progress[index] || false)
                    ? 'bg-blue-500 border-blue-500 text-white scale-110'
                    : 'border-gray-300 hover:border-blue-400 hover:scale-105'
                }`}>
                  {(progress[index] || false) && <span className="text-white text-sm">✓</span>}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${
                      (progress[index] || false) ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      {reading}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                      Dia {index + 1}
                    </span>
                  </div>
                  {(progress[index] || false) && (
                    <p className="text-sm text-blue-600 mt-1">✨ Concluído!</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grid dos meses */
        <div className="grid grid-cols-2 gap-4 mb-24">
          {getAllMonths().map((month) => {
            const monthStats = getMonthProgress(month.key)
            
            return (
              <MonthCard
                key={month.key}
                month={month}
                isActive={month.key === activeMonth}
                completed={monthStats.completed}
                total={monthStats.total}
                percentage={monthStats.percentage}
                onSelect={() => onSelectMonth(month.key)}
                onSetActive={onSetActiveMonth}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default PlanScreen