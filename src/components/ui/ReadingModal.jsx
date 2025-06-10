import React, { useState, useEffect } from 'react'
import { X, BookOpen, Loader, AlertCircle, Check, Clock, Hash, BadgeCheck } from 'lucide-react'
import { loadReadingText, availableVersions } from '../../data/bibleMapping'

const ReadingModal = ({ reading, isOpen, onClose, onMarkAsRead }) => {
  const [bibleText, setBibleText] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState('ACF') // Padrão ACF

  // Esconder scroll do body quando modal abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Esconder barra de navegação
      const bottomNav = document.querySelector('[class*="bottom"]')
      if (bottomNav) {
        bottomNav.style.display = 'none'
      }
    } else {
      document.body.style.overflow = 'unset'
      // Mostrar barra de navegação
      const bottomNav = document.querySelector('[class*="bottom"]')
      if (bottomNav) {
        bottomNav.style.display = 'block'
      }
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'
      const bottomNav = document.querySelector('[class*="bottom"]')
      if (bottomNav) {
        bottomNav.style.display = 'block'
      }
    }
  }, [isOpen])

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6" style={{zIndex: 999999}}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full h-[80vh] max-h-[600px] overflow-hidden flex flex-col">
        
        {/* Header Otimizado */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
          <div className="flex items-center justify-between">
            {/* Logo maior e mais destaque */}
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="text-white" size={28} />
            </div>
            
            {/* Seletor no centro com mais destaque - SÓ ACF e NVI */}
            <div className="flex-1 flex justify-center">
              <select 
                value={version}
                onChange={(e) => handleVersionChange(e.target.value)}
                className="px-6 py-3 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/40 text-white text-base font-bold focus:outline-none focus:ring-2 focus:ring-white/60 appearance-none cursor-pointer shadow-lg hover:bg-white/30 transition-all"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat", backgroundSize: "20px" }}
              >
                <option value="ACF" className="text-gray-800">📖 ACF</option>
                <option value="ARA" className="text-gray-800">📖 ARA</option>
                <option value="NVI" className="text-gray-800">📖 NVI</option>
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

        {/* Conteúdo - SCROLL RESTAURADO */}
        <div className="flex-1 overflow-y-auto min-h-0">
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
            <div>
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
                            {chapter.isPartial && chapter.verseRange && (
                              <span className="text-emerald-200 text-sm ml-2">
                                (versículos {chapter.verseRange[0]}-{chapter.verseRange[1]})
                              </span>
                            )}
                          </h3>
                          <p className="text-emerald-100 text-sm">
                            {chapter.totalVerses} versículos
                            {chapter.isPartial ? ' (parcial)' : ''}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Versículos */}
                    <div className="p-6 space-y-4">
                      {chapter.verses.map((verse, verseIndex) => {
                        // Calcular número do versículo correto para ranges parciais
                        const verseNumber = chapter.isPartial && chapter.verseRange 
                          ? chapter.verseRange[0] + verseIndex 
                          : verseIndex + 1
                          
                        return (
                          <div key={verseIndex} className="flex gap-4 group">
                            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-emerald-200 transition-colors">
                              {verseNumber}
                            </div>
                            <p className="text-gray-700 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors">
                              {verse}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* Botões ÉPICOS após o texto - REORGANIZADO */}
                <div className="relative mt-8 mb-24">
                  {/* Separador decorativo */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <div className="mx-4 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                      <BookOpen size={16} className="text-white" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>

                  {/* Card dos botões ÉPICO - COMPACTO */}
                  <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-6 border-2 border-emerald-100 shadow-xl backdrop-blur-sm">
                    
                    {/* Header do card - COMPACTO */}
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg animate-pulse-slow">
                        <BookOpen className="text-white" size={20} />
                      </div>
                      <h3 className="text-lg font-black text-gray-800 mb-1">Leitura Completa!</h3>
                      <p className="text-gray-600 text-xs">
                        ✨ {stats.chapters} capítulo(s) • {stats.verses} versículos • Versão {version} 🎉
                      </p>
                    </div>

                    {/* Estatísticas visuais - COMPACTAS */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-3 bg-white/70 rounded-xl shadow-md">
                        <div className="text-xl font-black text-emerald-600">{stats.verses}</div>
                        <p className="text-xs text-gray-600 font-medium">Versículos</p>
                      </div>
                      <div className="text-center p-3 bg-white/70 rounded-xl shadow-md">
                        <div className="text-xl font-black text-teal-600">{stats.chapters}</div>
                        <p className="text-xs text-gray-600 font-medium">Capítulos</p>
                      </div>
                      <div className="text-center p-3 bg-white/70 rounded-xl shadow-md">
                        <div className="text-xl font-black text-cyan-600">100%</div>
                        <p className="text-xs text-gray-600 font-medium">Completa</p>
                      </div>
                    </div>

                    {/* Mensagem motivacional PRIMEIRO */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 rounded-2xl border-2 border-purple-200 text-center shadow-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="text-lg animate-pulse">📖</div>
                        <h4 className="text-base font-black text-purple-800">Palavra de Hoje</h4>
                        <div className="text-lg animate-pulse">✨</div>
                      </div>
                      <p className="text-sm font-semibold text-purple-700 leading-relaxed mb-2 italic">
                        "Lâmpada para os meus pés é tua palavra e luz para o meu caminho."
                      </p>
                      <p className="text-xs font-bold text-purple-600">
                        — Salmos 119:105 💜
                      </p>
                      <div className="mt-2 flex justify-center gap-1">
                        <span className="text-sm animate-bounce" style={{animationDelay: '0.1s'}}>🙏</span>
                        <span className="text-sm animate-bounce" style={{animationDelay: '0.3s'}}>⭐</span>
                        <span className="text-sm animate-bounce" style={{animationDelay: '0.5s'}}>🌟</span>
                      </div>
                    </div>
                    
                    {/* Botões ÉPICOS - SÓ ÍCONES! 🔥 */}
                    <div className="flex justify-center gap-6 mb-6">
                      {/* Botão FECHAR - Só X com gradiente vermelho e rotação */}
                      <button 
                        onClick={onClose}
                        className="group relative overflow-hidden w-16 h-16 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-2xl transition-all duration-500 hover:scale-110 hover:rotate-12 shadow-2xl hover:shadow-red-500/50"
                      >
                        {/* Efeito de brilho no hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <div className="relative flex items-center justify-center w-full h-full">
                          <X size={28} className="text-white font-bold group-hover:rotate-90 transition-transform duration-500" />
                        </div>
                      </button>
                      
                      {/* Botão COMPLETEI - Só badge-check épico */}
                      <button 
                        onClick={handleMarkAsRead}
                        className="group relative overflow-hidden w-16 h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/50 hover:-rotate-6"
                      >
                        {/* Efeito de brilho animado SUPER */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Partículas flutuantes */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-1 left-2 text-white/60 animate-bounce text-xs" style={{animationDelay: '0.1s'}}>✨</div>
                          <div className="absolute top-2 right-1 text-white/60 animate-bounce text-xs" style={{animationDelay: '0.3s'}}>⭐</div>
                          <div className="absolute bottom-1 left-3 text-white/60 animate-bounce text-xs" style={{animationDelay: '0.5s'}}>🎉</div>
                        </div>
                        
                        {/* Só o ícone badge-check */}
                        <div className="relative flex items-center justify-center w-full h-full">
                          <BadgeCheck size={28} className="text-white group-hover:scale-125 transition-transform duration-300" />
                        </div>
                      </button>
                    </div>

                    {/* Indicador visual de "FIM" com padding extra */}
                    <div className="text-center pb-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-500 text-sm">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="font-medium">Fim da leitura</span>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReadingModal