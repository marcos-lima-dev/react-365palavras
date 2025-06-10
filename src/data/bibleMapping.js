export const bookMapping = {
  'Gênesis': 'genesis',
  'Êxodo': 'exodo', 
  'Levítico': 'levitico',
  'Números': 'numeros',
  'Deuteronômio': 'deuteronomio',
  'Josué': 'josue',
  'Juízes': 'juizes',
  'Rute': 'rute',
  '1 Samuel': '1 samuel',      // ✅ COM ESPAÇO
  '2 Samuel': '2 samuel',      // ✅ COM ESPAÇO
  '1 Reis': '1 reis',          // ✅ COM ESPAÇO
  '2 Reis': '2 reis',          // ✅ COM ESPAÇO
  '1 Crônicas': '1 cronicas',  // ✅ COM ESPAÇO - CORRIGIDO!
  '2 Crônicas': '2 cronicas',  // ✅ COM ESPAÇO - CORRIGIDO!
  'Esdras': 'esdras',
  'Neemias': 'neemias',
  'Ester': 'ester',
  'Jó': 'jo',
  'Salmos': 'salmos',
  'Provérbios': 'proverbios',
  'Eclesiastes': 'eclesiastes',
  'Cantares': 'cantares',
  'Isaías': 'isaias',
  'Jeremias': 'jeremias',
  'Lamentações': 'lamentacoes',
  'Ezequiel': 'ezequiel',
  'Daniel': 'daniel',
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
  'Mateus': 'mateus',
  'Marcos': 'marcos',
  'Lucas': 'lucas',
  'João': 'joao',
  'Atos': 'atos',
  'Romanos': 'romanos',
  '1 Coríntios': '1 corintios',        // ✅ COM ESPAÇO
  '2 Coríntios': '2 corintios',        // ✅ COM ESPAÇO
  'Gálatas': 'galatas',
  'Efésios': 'efesios',
  'Filipenses': 'filipenses',
  'Colossenses': 'colossenses',
  '1 Tessalonicenses': '1 tessalonicenses', // ✅ COM ESPAÇO
  '2 Tessalonicenses': '2 tessalonicenses', // ✅ COM ESPAÇO
  '1 Timóteo': '1 timoteo',            // ✅ COM ESPAÇO
  '2 Timóteo': '2 timoteo',            // ✅ COM ESPAÇO
  'Tito': 'tito',
  'Filemom': 'filemom',
  'Hebreus': 'hebreus',
  'Tiago': 'tiago',
  '1 Pedro': '1 pedro',                // ✅ COM ESPAÇO
  '2 Pedro': '2 pedro',                // ✅ COM ESPAÇO
  '1 João': '1 joao',                  // ✅ COM ESPAÇO
  '2 João': '2 joao',                  // ✅ COM ESPAÇO
  '3 João': '3 joao',                  // ✅ COM ESPAÇO
  'Judas': 'judas',
  'Apocalipse': 'apocalipse'
}

const bibleCache = new Map()

function adaptBookStructure(bookData, bookName) {
  console.log(`🔧 Adaptando estrutura para: ${bookName}`)
  
  if (bookData.chapters && Array.isArray(bookData.chapters)) {
    console.log(`✅ Estrutura padrão: ${bookData.chapters.length} capítulos`)
    return bookData
  }
  
  if (Array.isArray(bookData) && bookData.length > 0 && typeof bookData[0] === 'object') {
    console.log('🔧 Estrutura ACF detectada - convertendo...')
    
    const chapters = bookData.map((chapterObj, index) => {
      const chapterKeys = Object.keys(chapterObj)
      if (chapterKeys.length === 0) return []
      
      const chapterKey = chapterKeys[0]
      const versesObj = chapterObj[chapterKey]
      
      const verseKeys = Object.keys(versesObj).sort((a, b) => parseInt(a) - parseInt(b))
      const versesArray = verseKeys.map(key => versesObj[key])
      
      console.log(`📖 Capítulo ${index + 1}: ${versesArray.length} versículos`)
      return versesArray
    })
    
    console.log(`✅ ACF convertido: ${chapters.length} capítulos`)
    return { chapters }
  }
  
  if (Array.isArray(bookData) && bookData.length > 0 && Array.isArray(bookData[0])) {
    console.log('✅ Array direto de capítulos detectado')
    return { chapters: bookData }
  }
  
  const numericKeys = Object.keys(bookData).filter(key => !isNaN(key)).sort((a, b) => parseInt(a) - parseInt(b))
  if (numericKeys.length > 0) {
    console.log('🔧 Convertendo objeto com chaves numéricas')
    const chapters = numericKeys.map(key => {
      const chapterData = bookData[key]
      
      if (typeof chapterData === 'object' && !Array.isArray(chapterData)) {
        const verseKeys = Object.keys(chapterData).sort((a, b) => parseInt(a) - parseInt(b))
        return verseKeys.map(vKey => chapterData[vKey])
      }
      
      return Array.isArray(chapterData) ? chapterData : [chapterData]
    })
    return { chapters }
  }
  
  console.warn('❌ Estrutura não reconhecida:', bookData)
  throw new Error(`Estrutura de arquivo não reconhecida para ${bookName}`)
}

