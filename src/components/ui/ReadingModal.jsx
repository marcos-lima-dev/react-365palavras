import React, { useState, useEffect } from 'react'
import { X, BookOpen, Loader, AlertCircle, Check, Star, Heart, CircleX, CircleCheck } from 'lucide-react'
import { loadReadingText } from '../../data/bibleMapping'

const ReadingModal = ({ reading, isOpen, onClose, onMarkAsRead }) => {
  const [bibleText, setBibleText] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState('ACF')

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
      const textData = await loadReadingText(reading, version)
      setBibleText(textData)
      console.log(`✅ Sucesso: ${reading} carregado`)
    } catch (err) {
      setError(err.message)
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center p-4 pb-40">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[75vh] overflow-hidden flex flex-col">
        
        {/* Header fixo */}
        <div className={`flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0 ${
          bibleText?.type === 'special' 
            ? 'bg-gradient-to-r from-purple-50 to-pink-50' 
            : 'bg-gradient-to-r from-emerald-50 to-teal-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              bibleText?.type === 'special'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
            }`}>
              {bibleText?.type === 'special' ? (
                <Heart className="text-white" size={20} />
              ) : (
                <BookOpen className="text-white" size={20} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{reading}</h3>
              <p className="text-sm text-gray-600">
                {bibleText?.type === 'special' ? 'Leitura Especial' : 'Leitura Bíblica'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Seletor de versão */}
            <select 
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ACF">ACF</option>
              <option value="ARA">ARA</option>
              <option value="NVI">NVI</option>
            </select>
            
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Conteúdo com rolagem independente */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Loader className="animate-spin mb-4" size={32} />
                <p className="text-lg font-medium">Carregando texto bíblico...</p>
                <p className="text-sm">Aguarde um momento</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-12 text-red-500">
                <AlertCircle className="mb-4" size={32} />
                <p className="text-lg font-medium">Erro ao carregar</p>
                <p className="text-sm text-center mb-4">{error}</p>
                <button 
                  onClick={loadBibleData}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {bibleText && (
              <>
                <div className="prose prose-lg max-w-none">
                  {/* Título */}
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {bibleText.displayName}
                    </h2>
                    <p className="text-gray-600">
                      {bibleText.version} - {
                        bibleText.type === 'special' ? 'Leitura Temática' : 
                        bibleText.type === 'multiple' ? 'Múltiplos Livros' : 
                        bibleText.bookName
                      }
                    </p>
                    {bibleText.type === 'multiple' && (
                      <p className="text-sm text-emerald-600 font-medium">
                        {bibleText.bookCount} livro(s) • {bibleText.chapters?.length || 0} capítulo(s)
                      </p>
                    )}
                  </div>

                  {/* Leitura Especial (múltiplas referências) */}
                  {bibleText.type === 'special' && bibleText.references && (
                    <div className="space-y-6">
                      {bibleText.references.map((ref, refIndex) => (
                        <div key={refIndex} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                          {/* Cabeçalho da referência */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <Star className="text-white" size={16} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">
                                {ref.displayName}
                              </h3>
                              <p className="text-sm text-gray-600">{ref.bookName}</p>
                            </div>
                          </div>

                          {/* Versículos */}
                          <div className="space-y-3">
                            {ref.verses.map((verse, verseIndex) => (
                              <div key={verseIndex} className="flex gap-3">
                                <span className="text-purple-600 font-bold text-sm min-w-[24px] mt-1">
                                  {ref.startVerse ? ref.startVerse + verseIndex : verseIndex + 1}
                                </span>
                                <p className="text-gray-700 leading-relaxed flex-1 italic">
                                  "{verse}"
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Leitura Normal ou Múltipla (capítulos sequenciais) */}
                  {(bibleText.type === 'normal' || bibleText.type === 'multiple') && bibleText.chapters && (
                    <div className="space-y-8">
                      {bibleText.chapters.map((chapter, chapterIndex) => (
                        <div key={chapterIndex} className="mb-8">
                          {/* Cabeçalho do capítulo com sticky */}
                          <div className="flex items-center gap-3 mb-6 sticky top-0 bg-white/90 backdrop-blur-sm py-2 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                              {chapter.chapterNumber}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {/* Se é leitura múltipla, mostrar nome do livro */}
                                {bibleText.type === 'multiple' && chapter.bookName ? (
                                  <>
                                    {chapter.bookName} - Capítulo {chapter.chapterNumber}
                                    {/* REMOVIDO: (livro completo) */}
                                  </>
                                ) : (
                                  <>
                                    {bibleText.bookName} - Capítulo {chapter.chapterNumber}
                                  </>
                                )}
                              </h3>
                              {chapter.isPartial && chapter.verseRange && (
                                <p className="text-purple-600 font-medium text-sm">
                                  Versículos {chapter.verseRange[0]}-{chapter.verseRange[1]}
                                </p>
                              )}
                              <p className="text-gray-500 text-sm">{chapter.verses.length} versículos</p>
                            </div>
                          </div>

                          {/* Versículos */}
                          <div className="space-y-3 pl-2">
                            {chapter.verses.map((verse, verseIndex) => (
                              <div key={verseIndex} className="flex gap-4 group">
                                <span className="text-emerald-600 font-bold text-sm min-w-[32px] mt-1 bg-emerald-50 rounded-lg px-2 py-1 flex-shrink-0">
                                  {chapter.isPartial && chapter.verseRange ? 
                                    chapter.verseRange[0] + verseIndex : 
                                    verseIndex + 1
                                  }
                                </span>
                                <p className="text-gray-700 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors">
                                  {verse}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Separador entre capítulos (se não for o último) */}
                          {chapterIndex < bibleText.chapters.length - 1 && (
                            <div className="flex items-center gap-4 my-8">
                              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                              <div className="text-gray-400 text-sm font-medium">• • •</div>
                              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botões Circulares Minimalistas com Tooltips - APÓS TODO O TEXTO */}
                <div className="mt-8 mb-6">
                  <div className="flex justify-center gap-6">
                    {/* Botão FECHAR - Círculo Vermelho com Tooltip */}
                    <div className="relative group">
                      <button 
                        onClick={onClose}
                        className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center hover:from-red-500 hover:to-red-700"
                      >
                        <CircleX size={28} className="text-white group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      
                      {/* Tooltip Fechar */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        Fechar
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                    
                    {/* Botão MARCAR COMO LIDO - Círculo Verde com Tooltip */}
                    <div className="relative group">
                      <button 
                        onClick={handleMarkAsRead}
                        className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center hover:from-emerald-500 hover:to-emerald-700"
                      >
                        <CircleCheck size={28} className="text-white group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      
                      {/* Tooltip Lido */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        Lido
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReadingModal