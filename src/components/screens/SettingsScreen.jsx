import React, { useState } from 'react'
import { Settings, Bell, RotateCcw, Info, BookOpen, Sparkles, X } from 'lucide-react'

const SettingsScreen = ({ settings, onUpdateSettings, onResetProgress }) => {
  const [showChangelog, setShowChangelog] = useState(false)

  const handleToggleNotifications = () => {
    onUpdateSettings({
      ...settings,
      notifications: !settings.notifications
    })
  }

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
      onResetProgress()
    }
  }

  const changelog = [
    {
      version: "2.0.0",
      title: "🚀 Leitura Integrada",
      date: "Janeiro 2025",
      isNew: true,
      changes: [
        "📖 Sistema de leitura bíblica integrado",
        "📚 Suporte a 3 traduções (ARA, ACF, NVI)",
        "🌐 CDN global para performance máxima",
        "🎨 Interface épica com glassmorphism",
        "⚡ Modal moderno com animações",
        "💎 Botões e efeitos de outro nível",
        "🔄 Cache inteligente + fallbacks",
        "🚀 Build 90% mais leve"
      ]
    },
    {
      version: "1.0.0", 
      title: "🌱 Primeira Versão",
      date: "2024",
      changes: [
        "📅 Plano de leitura 365 dias",
        "📊 Sistema de progresso",
        "📱 PWA completo",
        "🏆 Sistema de conquistas",
        "✨ Versículos motivacionais"
      ]
    }
  ]

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pt-6">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
          <Settings className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-800">Configurações</h2>
          <p className="text-gray-600">Personalize sua experiência</p>
        </div>
      </div>

      {/* Notificações */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Notificações Diárias</h3>
              <p className="text-gray-600 text-sm">Receba lembretes para ler</p>
            </div>
          </div>
          <button 
            onClick={handleToggleNotifications}
            className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
              settings.notifications ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all duration-300 shadow-lg ${
              settings.notifications ? 'left-7' : 'left-1'
            }`}></div>
          </button>
        </div>
      </div>

      {/* Novidades - NOVO! */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 shadow-2xl mb-6 relative overflow-hidden">
        {/* Efeitos de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Novidades v2.0</h3>
              <p className="text-white/80 text-sm">Veja o que há de novo!</p>
            </div>
          </div>
          <button 
            onClick={() => setShowChangelog(true)}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
          >
            Ver tudo
          </button>
        </div>
      </div>

      {/* Reset Progresso */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <RotateCcw className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Resetar Progresso</h3>
              <p className="text-gray-600 text-sm">Apagar todas as leituras</p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Sobre o App - ATUALIZADO */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Info className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Sobre</h3>
            <p className="text-gray-600 text-sm">365Palavras v2.0</p>
          </div>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl relative">
            <BookOpen className="text-white" size={32} />
            {/* Badge NEW */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2.0</span>
            </div>
          </div>
          <h4 className="font-black text-2xl text-gray-800 mb-3">365Palavras</h4>
          <p className="text-gray-600 leading-relaxed mb-4">
            Que as palavras deste app te guiem mais perto do Senhor. 
            Abrace cada dia com um coração aberto, pronto para receber 
            as bênçãos que te aguardam.
          </p>
          <div className="text-sm text-gray-500">
            <p className="font-semibold">Versão 2.0.0 - "Leitura Integrada"</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <img src="/logo-geracao-radical.png" alt="Geração + Radical" className="w-4 h-4" />
              <span>Marcos Lima - Voluntário Geração + Radical</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Changelog */}
      {showChangelog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            
            {/* Header do modal */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">📋 Novidades</h2>
                  <p className="text-white/80">Histórico de atualizações</p>
                </div>
                <button 
                  onClick={() => setShowChangelog(false)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Conteúdo do changelog */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {changelog.map((version, index) => (
                  <div key={index} className={`relative ${index === 0 ? 'pb-6 border-b border-gray-200' : ''}`}>
                    {/* Badge NEW para versão atual */}
                    {version.isNew && (
                      <div className="absolute -top-2 -left-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        NEW!
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{version.version}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{version.title}</h3>
                        <p className="text-gray-500 text-sm">{version.date}</p>
                      </div>
                    </div>

                    <div className="ml-11 space-y-2">
                      {version.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{change}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer do modal */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2">
                <img src="/logo-geracao-radical.png" alt="Geração + Radical" className="w-5 h-5" />
                <p className="text-gray-500 text-sm">
                  Marcos Lima - Voluntário Geração + Radical
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SettingsScreen