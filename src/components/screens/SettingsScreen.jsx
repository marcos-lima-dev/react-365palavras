import React from 'react'
import { Settings, Bell, RotateCcw, Info, BookOpen } from 'lucide-react'

const SettingsScreen = ({ settings, onUpdateSettings, onResetProgress }) => {
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

      {/* Sobre o App */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Info className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Sobre</h3>
            <p className="text-gray-600 text-sm">365Palavras v1.0</p>
          </div>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <BookOpen className="text-white" size={32} />
          </div>
          <h4 className="font-black text-2xl text-gray-800 mb-3">365Palavras</h4>
          <p className="text-gray-600 leading-relaxed mb-4">
            Que as palavras deste app te guiem mais perto do Senhor. 
            Abrace cada dia com um coração aberto, pronto para receber 
            as bênçãos que te aguardam.
          </p>
          <div className="text-sm text-gray-500">
            <p>Versão 1.0.0</p>
            <p>Desenvolvido por Marcos de Sousa Lima</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsScreen