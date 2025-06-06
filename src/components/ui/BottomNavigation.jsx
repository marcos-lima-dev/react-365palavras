import React from 'react'
import { BookOpen, Calendar, Trophy, Settings } from 'lucide-react'

const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { icon: BookOpen, label: "Home", id: "home" },
    { icon: Calendar, label: "Plano", id: "plan" },
    { icon: Trophy, label: "Progresso", id: "progress" },
    { icon: Settings, label: "Config", id: "settings" }
  ]

  return (
    <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto z-40">
      <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-2 border border-white/40 shadow-2xl">
        <div className="flex justify-around">
          {tabs.map((item) => (
            <button 
              key={item.id}
              className={`relative flex flex-col items-center justify-center py-3 px-4 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' 
                  : 'text-gray-600 hover:bg-white/30 hover:scale-105'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon size={22} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              
              {/* Indicador de aba ativa */}
              {activeTab === item.id && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation