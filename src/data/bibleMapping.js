/**
 * 🔧 Mapeamento entre nomes das leituras e arquivos JSON da Bíblia
 * ✨ VERSÃO FINAL - Suporte completo a leituras especiais e normais
 * 🔥 COM DEBUG TOTAL PARA QUEBRAR O PROBLEMA
 */

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
  '1 Samuel': '1 samuel',      // ✅ COM ESPAÇO
  '2 Samuel': '2 samuel',      // ✅ COM ESPAÇO
  '1 Reis': '1 reis',          // ✅ COM ESPAÇO
  '2 Reis': '2 reis',          // ✅ COM ESPAÇO
  '1 Crônicas': '1 cronicas',  // ✅ COM ESPAÇO
  '2 Crônicas': '2 cronicas',  // ✅ COM ESPAÇO
  'Esdras': 'esdras',
  'Neemias': 'neemias',
  'Ester': 'ester',
  
  // Poéticos
  'Jó': 'jo',
  'Salmos': 'salmos',
  'Provérbios': 'proverbios',
  'Eclesiastes': 'eclesiastes',
  'Cantares': 'canticos',  // ✅ CORRIGIDO: cantares → canticos
  
  // Profetas Maiores
  'Isaías': 'isaias',
  'Jeremias': 'jeremias',
  'Lamentações': 'lamentacoes de jeremias',  // ✅ CORRIGIDO: nome com espaço
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

/**
 * 💾 Cache para evitar múltiplas requisições do mesmo livro
 */
const bibleCache = new Map()

/**
 * 🔧 Adaptar estrutura da Bíblia para formato padrão
 */
