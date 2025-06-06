import React from 'react'

const ProgressBar = ({ 
  percentage, 
  height = 'h-5', 
  gradient = 'from-indigo-500 via-purple-500 to-pink-500',
  showPulse = true 
}) => {
  return (
    <div className={`relative ${height} bg-gray-200 rounded-full overflow-hidden shadow-inner`}>
      <div 
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out shadow-lg`}
        style={{ width: `${percentage}%` }}
      >
        {showPulse && (
          <div className="absolute inset-0 bg-white/40 animate-pulse rounded-full"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full"></div>
      </div>
    </div>
  )
}

export default ProgressBar