export async function loadBibleBook(bookFile, version = 'ACF') {
  const cacheKey = `${version}-${bookFile}`
  
  if (bibleCache.has(cacheKey)) {
    console.log(`📋 Usando cache para: ${cacheKey}`)
    return bibleCache.get(cacheKey)
  }
  
  try {
    const rawUrl = `https://raw.githubusercontent.com/marcos-lima-dev/365palavras-bible/main/${version}/${bookFile}.json`
    console.log(`🌐 Carregando: ${rawUrl}`)
    const response = await fetch(rawUrl)
    
    console.log(`📡 Status: ${response.status}`)
    
    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status} para ${bookFile}`)
    }
    
    console.log(`✅ Arquivo carregado: ${bookFile}.json`)
    const rawData = await response.json()
    
    const adaptedData = adaptBookStructure(rawData, bookFile)
    
    bibleCache.set(cacheKey, adaptedData)
    console.log(`💾 Salvo no cache: ${cacheKey}`)
    
    return adaptedData
  } catch (error) {
    console.error(`❌ Erro ao carregar ${bookFile}:`, error)
    throw error
  }
}

export function parseReading(reading) {
  console.log(`🔍 Parseando leitura: ${reading}`)
  
  const verseMatch = reading.match(/^(.+?)\s+(\d+):(\d+)-(\d+)$/)
  
  if (verseMatch) {
    console.log(`📖 Detectado formato de versículos: ${reading}`)
    const bookName = verseMatch[1].trim()
    const chapter = parseInt(verseMatch[2])
    const startVerse = parseInt(verseMatch[3])
    const endVerse = parseInt(verseMatch[4])
    
    const bookFile = bookMapping[bookName]
    if (!bookFile) {
      console.warn(`Livro não encontrado: ${bookName}`)
      return null
    }
    
    return {
      bookName,
      bookFile,
      chapters: [chapter],
      verses: {
        [chapter]: [startVerse, endVerse]
      },
      displayName: reading,
      isVerseRange: true
    }
  }
  
  const chapterMatch = reading.match(/^(.+?)\s+(\d+)(?:-(\d+))?$/)
  
  if (chapterMatch) {
    const bookName = chapterMatch[1].trim()
    const startChapter = parseInt(chapterMatch[2])
    const endChapter = chapterMatch[3] ? parseInt(chapterMatch[3]) : startChapter
    
    const bookFile = bookMapping[bookName]
    if (!bookFile) {
      console.warn(`Livro não encontrado: ${bookName}`)
      return null
    }
    
    const chapters = []
    for (let i = startChapter; i <= endChapter; i++) {
      chapters.push(i)
    }
    
    console.log(`📚 Capítulos solicitados: ${chapters.join(', ')}`)
    
    return {
      bookName,
      bookFile,
      chapters,
      displayName: reading,
      isVerseRange: false
    }
  }
  
  const singleBookMatch = reading.match(/^(.+)$/)
  
  if (singleBookMatch) {
    const bookName = singleBookMatch[1].trim()
    const bookFile = bookMapping[bookName]
    
    if (bookFile) {
      console.log(`📚 Livro único: ${bookName}`)
      return {
        bookName,
        bookFile,
        chapters: [1],
        displayName: reading,
        isVerseRange: false
      }
    }
  }
  
  console.warn(`Não foi possível parsear: ${reading}`)
  return null
}

export async function loadReadingText(reading, version = 'ACF') {
  const parsed = parseReading(reading)
  
  if (!parsed) {
    throw new Error(`Não foi possível parsear a leitura: ${reading}`)
  }
  
  try {
    const bookData = await loadBibleBook(parsed.bookFile, version)
    
    console.log(`📖 Livro carregado: ${bookData.chapters.length} capítulos disponíveis`)
    
    const chaptersText = parsed.chapters.map(chapterNumber => {
      const chapterIndex = chapterNumber - 1
      const allVerses = bookData.chapters[chapterIndex]
      
      if (!allVerses) {
        console.warn(`❌ Capítulo ${chapterNumber} não encontrado em ${parsed.bookName}`)
        return null
      }
      
      console.log(`✅ Capítulo ${chapterNumber}: ${allVerses.length} versículos`)
      
      let verses = allVerses
      
      if (parsed.isVerseRange && parsed.verses[chapterNumber]) {
        const [startVerse, endVerse] = parsed.verses[chapterNumber]
        console.log(`🎯 Extraindo versículos ${startVerse}-${endVerse}`)
        
        verses = allVerses.slice(startVerse - 1, endVerse)
        
        console.log(`✅ Extraídos ${verses.length} versículos`)
      }
      
      return {
        chapterNumber,
        verses,
        totalVerses: verses.length,
        isPartial: parsed.isVerseRange && parsed.verses[chapterNumber] ? true : false,
        verseRange: parsed.isVerseRange && parsed.verses[chapterNumber] ? parsed.verses[chapterNumber] : null
      }
    }).filter(Boolean)
    
    console.log(`🎉 Sucesso: ${chaptersText.length} capítulos carregados`)
    
    return {
      bookName: parsed.bookName,
      displayName: parsed.displayName,
      chapters: chaptersText,
      version
    }
  } catch (error) {
    console.error(`❌ Erro ao carregar texto da leitura ${reading}:`, error)
    throw error
  }
}

export const availableVersions = {
  'ACF': 'Almeida Corrigida Fiel',
  'ARA': 'Almeida Revista e Atualizada',
  'NVI': 'Nova Versão Internacional'
}