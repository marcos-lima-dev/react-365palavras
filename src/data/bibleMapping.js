/**
 * Mapeamento entre nomes das leituras e arquivos JSON da Bíblia
 * Usando ACF (Almeida Corrigida Fiel) do repositório marcos-lima-dev/365palavras-bible
 */

// Base URL do seu repositório via jsDelivr
const BIBLE_BASE_URL = 'https://cdn.jsdelivr.net/gh/marcos-lima-dev/365palavras-bible@main'
const DEFAULT_VERSION = 'ACF' // Usando ACF como padrão

export const bookMapping = {
  // Pentateuco
  'Gênesis': 'genesis',
  'Êxodo': 'exodo', 
  'Levítico': 'levitico',
  'Números': 'numeros',
  'Deuteronômio': 'deuteronomio',
  
  // Históricos
  'Josué': 'josue',
  'Juízes': 'juizes',
  'Rute': 'rute',
  '1 Samuel': '1 samuel',
  '2 Samuel': '2 samuel',
  '1 Reis': '1 reis',
  '2 Reis': '2 reis',
  '1 Crônicas': '1 cronicas',
  '2 Crônicas': '2 cronicas',
  'Esdras': 'esdras',
  'Neemias': 'neemias',
  'Ester': 'ester',
  
  // Poéticos
  'Jó': 'jo',
  'Salmos': 'salmos',
  'Provérbios': 'proverbios',
  'Eclesiastes': 'eclesiastes',
  'Cantares': 'cantares',
  
  // Profetas Maiores
  'Isaías': 'isaias',
  'Jeremias': 'jeremias',
  'Lamentações': 'lamentacoes',
  'Ezequiel': 'ezequiel',
  'Daniel': 'daniel',
  
  // Profetas Menores
  'Oséias': 'oseias',
  'Joel': 'joel',
  'Amós': 'amos',
  'Obadias': 'obadias',
  'Jonas': 'jonas',
  'Miquéias': 'miqueias',
  'Naum': 'naum',
  'Habacuque': 'habacuque',
  'Sofonias': 'sofonias',
  'Ageu': 'ageu',
  'Zacarias': 'zacarias',
  'Malaquias': 'malaquias',
  
  // Novo Testamento
  'Mateus': 'mateus',
  'Marcos': 'marcos',
  'Lucas': 'lucas',
  'João': 'joao',
  'Atos': 'atos',
  'Romanos': 'romanos',
  '1 Coríntios': '1 corintios',
  '2 Coríntios': '2 corintios',
  'Gálatas': 'galatas',
  'Efésios': 'efesios',
  'Filipenses': 'filipenses',
  'Colossenses': 'colossenses',
  '1 Tessalonicenses': '1 tessalonicenses',
  '2 Tessalonicenses': '2 tessalonicenses',
  '1 Timóteo': '1 timoteo',
  '2 Timóteo': '2 timoteo',
  'Tito': 'tito',
  'Filemom': 'filemom',
  'Hebreus': 'hebreus',
  'Tiago': 'tiago',
  '1 Pedro': '1 pedro',
  '2 Pedro': '2 pedro',
  '1 João': '1 joao',
  '2 João': '2 joao',
  '3 João': '3 joao',
  'Judas': 'judas',
  'Apocalipse': 'apocalipse'
}

/**
 * Função para extrair livro e capítulos de uma leitura
 * Ex: "Gênesis 1-3" → { book: "genesis", chapters: [1, 2, 3] }
 */
export function parseReading(reading) {
  // Regex para capturar: "Livro X-Y" ou "Livro X"
  const match = reading.match(/^(.+?)\s+(\d+)(?:-(\d+))?$/)
  
  if (!match) {
    console.warn(`Não foi possível parsear a leitura: ${reading}`)
    return null
  }
  
  const bookName = match[1].trim()
  const startChapter = parseInt(match[2])
  const endChapter = match[3] ? parseInt(match[3]) : startChapter
  
  const bookFile = bookMapping[bookName]
  if (!bookFile) {
    console.warn(`Livro não encontrado no mapeamento: ${bookName}`)
    return null
  }
  
  // Gerar array de capítulos
  const chapters = []
  for (let i = startChapter; i <= endChapter; i++) {
    chapters.push(i)
  }
  
  return {
    bookName,
    bookFile,
    chapters,
    displayName: reading
  }
}

/**
 * Cache para evitar múltiplas requisições do mesmo livro
 */
const bibleCache = new Map()

/**
 * Função para carregar um livro da Bíblia do seu repositório
 */
