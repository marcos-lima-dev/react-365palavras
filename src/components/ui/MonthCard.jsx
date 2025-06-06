import React from 'react'
import { Calendar } from 'lucide-react'

const MonthCard = ({ 
  month, 
  isActive, 
  completed, 
  total, 
  percentage, 
  onSelect,
  onSetActive 
}) => {
  return (
    <div 
      className={`backdrop-blur-xl rounded-3xl p-6 shadow-xl border cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-emerald-100/80 border-emerald-300 ring-2 ring-emerald-400' 
          : 'bg-white/70 border-white/50'
      }`}
      onClick={onSelect}
    >
      <div className="text-center">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
          isActive 
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          <Calendar className="text-white" size={24} />
        </div>
        
        <h3 className={`font-black text-lg mb-2 ${
          isActive ? 'text-emerald-700' : 'text-gray-800'
        }`}>
          {month.name}
        </h3>
        
        {isActive && (
          <div className="mb-2">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold">
              <span>📖</span>
              <span>ATIVO</span>
            </div>
          </div>
        )}
        
        <div className={`text-2xl font-black mb-2 ${
          isActive ? 'text-emerald-600' : 'text-purple-600'
        }`}>
          {percentage}%
        </div>
        
        {/* Mini barra de progresso */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isActive 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {completed}/{total} leituras
        </p>
        
        {!isActive && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onSetActive(month.key)
            }}
            className="mt-3 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold hover:scale-105 transition-all"
          >
            Ler este mês
          </button>
        )}
      </div>
    </div>
  )
}

export default MonthCard