function adaptBookStructure(bookData, bookName) {
  console.log(`🔧 Adaptando estrutura para: ${bookName}`)
  
  // Estrutura padrão: { chapters: [[vers1, vers2...], [vers1, vers2...]] }
  if (bookData.chapters && Array.isArray(bookData.chapters)) {
    console.log(`✅ Estrutura padrão: ${bookData.chapters.length} capítulos`)
    return bookData
  }
  
  // Estrutura ACF: [{ "1": { "1": "texto", "2": "texto" } }, { "2": { ... } }]
  if (Array.isArray(bookData) && bookData.length > 0 && typeof bookData[0] === 'object') {
    console.log('🔧 Estrutura ACF detectada - convertendo...')
    
    const chapters = bookData.map((chapterObj, index) => {
      const chapterKeys = Object.keys(chapterObj)
      if (chapterKeys.length === 0) return []
      
      const chapterKey = chapterKeys[0]
      const versesObj = chapterObj[chapterKey]
      
      // Ordenar versículos numericamente
      const verseKeys = Object.keys(versesObj).sort((a, b) => parseInt(a) - parseInt(b))
      const versesArray = verseKeys.map(key => versesObj[key])
      
      console.log(`📖 Capítulo ${index + 1}: ${versesArray.length} versículos`)
      return versesArray
    })
    
    console.log(`✅ ACF convertido: ${chapters.length} capítulos`)
    return { chapters }
  }
  
  // Array direto de capítulos: [[vers1, vers2], [vers1, vers2]]
  if (Array.isArray(bookData) && bookData.length > 0 && Array.isArray(bookData[0])) {
    console.log('✅ Array direto de capítulos detectado')
    return { chapters: bookData }
  }
  
  // Objeto com chaves numéricas: { "1": { "1": "texto" }, "2": { "1": "texto" } }
  const numericKeys = Object.keys(bookData).filter(key => !isNaN(key)).sort((a, b) => parseInt(a) - parseInt(b))
  if (numericKeys.length > 0) {
    console.log('🔧 Convertendo objeto com chaves numéricas')
    const chapters = numericKeys.map(key => {
      const chapterData = bookData[key]
      
      if (typeof chapterData === 'object' && !Array.isArray(chapterData)) {
        // Ordenar versículos numericamente
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

/**
 * 📖 Função para carregar um livro da Bíblia - CORRIGIDA
 */
export async function loadBibleBook(bookFile, version = 'ACF') {
  const cacheKey = `${version}-${bookFile}`
  
  // 🔧 FORÇAR RELOAD PARA 1 JOÃO
  const forceReload = bookFile === '1 joao'
  
  // Verificar cache primeiro (pular se forceReload)
  if (!forceReload && bibleCache.has(cacheKey)) {
    console.log(`📋 Usando cache para: ${cacheKey}`)
    return bibleCache.get(cacheKey)
  }
  
  try {
    // 🔧 URL simples sem headers problemáticos
    let rawUrl
    if (forceReload) {
      const timestamp = Date.now()
      rawUrl = `https://raw.githubusercontent.com/marcos-lima-dev/365palavras-bible/main/${version}/${bookFile}.json?v=${timestamp}`
    } else {
      rawUrl = `https://raw.githubusercontent.com/marcos-lima-dev/365palavras-bible/main/${version}/${bookFile}.json`
    }
    
    console.log(`🌐 Carregando ${forceReload ? '(FORCE)' : ''}: ${rawUrl}`)
    
    // 🔧 FETCH SIMPLES - sem headers que causam CORS
    const response = await fetch(rawUrl)
    
    console.log(`📡 Status: ${response.status}`)
    
    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status} para ${bookFile}`)
    }
    
    console.log(`✅ Arquivo carregado: ${bookFile}.json`)
    const rawData = await response.json()
    
    const adaptedData = adaptBookStructure(rawData, bookFile)
    
    // 🔧 Debug para 1 João
    if (bookFile === '1 joao') {
      console.log(`📚 1 JOÃO: ${adaptedData.chapters?.length || 0} capítulos encontrados`)
      adaptedData.chapters?.forEach((chapter, index) => {
        console.log(`  📖 Capítulo ${index + 1}: ${chapter.length} versículos`)
      })
    }
    
    // Salvar no cache
    bibleCache.set(cacheKey, adaptedData)
    console.log(`💾 Salvo no cache: ${cacheKey}`)
    
    return adaptedData
  } catch (error) {
    console.error(`❌ Erro ao carregar ${bookFile}:`, error)
    throw error
  }
}

/**
 * 🧹 Função para limpar cache específico (útil para debug)
 */
export function clearBookCache(bookFile, version = 'ACF') {
  const cacheKey = `${version}-${bookFile}`
  bibleCache.delete(cacheKey)
  console.log(`🧹 Cache limpo para: ${cacheKey}`)
}

/**
 * 🧹 Função para limpar todo o cache
 */
export function clearAllCache() {
  bibleCache.clear()
  console.log('🧹 Todo cache da Bíblia foi limpo!')
}

/**
 * 🔍 Função para parsear um livro individual
 * Ex: "Gênesis 1-3", "Filemom", "Hebreus 1-6"
 */
function parseSingleBook(bookText) {
  console.log(`🔍 Parseando livro individual: "${bookText}"`)
  
  // 1. Capítulos múltiplos: "Livro X-Y"
  const chapterRangeMatch = bookText.match(/^(.+?)\s+(\d+)-(\d+)$/)
  if (chapterRangeMatch) {
    const bookName = chapterRangeMatch[1].trim()
    const startChapter = parseInt(chapterRangeMatch[2])
    const endChapter = parseInt(chapterRangeMatch[3])
    
    const bookFile = bookMapping[bookName]
    if (!bookFile) {
      console.warn(`❌ Livro não encontrado: ${bookName}`)
      return null
    }
    
    const chapters = []
    for (let i = startChapter; i <= endChapter; i++) {
      chapters.push(i)
    }
    
    console.log(`📚 Range de capítulos: ${bookName} ${startChapter}-${endChapter}`)
    console.log(`🔥 DEBUG PARSER: Capítulos gerados:`, chapters)
    
    return {
      bookName,
      bookFile,
      chapters,
      displayName: bookText,
      isVerseRange: false,
      isComplete: false
    }
  }
  
  // 2. Versículos específicos: "Livro cap:vers-vers"
  const verseMatch = bookText.match(/^(.+?)\s+(\d+):(\d+)-(\d+)$/)
  if (verseMatch) {
    const bookName = verseMatch[1].trim()
    const chapter = parseInt(verseMatch[2])
    const startVerse = parseInt(verseMatch[3])
    const endVerse = parseInt(verseMatch[4])
    
    const bookFile = bookMapping[bookName]
    if (!bookFile) {
      console.warn(`❌ Livro não encontrado: ${bookName}`)
      return null
    }
    
    console.log(`📖 Versículos específicos: ${bookName} ${chapter}:${startVerse}-${endVerse}`)
    
    return {
      bookName,
      bookFile,
      chapters: [chapter],
      verses: { [chapter]: [startVerse, endVerse] },
      displayName: bookText,
      isVerseRange: true,
      isComplete: false
    }
  }
  
  // 3. Capítulo único: "Livro X"
  const singleChapterMatch = bookText.match(/^(.+?)\s+(\d+)$/)
  if (singleChapterMatch) {
    const bookName = singleChapterMatch[1].trim()
    const chapter = parseInt(singleChapterMatch[2])
    
    const bookFile = bookMapping[bookName]
    if (!bookFile) {
      console.warn(`❌ Livro não encontrado: ${bookName}`)
      return null
    }
    
    console.log(`📚 Capítulo único: ${bookName} ${chapter}`)
    
    return {
      bookName,
      bookFile,
      chapters: [chapter],
      displayName: bookText,
      isVerseRange: false,
      isComplete: false
    }
  }
  
  // 4. Livro completo: "Filemom", "Judas", etc.
  const completeBookMatch = bookText.match(/^([A-Za-záêôõâçãíéúÇÃÍÉÚÁÊÔÕÂ\s\d]+)$/)
  if (completeBookMatch) {
    const bookName = completeBookMatch[1].trim()
    const bookFile = bookMapping[bookName]
    
    if (bookFile) {
      console.log(`📚 Livro completo: ${bookName}`)
      return {
        bookName,
        bookFile,
        chapters: 'all',
        displayName: bookText,
        isVerseRange: false,
        isComplete: true
      }
    }
  }
  
  console.warn(`❌ Não foi possível parsear: "${bookText}"`)
  return null
}

/**
 * 🔍 Parser para leituras com múltiplos livros
 * Ex: "Filemom; Hebreus 1-6"
 */
function parseMultipleBooks(reading) {
  console.log(`🔍 Parseando múltiplos livros: ${reading}`)
  
  const books = reading.split(';').map(book => book.trim())
  const parsedBooks = []
  
  console.log(`📖 Encontrados ${books.length} livros:`, books)
  
  for (const book of books) {
    const parsed = parseSingleBook(book)
    if (parsed) {
      console.log(`✅ Sucesso: ${parsed.bookName} (${parsed.isComplete ? 'completo' : 'parcial'})`)
      parsedBooks.push(parsed)
    } else {
      console.warn(`❌ Falha ao parsear: "${book}"`)
    }
  }
  
  if (parsedBooks.length === 0) {
    return null
  }
  
  return {
    type: 'multiple',
    books: parsedBooks,
    displayName: reading
  }
}

/**
 * 🔍 Função para extrair referências bíblicas de leituras especiais
 * Ex: "Promessa: Gênesis 3:15; Isaías 7:14" → múltiplas referências
 */
function parseSpecialReading(reading) {
  console.log(`🔍 Parseando leitura especial: ${reading}`)
  
  // Regex para capturar referências: "Livro cap:vers" ou "Livro cap"
  const referencePattern = /([123]?\s*[A-Za-záêôõâçãíéúÇÃÍÉÚÁÊÔÕÂ]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?/g
  const references = []
  let match
  
  while ((match = referencePattern.exec(reading)) !== null) {
    const bookName = match[1].trim()
    const chapter = parseInt(match[2])
    const startVerse = match[3] ? parseInt(match[3]) : null
    const endVerse = match[4] ? parseInt(match[4]) : startVerse
    
    const bookFile = bookMapping[bookName]
    if (bookFile) {
      references.push({
        bookName,
        bookFile,
        chapter,
        startVerse,
        endVerse,
        displayName: `${bookName} ${chapter}${startVerse ? `:${startVerse}` : ''}${endVerse && endVerse !== startVerse ? `-${endVerse}` : ''}`
      })
    } else {
      console.warn(`⚠️ Livro não encontrado no mapeamento: ${bookName}`)
    }
  }
  
  if (references.length > 0) {
    console.log(`✅ Encontradas ${references.length} referências:`, references.map(r => r.displayName))
    return {
      type: 'special',
      references,
      displayName: reading
    }
  }
  
  return null
}

/**
 * 🎯 Função principal de parsing
 */
export function parseReading(reading) {
  console.log(`🔍 Parseando leitura: ${reading}`)
  
  // 1. Tentar leituras múltiplas primeiro (tem ';')
  if (reading.includes(';')) {
    const multipleResult = parseMultipleBooks(reading)
    if (multipleResult) {
      console.log(`✅ Leitura múltipla parseada: ${multipleResult.books.length} livros`)
      return multipleResult
    }
  }
  
  // 2. Tentar leitura única
  const singleResult = parseSingleBook(reading)
  if (singleResult) {
    console.log(`✅ Leitura única parseada: ${singleResult.displayName}`)
    return {
      type: 'normal',
      ...singleResult
    }
  }
  
  // 3. Tentar leitura especial (referências com :)
  const specialResult = parseSpecialReading(reading)
  if (specialResult) {
    console.log(`✅ Leitura especial parseada: ${specialResult.references.length} referências`)
    return specialResult
  }
  
  console.warn(`❌ Não foi possível parsear: ${reading}`)
  return null
}

/**
 * 📖 Função para carregar um livro individual - COM DEBUG TOTAL
 */
async function loadSingleBook(bookInfo, version) {
  console.log(`🔥 DEBUG TOTAL - loadSingleBook iniciado`)
  console.log(`📖 Carregando livro: ${bookInfo.bookName}`)
  
  // 🔧 DEBUG: Verificar quais capítulos estão sendo solicitados
  console.log(`🔍 DEBUG bookInfo COMPLETO:`, {
    bookName: bookInfo.bookName,
    bookFile: bookInfo.bookFile,
    chapters: bookInfo.chapters,
    displayName: bookInfo.displayName,
    isComplete: bookInfo.isComplete,
    isVerseRange: bookInfo.isVerseRange
  })
  
  const bookData = await loadBibleBook(bookInfo.bookFile, version)
  
  // 🔧 DEBUG: Verificar quantos capítulos o livro tem
  console.log(`📚 DEBUG bookData: ${bookData.chapters.length} capítulos disponíveis`)
  console.log(`📚 DEBUG capítulos disponíveis no livro:`, bookData.chapters.map((ch, i) => `Cap ${i+1}: ${ch.length} versículos`))
  
  let chaptersText = []
  
  if (bookInfo.chapters === 'all') {
    // Livro completo
    console.log(`📚 Carregando livro completo: ${bookInfo.bookName}`)
    chaptersText = bookData.chapters.map((verses, index) => ({
      chapterNumber: index + 1,
      verses,
      totalVerses: verses.length,
      bookName: bookInfo.bookName,
      isComplete: true
    }))
  } else {
    // Capítulos específicos
    console.log(`🎯 DEBUG: Processando capítulos específicos:`, bookInfo.chapters)
    console.log(`🎯 DEBUG: Tipo de chapters:`, typeof bookInfo.chapters, Array.isArray(bookInfo.chapters))
    console.log(`🎯 DEBUG: Quantidade de capítulos solicitados:`, bookInfo.chapters.length)
    
    chaptersText = bookInfo.chapters.map((chapterNumber, mapIndex) => {
      console.log(`🔍 DEBUG Map iteration ${mapIndex}: processando capítulo ${chapterNumber}`)
      
      const chapterIndex = chapterNumber - 1
      const allVerses = bookData.chapters[chapterIndex]
      
      console.log(`🔍 DEBUG: Capítulo ${chapterNumber} (índice ${chapterIndex}):`, 
        allVerses ? `${allVerses.length} versículos encontrados` : '❌ NÃO ENCONTRADO')
      
      if (!allVerses) {
        console.warn(`❌ Capítulo ${chapterNumber} não encontrado em ${bookInfo.bookName}`)
        console.warn(`❌ Índice ${chapterIndex} não existe no array de ${bookData.chapters.length} capítulos`)
        return null
      }
      
      let verses = allVerses
      
      // Se é um range de versículos específicos
      if (bookInfo.isVerseRange && bookInfo.verses && bookInfo.verses[chapterNumber]) {
        const [startVerse, endVerse] = bookInfo.verses[chapterNumber]
        verses = allVerses.slice(startVerse - 1, endVerse)
        console.log(`🎯 Extraindo versículos ${startVerse}-${endVerse}: ${verses.length} versículos`)
      }
      
      const result = {
        chapterNumber,
        verses,
        totalVerses: verses.length,
        bookName: bookInfo.bookName,
        isPartial: bookInfo.isVerseRange && bookInfo.verses && bookInfo.verses[chapterNumber] ? true : false,
        verseRange: bookInfo.isVerseRange && bookInfo.verses && bookInfo.verses[chapterNumber] ? bookInfo.verses[chapterNumber] : null
      }
      
      console.log(`✅ DEBUG: Capítulo ${chapterNumber} processado COM SUCESSO:`, {
        chapterNumber: result.chapterNumber,
        totalVerses: result.totalVerses,
        firstVerse: result.verses[0]?.substring(0, 50) + '...',
        bookName: result.bookName
      })
      
      return result
    }).filter(Boolean) // Remove nulls
    
    console.log(`🔥 DEBUG: Filter aplicado, ${chaptersText.length} capítulos restantes`)
  }
  
  console.log(`🎯 DEBUG FINAL loadSingleBook: Retornando ${chaptersText.length} capítulos`)
  chaptersText.forEach((ch, i) => {
    console.log(`  📖 DEBUG Final Cap ${i+1}: Capítulo ${ch.chapterNumber} com ${ch.totalVerses} versículos`)
  })
  
  return chaptersText
}

/**
 * 📖 Função para carregar texto de leitura especial (múltiplas referências)
 */
async function loadSpecialReadingText(references, version) {
  const results = []
  
  for (const ref of references) {
    try {
      console.log(`📖 Carregando referência: ${ref.displayName}`)
      
      const bookData = await loadBibleBook(ref.bookFile, version)
      const chapterData = bookData.chapters[ref.chapter - 1]
      
      if (!chapterData) {
        console.warn(`❌ Capítulo ${ref.chapter} não encontrado em ${ref.bookName}`)
        continue
      }
      
      let verses = chapterData
      if (ref.startVerse && ref.endVerse) {
        verses = chapterData.slice(ref.startVerse - 1, ref.endVerse)
        console.log(`📝 Versículos ${ref.startVerse}-${ref.endVerse}: ${verses.length} versículos`)
      }
      
      results.push({
        bookName: ref.bookName,
        chapter: ref.chapter,
        startVerse: ref.startVerse,
        endVerse: ref.endVerse,
        verses,
        displayName: ref.displayName
      })
      
    } catch (error) {
      console.error(`❌ Erro ao carregar ${ref.displayName}:`, error)
    }
  }
  
  return results
}

/**
 * 🎯 Função principal para carregar texto de uma leitura - COM DEBUG
 */
export async function loadReadingText(reading, version = 'ACF') {
  console.log(`🔥 DEBUG TOTAL - loadReadingText iniciado`)
  console.log(`📖 Carregando: ${reading} (${version})`)
  
  const parsed = parseReading(reading)
  
  if (!parsed) {
    throw new Error(`Não foi possível parsear a leitura: ${reading}`)
  }
  
  console.log(`🔥 DEBUG: Leitura parseada:`, parsed)
  
  try {
    // Leitura especial (múltiplas referências com :)
    if (parsed.type === 'special') {
      console.log(`🎯 Processando leitura especial com ${parsed.references.length} referências`)
      
      const specialResults = await loadSpecialReadingText(parsed.references, version)
      
      return {
        type: 'special',
        displayName: parsed.displayName,
        references: specialResults,
        version
      }
    }
    
    // Leitura múltipla (vários livros com ;)
    if (parsed.type === 'multiple') {
      console.log(`🎯 Processando leitura múltipla com ${parsed.books.length} livros`)
      
      const allChapters = []
      const bookNames = []
      
      for (const book of parsed.books) {
        const chaptersResult = await loadSingleBook(book, version)
        allChapters.push(...chaptersResult)
        bookNames.push(book.bookName)
      }
      
      return {
        type: 'multiple',
        bookName: bookNames.join(' + '),
        displayName: parsed.displayName,
        chapters: allChapters,
        version,
        bookCount: parsed.books.length
      }
    }
    
    // Leitura normal (um livro)
    console.log(`📚 Processando leitura normal: ${parsed.bookName}`)
    console.log(`🔥 DEBUG: Chamando loadSingleBook com:`, parsed)
    
    const chaptersResult = await loadSingleBook(parsed, version)
    
    console.log(`🔥 DEBUG: loadSingleBook retornou:`, chaptersResult)
    console.log(`🔥 DEBUG: Quantidade de capítulos retornados:`, chaptersResult.length)
    
    const finalResult = {
      type: 'normal',
      bookName: parsed.bookName,
      displayName: parsed.displayName,
      chapters: chaptersResult,
      version
    }
    
    console.log(`🔥 DEBUG FINAL: Resultado final:`, {
      type: finalResult.type,
      bookName: finalResult.bookName,
      displayName: finalResult.displayName,
      chaptersCount: finalResult.chapters.length,
      version: finalResult.version
    })
    
    return finalResult
    
  } catch (error) {
    console.error(`❌ Erro ao carregar texto da leitura ${reading}:`, error)
    throw error
  }
}

/**
 * 📚 Versões disponíveis
 */
export const availableVersions = {
  'ACF': 'Almeida Corrigida Fiel',
  'ARA': 'Almeida Revista e Atualizada',
  'NVI': 'Nova Versão Internacional'
}