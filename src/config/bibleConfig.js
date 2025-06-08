/**
 * Configuração HÍBRIDA para dados bíblicos - TESTADA E FUNCIONAL!
 * API PRINCIPAL: wldeh/bible-api (estrutura por livros/capítulos)
 * FALLBACK: thiagobodruk/biblia (estrutura completa)
 */

// API PRINCIPAL: wldeh/bible-api (mais confiável)
export const BIBLE_API_CONFIG = {
  baseUrl: 'https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles',
  versions: {
    ARA: 'pt-br-ara', // Almeida Revista e Atualizada
    ACF: 'pt-br-acf', // Almeida Corrigida Fiel
    NVI: 'pt-br-nvi'  // Nova Versão Internacional
  }
}

// FALLBACK: URLs completas (caso a API principal falhe)
export const BIBLE_URLS = {
  ARA: [
    'https://cdn.jsdelivr.net/gh/thiagobodruk/biblia@master/json/aa.json',
    'https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/aa.json'
  ],
  ACF: [
    'https://cdn.jsdelivr.net/gh/thiagobodruk/biblia@master/json/acf.json',
    'https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json'
  ],
  NVI: [
    'https://cdn.jsdelivr.net/gh/thiagobodruk/biblia@master/json/nvi.json',
    'https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json'
  ]
}

// URLs de fallback adicionais
export const FALLBACK_URLS = {
  ARA: [
    'https://gitcdn.link/repo/thiagobodruk/biblia/master/json/aa.json'
  ],
  ACF: [
    'https://gitcdn.link/repo/thiagobodruk/biblia/master/json/acf.json'
  ],
  NVI: [
    'https://gitcdn.link/repo/thiagobodruk/biblia/master/json/nvi.json'
  ]
}