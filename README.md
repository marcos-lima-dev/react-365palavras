# 📖 365Palavras

> **Leitura bíblica diária para adolescentes** - Um app moderno e interativo para acompanhar o plano de leitura anual da Bíblia.

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://365palavras.netlify.app/)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue)](https://365palavras.netlify.app/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 **Visão Geral**

O **365Palavras** é um aplicativo web progressivo (PWA) desenvolvido para tornar a leitura bíblica diária mais engajante e motivadora para adolescentes. Com uma interface moderna, sistema de gamificação e design responsivo, o app oferece uma experiência única de crescimento espiritual.

### ✨ **Funcionalidades Principais**

- 📅 **Plano de leitura anual** com 365 leituras organizadas
- 🏠 **Interface intuitiva** com navegação entre meses
- 🏆 **Sistema de conquistas** com 6 medalhas gamificadas
- 📊 **Acompanhamento de progresso** em tempo real
- 🔥 **Contador de sequência** (streak) de dias consecutivos
- 💾 **Persistência local** de dados (localStorage)
- 📱 **PWA installável** - funciona como app nativo
- 🎨 **Design moderno** voltado para adolescentes
- 📖 **Versículos motivacionais** diários

## 🌐 **Demo ao Vivo**

👉 **[Acesse o app: 365palavras.netlify.app](https://365palavras.netlify.app/)**

### 📱 **Instalação como App**
1. Acesse o link no seu celular
2. Toque no menu do navegador
3. Selecione "Adicionar à tela inicial"
4. Use como um app nativo!

## 🖼️ **Screenshots**

### 🏠 Tela Home
- Lista interativa de leituras do mês
- Progresso visual com barras animadas
- Versículo motivacional diário

### 📅 Plano Anual
- Grid visual de todos os 12 meses
- Indicador de mês ativo
- Progresso individual por mês

### 🏆 Progresso & Conquistas
- Estatísticas detalhadas
- Sistema de medalhas
- Progresso anual visualizado

### ⚙️ Configurações
- Toggle de notificações
- Reset de progresso
- Informações do app

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **React 18** - Framework principal
- **Tailwind CSS 3** - Estilização e design system
- **Lucide React** - Biblioteca de ícones
- **Vite** - Build tool e dev server

### **Funcionalidades**
- **PWA** - Service Worker + Web App Manifest
- **LocalStorage** - Persistência de dados local
- **Responsive Design** - Mobile-first approach

### **Deploy & Hosting**
- **Netlify** - Hosting e CI/CD
- **Custom Domain** - 365palavras.netlify.app

## 🚀 **Instalação Local**

### **Pré-requisitos**
- Node.js 16+ 
- npm ou yarn

### **Passos de instalação**

```bash
# Clone o repositório
git clone https://github.com/[seu-usuario]/365palavras.git

# Entre na pasta do projeto
cd 365palavras

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### **Scripts Disponíveis**
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Verificação de código

## 📁 **Estrutura do Projeto**

```
src/
├── components/
│   ├── ui/                    # Componentes reutilizáveis
│   │   ├── BottomNavigation.jsx
│   │   ├── ToastNotification.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── ReadingCard.jsx
│   │   └── MonthCard.jsx
│   └── screens/               # Telas principais
│       ├── HomeScreen.jsx
│       ├── PlanScreen.jsx
│       ├── ProgressScreen.jsx
│       └── SettingsScreen.jsx
├── hooks/                     # Custom hooks
│   ├── useLocalStorage.js
│   └── useProgress.js
├── data/                      # Dados estáticos
│   ├── readingPlan.js
│   └── achievements.js
├── utils/                     # Utilitários
│   └── dateUtils.js
└── App.jsx                    # Componente principal
```

## 🎮 **Como Usar**

### **1. Navegação**
- **Home**: Lista de leituras do mês ativo
- **Plano**: Grid com todos os 12 meses
- **Progresso**: Estatísticas e conquistas
- **Config**: Configurações e informações

### **2. Lendo a Bíblia**
- Toque nos checkboxes para marcar leituras
- Acompanhe seu progresso em tempo real
- Troque de mês quando quiser

### **3. Gamificação**
- Desbloqueie conquistas lendo regularmente
- Mantenha sua sequência (streak) ativa
- Acompanhe estatísticas anuais

## 🏆 **Sistema de Conquistas**

| Conquista | Ícone | Requisito |
|-----------|-------|-----------|
| Primeiro Passo | 🌱 | 1 leitura |
| Uma Semana | ⭐ | 7 dias seguidos |
| Perseverança | 🏆 | 30 leituras |
| Dedicado | 💎 | 100 leituras |
| Leitor Fiel | 👑 | 200 leituras |
| Completista | 🎯 | 365 leituras |

## 📊 **Funcionalidades Técnicas**

### **Performance**
- ⚡ **Lazy loading** de componentes
- 🗜️ **Bundle otimizado** com Vite
- 📱 **Responsivo** em todos os dispositivos

### **Dados**
- 💾 **Persistência local** (não precisa de backend)
- 🔄 **Sincronização** entre abas do navegador
- 📊 **Cálculos em tempo real** de progresso

### **PWA Features**
- 📱 **Instalável** como app nativo
- 🔄 **Funciona offline** (após primeira visita)
- 🎨 **Splash screen** personalizada
- 📲 **Ícone customizado** na tela inicial

## 🎨 **Design System**

### **Cores Principais**
- **Emerald/Teal**: `#10b981` - Progresso e sucesso
- **Purple/Pink**: `#8b5cf6` - Navegação e destaques
- **Blue/Indigo**: `#3b82f6` - Informações
- **Amber/Orange**: `#f59e0b` - Conquistas e alertas

### **Componentes**
- **Cards**: Rounded corners, shadows, hover effects
- **Gradientes**: Múltiplas direções e cores
- **Animações**: Smooth transitions (300ms)
- **Typography**: Font weights variados para hierarquia

## 🤝 **Contribuição**

Contribuições são muito bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. **Abra** um Pull Request

### **Tipos de Contribuição**
- 🐛 **Bug fixes**
- ✨ **Novas features**
- 📝 **Melhorias na documentação**
- 🎨 **Melhorias no design**
- 🧪 **Testes automatizados**

## 📋 **Roadmap**

### **v1.1 (Próxima versão)**
- [ ] 🌙 **Dark mode**
- [ ] 🔔 **Notificações push**
- [ ] 📊 **Gráficos de progresso**
- [ ] 🎵 **Áudios motivacionais**

### **v1.2 (Futuro)**
- [ ] ☁️ **Sync na nuvem**
- [ ] 👥 **Grupos de leitura**
- [ ] 📝 **Notas pessoais**
- [ ] 🏅 **Rankings**

## 👨‍💻 **Autor**

**Marcos de Sousa Lima**
- 🌐 GitHub: [@[seu-usuario]](https://github.com/marcos-lima-dev)
- 📧 Email: [seu-email]
- 💼 LinkedIn: [seu-linkedin]

## 📄 **Licença**

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 **Agradecimentos**

- 📖 **Comunidade cristã** que inspirou o projeto
- 👥 **Adolescentes** que testaram e deram feedback
- 🎨 **Lucide Icons** pela biblioteca de ícones
- ⚡ **Vite & React Team** pelas ferramentas incríveis

---

## 💝 **Objetivo do Projeto**

> *"Que as palavras deste app te guiem mais perto do Senhor. Abrace cada dia com um coração aberto, pronto para receber as bênçãos que te aguardam."*

O **365Palavras** foi criado com amor para ajudar jovens a desenvolverem o hábito da leitura bíblica diária de forma moderna e engajante.

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