export async function loadBibleBook(bookFile, version = DEFAULT_VERSION) {
  const cacheKey = `${version}-${bookFile}`
  
  // Verificar cache primeiro
  if (bibleCache.has(cacheKey)) {
    console.log(`📚 Cache hit para ${bookFile} (${version})`)
    return bibleCache.get(cacheKey)
  }
  
  // Construir URL do seu repositório
  const url = `${BIBLE_BASE_URL}/${version}/${bookFile}.json`
  
  try {
    console.log(`🔄 Carregando ${bookFile} (${version}) de: ${url}`)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`)
    }
    
    const rawData = await response.json()
    console.log(`📊 Dados brutos recebidos:`, typeof rawData, Array.isArray(rawData))
    
    // Detectar e adaptar estrutura dos dados
    let bookData = null
    
    // Estrutura 1: Array com objeto dentro
    if (Array.isArray(rawData) && rawData.length > 0 && rawData[0].chapters) {
      console.log('📖 Estrutura detectada: Array com chapters')
      bookData = rawData[0]
    }
    // Estrutura 2: Objeto direto com chapters
    else if (rawData.chapters) {
      console.log('📖 Estrutura detectada: Objeto com chapters')
      bookData = rawData
    }
    // Estrutura 3: Capítulos diretos (chaves numéricas)
    else if (rawData['1']) {
      console.log('📖 Estrutura detectada: Capítulos diretos')
      // Converter para formato esperado
      const chapters = []
      const chapterKeys = Object.keys(rawData).filter(key => !isNaN(key)).sort((a, b) => parseInt(a) - parseInt(b))
      
      for (const chapterKey of chapterKeys) {
        const chapterObj = {}
        chapterObj[chapterKey] = rawData[chapterKey]
        chapters.push(chapterObj)
      }
      
      bookData = { chapters }
    }
    else {
      console.error('❌ Estrutura não reconhecida:', Object.keys(rawData))
      throw new Error(`Estrutura de dados não reconhecida para ${bookFile}`)
    }
    
    // Validar estrutura final
    if (!bookData || !bookData.chapters || !Array.isArray(bookData.chapters)) {
      console.error('❌ Estrutura final inválida:', bookData)
      throw new Error(`Estrutura de dados inválida para ${bookFile}`)
    }
    
    console.log(`✅ ${bookFile} carregado: ${bookData.chapters.length} capítulos`)
    
    // Salvar no cache
    bibleCache.set(cacheKey, bookData)
    
    return bookData
  } catch (error) {
    console.error(`❌ Erro ao carregar livro ${bookFile} (${version}):`, error)
    throw new Error(`Falha ao carregar ${bookFile}: ${error.message}`)
  }
}

/**
 * Função principal para carregar texto de uma leitura
 * Adaptada para a estrutura do seu repositório
 */
export async function loadReadingText(reading, version = DEFAULT_VERSION) {
  const parsed = parseReading(reading)
  
  if (!parsed) {
    throw new Error(`Não foi possível parsear a leitura: ${reading}`)
  }
  
  try {
    // Carregar o livro do seu repositório
    const bookData = await loadBibleBook(parsed.bookFile, version)
    
    // Extrair os capítulos necessários
    const chaptersText = parsed.chapters.map(chapterNumber => {
      const chapterIndex = chapterNumber - 1 // Array é 0-based
      const chapterData = bookData.chapters[chapterIndex]
      
      if (!chapterData) {
        console.warn(`Capítulo ${chapterNumber} não encontrado em ${parsed.bookName}`)
        return null
      }
      
      // Tentar diferentes formatos de chave para o capítulo
      const chapterKey = chapterNumber.toString()
      const chapterKeyNum = chapterNumber
      
      let verses = null
      
      // Tentativa 1: chave como string "25"
      if (chapterData[chapterKey]) {
        verses = chapterData[chapterKey]
        console.log(`📖 Encontrou capítulo ${chapterNumber} com chave string`)
      }
      // Tentativa 2: chave como número 25
      else if (chapterData[chapterKeyNum]) {
        verses = chapterData[chapterKeyNum]
        console.log(`📖 Encontrou capítulo ${chapterNumber} com chave numérica`)
      }
      // Tentativa 3: primeira chave disponível (fallback)
      else {
        const availableKeys = Object.keys(chapterData)
        console.log(`⚠️ Chaves disponíveis no capítulo ${chapterIndex}:`, availableKeys)
        
        if (availableKeys.length > 0) {
          const firstKey = availableKeys[0]
          verses = chapterData[firstKey]
          console.log(`🔄 Usando primeira chave disponível: ${firstKey}`)
        }
      }
      
      if (!verses) {
        console.warn(`Versículos não encontrados para capítulo ${chapterNumber} em ${parsed.bookName}`)
        console.log(`🔍 Estrutura do capítulo ${chapterIndex}:`, chapterData)
        return null
      }
      
      // NOVA CORREÇÃO: Se verses ainda é um objeto com uma chave numérica, pegar o conteúdo
      if (typeof verses === 'object' && !Array.isArray(verses)) {
        const verseKeys = Object.keys(verses)
        console.log(`🔍 Chaves dentro dos versículos:`, verseKeys)
        
        // Se tem uma chave que é igual ao número do capítulo, é estrutura aninhada
        if (verses[chapterKey]) {
          console.log(`🎯 Estrutura aninhada detectada! Acessando verses["${chapterKey}"]`)
          verses = verses[chapterKey]
        }
      }
      
      // Debug: verificar tipo dos versículos FINAL
      console.log(`🔍 Tipo FINAL dos versículos para cap ${chapterNumber}:`, typeof verses, Object.keys(verses || {}).slice(0, 5))
      
      // Converter versículos para array de strings
      let versesArray = []
      
      if (Array.isArray(verses)) {
        // Se já é array, usar direto
        versesArray = verses
        console.log(`📋 Versículos já em array: ${versesArray.length} items`)
      } else if (typeof verses === 'object' && verses !== null) {
        // CORREÇÃO: verses é o objeto completo com versículos numerados
        // Ex: { "1": "texto1", "2": "texto2", "3": "texto3" }
        const verseKeys = Object.keys(verses).filter(key => !isNaN(key)).sort((a, b) => parseInt(a) - parseInt(b))
        versesArray = verseKeys.map(key => verses[key])
        console.log(`🔢 Convertido de objeto: ${verseKeys.length} versículos (chaves: ${verseKeys.slice(0, 5).join(', ')}...)`)
        
        // Debug seguro sem substring
        if (versesArray.length > 0) {
          console.log(`📖 Primeiro versículo:`, typeof versesArray[0], versesArray[0])
        }
      } else {
        console.error(`❌ Formato de versículos não reconhecido:`, typeof verses, verses)
        return null
      }
      
      // Garantir que todos os itens são strings (não deveria ser necessário agora)
      versesArray = versesArray.map((verse, index) => {
        if (typeof verse === 'string') {
          return verse
        } else {
          console.warn(`⚠️ Versículo ${index + 1} não é string:`, typeof verse, verse)
          return String(verse)
        }
      })
      
      console.log(`✅ Capítulo ${chapterNumber}: ${versesArray.length} versículos processados`)
      console.log(`🔍 Tipos dos versículos:`, versesArray.map(v => typeof v).slice(0, 3))
      
      return {
        chapterNumber,
        verses: versesArray,
        totalVerses: versesArray.length
      }
    }).filter(Boolean) // Remove capítulos nulos
    
    return {
      bookName: parsed.bookName,
      displayName: parsed.displayName,
      chapters: chaptersText,
      version: version,
      source: 'marcos-lima-dev/365palavras-bible'
    }
  } catch (error) {
    console.error(`❌ Erro ao carregar texto da leitura ${reading}:`, error)
    throw error
  }
}

/**
 * Função para limpar cache (útil para desenvolvimento)
 */
export function clearBibleCache() {
  bibleCache.clear()
  console.log('🗑️ Cache da Bíblia limpo')
}

/**
 * Função para ver status do cache
 */
export function getCacheStatus() {
  const cacheEntries = Array.from(bibleCache.keys())
  return {
    size: bibleCache.size,
    entries: cacheEntries,
    sizeMB: (JSON.stringify(Array.from(bibleCache.values())).length / 1024 / 1024).toFixed(2)
  }
}

/**
 * Versões disponíveis no seu repositório
 */
export const availableVersions = {
  'ACF': 'Almeida Corrigida Fiel',
  'NVI': 'Nova Versão Internacional'
  // ARA removida conforme solicitado
}

/**
 * Lista apenas as versões que funcionam (sem ARA)
 */
export const workingVersions = ['ACF', 'NVI']

/**
 * Função para trocar versão padrão
 */
export function setDefaultVersion(version) {
  if (!availableVersions[version]) {
    throw new Error(`Versão ${version} não disponível. Versões: ${Object.keys(availableVersions).join(', ')}`)
  }
  DEFAULT_VERSION = version
  console.log(`📖 Versão padrão alterada para: ${version}`)
}