import React from 'react'
import { CheckCircle2, Sparkles, ChevronRight } from 'lucide-react'

const ReadingCard = ({ 
  reading, 
  dayIndex, 
  isCompleted, 
  isAnimating, 
  onClick 
}) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
        isCompleted 
          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-lg transform' 
          : 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1'
      } ${isAnimating ? 'animate-bounce-in scale-105' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 p-4">
        
        {/* Checkbox customizado */}
        <div className={`relative w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
          isCompleted
            ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg'
            : 'border-gray-300 group-hover:border-emerald-400 group-hover:scale-105 bg-white'
        }`}>
          {isCompleted && <CheckCircle2 size={20} className="animate-fade-in" />}
          {!isCompleted && (
            <div className="w-4 h-4 rounded-lg bg-gray-100 group-hover:bg-emerald-100 transition-colors"></div>
          )}
        </div>
        
        {/* Conteúdo da leitura */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className={`font-bold transition-colors ${
              isCompleted ? 'text-emerald-700' : 'text-gray-800'
            }`}>
              {reading}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                Dia {dayIndex + 1}
              </span>
              {isCompleted && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
          
          {isCompleted && (
            <div className="flex items-center gap-2 animate-fade-in">
              <Sparkles size={14} className="text-emerald-500" />
              <span className="text-sm text-emerald-600 font-medium">Concluído! ✨</span>
            </div>
          )}
          
          {!isCompleted && (
            <p className="text-sm text-gray-500">Toque para marcar como lida</p>
          )}
        </div>
        
        {/* Indicador visual */}
        <ChevronRight 
          className={`transition-all duration-300 ${
            isCompleted 
              ? 'rotate-90 text-emerald-500 scale-110' 
              : 'text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1'
          }`} 
          size={20} 
        />
      </div>
      
      {/* Efeito visual de conclusão */}
      {isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 pointer-events-none"></div>
      )}
    </div>
  )
}

export default ReadingCard