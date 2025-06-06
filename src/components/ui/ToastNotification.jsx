import React from 'react'
import { PartyPopper } from 'lucide-react'

const ToastNotification = ({ achievement, onClose }) => {
  if (!achievement) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-4 shadow-2xl border-2 border-amber-300 animate-bounce-in">
        <div className="flex items-center gap-3 text-white">
          <div className="text-3xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <PartyPopper size={16} />
              <span className="font-bold text-sm">Nova Conquista!</span>
            </div>
            <h4 className="font-black text-lg">{achievement.name}</h4>
            <p className="text-amber-100 text-sm">{achievement.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToastNotification