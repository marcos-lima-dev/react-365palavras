import React from 'react'
import { Share2, Trophy, Crown, Sparkles, MessageCircle, X } from 'lucide-react'

const ShareAchievementModal = ({ 
  isOpen, 
  onClose, 
  reading, 
  completed,
  total,
  version = 'ACF' 
}) => {
  if (!isOpen) return null

  // Calcular estatísticas
  const percentage = Math.round((completed / total) * 100)

  // Gerar texto de conquista
  const generateShareText = () => {
    const conquistas = [
      "🔥 Acabei de completar",
      "🎯 Conquistei mais uma etapa:",
      "📖 Finalizei a leitura de",
      "✨ Mais uma vitória espiritual:"
    ]
    
    const motivacao = [
      "Cada versículo é um passo mais perto de Deus! 🙏",
      "A Palavra transforma vidas! 💫",
      "365 dias de crescimento espiritual! 🌱",
      "Lendo a Bíblia inteira este ano! 📚"
    ]

    const conquistaTexto = conquistas[Math.floor(Math.random() * conquistas.length)]
    const motivacaoTexto = motivacao[Math.floor(Math.random() * motivacao.length)]

    return `${conquistaTexto} ${reading} (${version})!\n\n${completed}/${total} capítulos - ${percentage}% completo! 🎉\n\n${motivacaoTexto}\n\n#365Palavras #LeituraBíblica #FéEmAção`
  }

  // Compartilhar no WhatsApp
  const shareToWhatsApp = () => {
    const text = generateShareText()
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  // Copiar texto
  const copyToClipboard = () => {
    const text = generateShareText()
    navigator.clipboard.writeText(text).then(() => {
      alert('Texto copiado! Cole onde quiser! 📋')
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-bounce-in">
        
        {/* Header com confetes */}
        <div className="relative bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 p-6 text-white overflow-hidden">
          {/* Botão fechar */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Confetes animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 text-2xl animate-bounce">🎉</div>
            <div className="absolute top-3 right-12 text-xl animate-pulse">✨</div>
            <div className="absolute bottom-3 left-8 text-lg animate-bounce">🌟</div>
            <div className="absolute bottom-2 right-8 text-2xl animate-pulse">🎊</div>
            <div className="absolute top-8 left-1/2 text-sm animate-bounce">⭐</div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Crown className="text-yellow-200" size={32} />
            </div>
            <h2 className="text-2xl font-black mb-2">PARABÉNS!</h2>
            <p className="text-yellow-100 font-bold">Conquista Desbloqueada! 🏆</p>
          </div>
        </div>

        {/* Conteúdo da conquista */}
        <div className="p-6">
          {/* Card da conquista */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 mb-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="text-white" size={36} />
              </div>
              
              <h3 className="text-xl font-black text-gray-800 mb-2">
                {reading} Completo!
              </h3>
              
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-4 mb-4">
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-black text-emerald-600">{completed}</div>
                    <div className="text-xs text-emerald-700">Capítulos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-teal-600">{percentage}%</div>
                    <div className="text-xs text-teal-700">Completo</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-blue-600">{version}</div>
                    <div className="text-xs text-blue-700">Versão</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-amber-600">
                <Sparkles size={16} />
                <span className="text-sm font-bold">Recompensa Desbloqueada!</span>
                <Sparkles size={16} />
              </div>
            </div>
          </div>

          {/* Versículo motivacional */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6 text-center">
            <p className="text-purple-700 font-semibold text-sm italic mb-2">
              "Lâmpada para os meus pés é tua palavra e luz para o meu caminho."
            </p>
            <p className="text-purple-600 text-xs font-bold">— Salmos 119:105 💜</p>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3">
            <button
              onClick={shareToWhatsApp}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
            >
              <MessageCircle size={24} />
              Compartilhar no WhatsApp
            </button>
            
            <button
              onClick={copyToClipboard}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
            >
              <Share2 size={20} />
              Copiar Texto
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
            >
              Continuar Lendo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareAchievementModal