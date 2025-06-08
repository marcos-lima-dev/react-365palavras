import React, { useState, useEffect } from 'react'
import { X, BookOpen, Loader, AlertCircle, Check, Clock, Hash } from 'lucide-react'
import { loadReadingText, availableVersions } from '../../data/bibleMapping'

const ReadingModal = ({ reading, isOpen, onClose, onMarkAsRead }) => {
  const [bibleText, setBibleText] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState('ACF') // Padrão ACF (sem ARA)

  // Carregar texto quando modal abrir
  useEffect(() => {
    if (isOpen && reading) {
      loadBibleData()
    }
  }, [isOpen, reading, version])

  const loadBibleData = async () => {
    setLoading(true)
    setError(null)
    setBibleText(null)
    
    try {
      console.log(`📖 Carregando: ${reading} (${version})`)
      const textData = await loadReadingText(reading, version)
      setBibleText(textData)
      console.log(`✅ Sucesso: ${textData.chapters.length} capítulos carregados`)
    } catch (err) {
      setError(`Erro ao carregar ${reading}: ${err.message}`)
      console.error('❌ Erro ao carregar texto bíblico:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = () => {
    if (onMarkAsRead) {
      onMarkAsRead()
    }
    onClose()
  }

  const handleVersionChange = (newVersion) => {
    console.log(`🔄 Trocando versão: ${version} → ${newVersion}`)
    setVersion(newVersion)
  }

  // Calcular estatísticas
  const getStats = () => {
    if (!bibleText) return { chapters: 0, verses: 0, readTime: 0 }
    
    const totalVerses = bibleText.chapters.reduce((sum, chapter) => sum + chapter.totalVerses, 0)
    const readTime = Math.ceil(totalVerses * 0.25) // ~15 segundos por versículo
    
    return {
      chapters: bibleText.chapters.length,
      verses: totalVerses,
      readTime
    }
  }

  const stats = getStats()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header Otimizado */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
          <div className="flex items-center justify-between">
            {/* Logo maior e mais destaque */}
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="text-white" size={28} />
            </div>
            
            {/* Seletor no centro com mais destaque */}
            <div className="flex-1 flex justify-center">
              <select 
                value={version}
                onChange={(e) => handleVersionChange(e.target.value)}
                className="px-6 py-3 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/40 text-white text-base font-bold focus:outline-none focus:ring-2 focus:ring-white/60 appearance-none cursor-pointer shadow-lg hover:bg-white/30 transition-all"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat", backgroundSize: "20px" }}
              >
                {Object.entries(availableVersions).map(([key, name]) => (
                  <option key={key} value={key} className="text-gray-800">
                    📖 {key}
                  </option>
                ))}
              </select>
            </div>
              
            {/* Botão fechar com gradient no hover */}
            <button 
              onClick={onClose}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:scale-110 group"
            >
              <X size={20} className="text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Loader className="animate-spin mb-4" size={40} />
              <p className="text-xl font-medium">Carregando texto bíblico...</p>
              <p className="text-sm">Aguarde um momento</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-16 text-red-500">
              <AlertCircle className="mb-4" size={40} />
              <p className="text-xl font-medium">Erro ao carregar</p>
              <p className="text-sm text-center mb-6 max-w-md">{error}</p>
              <button 
                onClick={loadBibleData}
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {bibleText && (
            <>
              {/* Título Limpo */}
              <div className="p-6 bg-white border-b border-gray-100">
                <h1 className="text-3xl font-black text-gray-800 text-center">
                  {bibleText.displayName}
                </h1>
              </div>

              {/* Capítulos */}
              <div className="p-6 space-y-6">
                {bibleText.chapters.map((chapter, chapterIndex) => (
                  <div key={chapterIndex} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* Header do capítulo */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-bold text-lg">
                          {chapter.chapterNumber}
                        </div>
                        <div className="text-white">
                          <h3 className="text-lg font-bold">
                            Capítulo {chapter.chapterNumber}
                          </h3>
                          <p className="text-emerald-100 text-sm">
                            {chapter.totalVerses} versículos
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Versículos */}
                    <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                      {chapter.verses.map((verse, verseIndex) => (
                        <div key={verseIndex} className="flex gap-4 group">
                          <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-emerald-200 transition-colors">
                            {verseIndex + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors">
                            {verse}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {bibleText && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p className="font-medium">✨ Leitura concluída?</p>
                <p className="text-xs text-gray-500">
                  Marque para acompanhar seu progresso
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  Fechar
                </button>
                <button 
                  onClick={handleMarkAsRead}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                >
                  <Check size={18} />
                  Marcar como Lida
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReadingModal