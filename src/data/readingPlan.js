/**
 * 📖 PLANO DE LEITURA BÍBLICA COMPLETO - 365 DIAS
 * 🎯 COBERTURA TOTAL: Todos os 66 livros da Bíblia (1.189 capítulos)
 * 📜 ORDEM CANÔNICA LINEAR: Gênesis 1 → Apocalipse 22
 * ⚖️ DISTRIBUIÇÃO: 3.26 capítulos por dia (média)
 * 🔄 ZERO REPETIÇÕES: Cada capítulo lido apenas uma vez
 * ✨ SEM REVISÕES: Progressão linear pura
 */

// Função para criar o plano linear automático
function createLinearPlan() {
  const biblicalBooks = [
    { name: 'Gênesis', chapters: 50 },
    { name: 'Êxodo', chapters: 40 },
    { name: 'Levítico', chapters: 27 },
    { name: 'Números', chapters: 36 },
    { name: 'Deuteronômio', chapters: 34 },
    { name: 'Josué', chapters: 24 },
    { name: 'Juízes', chapters: 21 },
    { name: 'Rute', chapters: 4 },
    { name: '1 Samuel', chapters: 31 },
    { name: '2 Samuel', chapters: 24 },
    { name: '1 Reis', chapters: 22 },
    { name: '2 Reis', chapters: 25 },
    { name: '1 Crônicas', chapters: 29 },
    { name: '2 Crônicas', chapters: 36 },
    { name: 'Esdras', chapters: 10 },
    { name: 'Neemias', chapters: 13 },
    { name: 'Ester', chapters: 10 },
    { name: 'Jó', chapters: 42 },
    { name: 'Salmos', chapters: 150 },
    { name: 'Provérbios', chapters: 31 },
    { name: 'Eclesiastes', chapters: 12 },
    { name: 'Cantares', chapters: 8 },
    { name: 'Isaías', chapters: 66 },
    { name: 'Jeremias', chapters: 52 },
    { name: 'Lamentações', chapters: 5 },
    { name: 'Ezequiel', chapters: 48 },
    { name: 'Daniel', chapters: 12 },
    { name: 'Oséias', chapters: 14 },
    { name: 'Joel', chapters: 3 },
    { name: 'Amós', chapters: 9 },
    { name: 'Obadias', chapters: 1 },
    { name: 'Jonas', chapters: 4 },
    { name: 'Miquéias', chapters: 7 },
    { name: 'Naum', chapters: 3 },
    { name: 'Habacuque', chapters: 3 },
    { name: 'Sofonias', chapters: 3 },
    { name: 'Ageu', chapters: 2 },
    { name: 'Zacarias', chapters: 14 },
    { name: 'Malaquias', chapters: 4 },
    { name: 'Mateus', chapters: 28 },
    { name: 'Marcos', chapters: 16 },
    { name: 'Lucas', chapters: 24 },
    { name: 'João', chapters: 21 },
    { name: 'Atos', chapters: 28 },
    { name: 'Romanos', chapters: 16 },
    { name: '1 Coríntios', chapters: 16 },
    { name: '2 Coríntios', chapters: 13 },
    { name: 'Gálatas', chapters: 6 },
    { name: 'Efésios', chapters: 6 },
    { name: 'Filipenses', chapters: 4 },
    { name: 'Colossenses', chapters: 4 },
    { name: '1 Tessalonicenses', chapters: 5 },
    { name: '2 Tessalonicenses', chapters: 3 },
    { name: '1 Timóteo', chapters: 6 },
    { name: '2 Timóteo', chapters: 4 },
    { name: 'Tito', chapters: 3 },
    { name: 'Filemom', chapters: 1 },
    { name: 'Hebreus', chapters: 13 },
    { name: 'Tiago', chapters: 5 },
    { name: '1 Pedro', chapters: 5 },
    { name: '2 Pedro', chapters: 3 },
    { name: '1 João', chapters: 5 },
    { name: '2 João', chapters: 1 },
    { name: '3 João', chapters: 1 },
    { name: 'Judas', chapters: 1 },
    { name: 'Apocalipse', chapters: 22 }
  ];

  const plan = [];
  let currentChapter = 1;
  let currentBookIndex = 0;
  let currentBook = biblicalBooks[currentBookIndex];
  
  // Distribuir 1189 capítulos em 365 dias
  for (let day = 1; day <= 365; day++) {
    const chaptersThisDay = [];
    let chaptersToRead = day <= 94 ? 4 : 3; // Primeiros 94 dias: 4 caps, resto: 3 caps
    
    for (let i = 0; i < chaptersToRead && currentBookIndex < biblicalBooks.length; i++) {
      // Se terminamos o livro atual
      if (currentChapter > currentBook.chapters) {
        currentBookIndex++;
        if (currentBookIndex >= biblicalBooks.length) break;
        currentBook = biblicalBooks[currentBookIndex];
        currentChapter = 1;
      }
      
      // Adicionar capítulo atual
      if (chaptersThisDay.length === 0) {
        chaptersThisDay.push(`${currentBook.name} ${currentChapter}`);
      } else {
        // Verificar se é do mesmo livro
        const lastReading = chaptersThisDay[chaptersThisDay.length - 1];
        if (lastReading.startsWith(currentBook.name)) {
          // Estender o range
          const parts = lastReading.split(' ');
          const startChapter = parseInt(parts[parts.length - 1].split('-')[0]);
          chaptersThisDay[chaptersThisDay.length - 1] = `${currentBook.name} ${startChapter}-${currentChapter}`;
        } else {
          // Livro diferente, nova entrada
          chaptersThisDay.push(`${currentBook.name} ${currentChapter}`);
        }
      }
      
      currentChapter++;
    }
    
    if (chaptersThisDay.length > 0) {
      plan.push(chaptersThisDay.join('; '));
    }
  }
  
  return plan;
}

// Gerar o plano automático
const linearPlan = createLinearPlan();

// Distribuir por meses (aproximadamente)
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let dayIndex = 0;

export const readingPlan = {};
const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 
                  'july', 'august', 'september', 'october', 'november', 'december'];

monthKeys.forEach((monthKey, monthIndex) => {
  const daysInMonth = monthDays[monthIndex];
  readingPlan[monthKey] = [];
  
  for (let day = 0; day < daysInMonth && dayIndex < linearPlan.length; day++) {
    readingPlan[monthKey].push(linearPlan[dayIndex]);
    dayIndex++;
  }
});

// Função para obter leituras de um mês específico
export const getMonthReadings = (month) => {
  const monthKey = month.toLowerCase()
  return readingPlan[monthKey] || []
}

// Função para obter o total de dias no ano
export const getTotalDays = () => {
  return Object.values(readingPlan).reduce((total, month) => total + month.length, 0)
}

// Função para obter o mês atual
export const getCurrentMonth = () => {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ]
  return months[new Date().getMonth()]
}

// Nomes dos meses em português
export const monthNames = {
  january: 'Janeiro',
  february: 'Fevereiro',
  march: 'Março',
  april: 'Abril',
  may: 'Maio',
  june: 'Junho',
  july: 'Julho',
  august: 'Agosto',
  september: 'Setembro',
  october: 'Outubro',
  november: 'Novembro',
  december: 'Dezembro'
}