# Plano de Desenvolvimento do Frontend (Atualizado)

Este documento descreve o plano atualizado de desenvolvimento do frontend para a Plataforma de Arquitetura & Análise, incorporando as melhorias sugeridas e mantendo o alinhamento com o template Catalyst do TailwindUI.

---

## 1. Visão Geral da Implementação

### Arquitetura Frontend

- **Framework**: React com TypeScript
- **Estilização**: TailwindCSS
- **Gerenciamento de Estado**: TanStack Query (para dados remotos) + Zustand (para estado global)
- **Roteamento**: React Router v6
- **UI Base**: Inspirado no Catalyst UI do TailwindUI
- **Build Tool**: Vite

### Estrutura de Diretórios

```
src/
├── assets/           # Imagens, ícones e outros assets estáticos
├── components/       # Componentes reutilizáveis
│   ├── ui/           # Componentes base (botões, inputs, etc.)
│   ├── layout/       # Componentes de layout (sidebar, header, etc.)
│   ├── charts/       # Componentes de visualização de dados
│   ├── tables/       # Componentes de tabelas e listagens
│   ├── notifications/ # Sistema de alertas e notificações
│   ├── gamification/ # Componentes de gamificação e engajamento
│   └── perspectives/ # Componentes específicos para cada perspectiva
├── contexts/         # Contextos React
├── hooks/            # Hooks personalizados
├── lib/              # Utilitários, APIs e integrações
├── pages/            # Componentes de páginas
├── routes/           # Configuração de rotas
└── store/            # Estado global da aplicação
```

---

## 2. Componentes

### 📥 **Componentes a serem Instalados e Utilizados diretamente**

- **Select / ComboBox**: Headless UI (`@headlessui/react`)
- **Tooltip**: Headless UI (`@headlessui/react`)
- **Dialog / Modal**: Headless UI (`@headlessui/react`)
- **Tabs**: Headless UI (`@headlessui/react`)
- **Accordion**: Headless UI (`@headlessui/react`)
- **DropdownMenu**: Headless UI (`@headlessui/react`)
- **DataTable**: TanStack Table (`@tanstack/react-table`)
- **LineChart / AreaChart / BarChart / PieChart / HeatMap**: Recharts
- **CodeBlock**: Prism.js ou Shiki
- **Alert / Toast**: Sonner (`sonner`)
- **CelebrationOverlay**: React Confetti (`react-confetti`)

### 🛠️ **Componentes a serem Desenvolvidos (personalizados)**

- **Button**
- **Input**
- **Toggle / Switch**
- **Checkbox & Radio**
- **Badge**
- **Avatar**
- **Card**
- **Breadcrumbs**
- **AppShell**
- **Sidebar**
- **Header**
- **PageHeader**
- **TabNav**
- **Footer**
- **AccuracyScoreCard**
- **ModuleResponsibilityViewer**
- **LayerMapVisualizer**
- **C4ModelViewer**
- **FileExplorer**
- **BusinessCapabilityMap**
- **CommitHistoryTimeline**
- **InfrastructureReadinessGauge**
- **EditableExpectationsForm**
- **AlertSystem**
- **NotificationCenter**
- **MetricChangeAlert**
- **CriticalArtifactAlert**
- **LLMTraceabilityPanel**
- **ExpectationDiffViewer**
- **HistoricalComparisonView**
- **AchievementBadge**
- **ProgressTracker**

### 2.1 Componentes Base (UI)

#### Elementos Simples

1. **Button**
   - Variants: primary, secondary, tertiary, danger, success
   - Estados: default, hover, active, loading, disabled
   - Tamanhos: sm, md, lg
   - Implementação: Customizada com Tailwind

2. **Input**
   - Tipos: text, number, date, password
   - Estados: default, focus, error, disabled
   - Tamanhos: sm, md, lg
   - Implementação: Customizada com Tailwind

3. **Select / ComboBox**
   - Funcionalidades: busca, múltipla seleção, agrupamento
   - Biblioteca: Headless UI (@headlessui/react)
   - Motivo: Acessibilidade e flexibilidade mantendo a estilização com Tailwind

4. **Toggle / Switch**
   - Estados: on/off, disabled
   - Implementação: Customizada com Tailwind

5. **Checkbox & Radio**
   - Estados: checked, unchecked, indeterminate, disabled
   - Implementação: Customizada com Tailwind

6. **Badge**
   - Variants: default, primary, success, warning, danger
   - Tamanhos: sm, md
   - Implementação: Customizada com Tailwind

7. **Tooltip**
   - Posicionamento: top, right, bottom, left
   - Biblioteca: @floating-ui/react
   - Motivo: Preciso para posicionamento e acessibilidade

8. **Avatar**
   - Tamanhos: xs, sm, md, lg
   - Variantes: imagem, iniciais, placeholder
   - Implementação: Customizada com Tailwind

#### Componentes Compostos

9. **Card**
   - Subcomponentes: CardHeader, CardContent, CardFooter
   - Variantes: default, bordered, elevated, interactive
   - Implementação: Customizada com Tailwind

10. **Dialog / Modal**
   - Funcionalidades: diferentes tamanhos, scrollable, dismissible
   - Biblioteca: Headless UI (@headlessui/react)
   - Motivo: Acessibilidade e gerenciamento de foco

11. **Tabs**
   - Variantes: horizontal, vertical, pills
   - Biblioteca: Headless UI (@headlessui/react)
   - Motivo: Acessibilidade e integração com router

12. **Accordion**
   - Funcionalidades: expansível, múltiplos/único aberto
   - Biblioteca: Headless UI (@headlessui/react)
   - Motivo: Acessibilidade e animações suaves

13. **Breadcrumbs**
   - Integração com React Router
   - Truncamento inteligente
   - Implementação: Customizada com Tailwind

14. **Alert / Toast**
   - Variantes: success, info, warning, error
   - Posicionamento: top, bottom, etc.
   - Biblioteca: sonner
   - Motivo: API simples, personalização e acessibilidade

15. **DropdownMenu**
   - Subcomponentes: trigger, content, item, separator
   - Biblioteca: Headless UI (@headlessui/react)
   - Motivo: Acessibilidade e personalização

### 2.2 Componentes de Layout

16. **AppShell**
   - Container principal da aplicação
   - Implementação: Customizada com Tailwind baseada no Catalyst

17. **Sidebar**
   - Navegação entre perspectivas e funcionalidades
   - Estados: expanded, collapsed, mobile
   - Implementação: Customizada com Tailwind baseada no Catalyst

18. **Header**
   - Logo, busca global, notificações, perfil
   - Implementação: Customizada com Tailwind baseada no Catalyst

19. **PageHeader**
   - Título, breadcrumbs, ações principais
   - Implementação: Customizada com Tailwind

20. **TabNav**
   - Navegação entre abas dentro de uma perspectiva
   - Implementação: Customizada com Headless UI e Tailwind

21. **Footer**
   - Informações de copyright, links úteis
   - Implementação: Customizada com Tailwind

### 2.3 Componentes de Visualização de Dados

22. **DataTable**
   - Funcionalidades: ordenação, paginação, filtragem, seleção de linhas
   - Biblioteca: TanStack Table (@tanstack/react-table)
   - Motivo: Performance, flexibilidade e recursos avançados

23. **LineChart / AreaChart**
   - Funcionalidades: zoom, drill-down, tooltips, legenda, responsivo
   - Biblioteca: Recharts
   - Motivo: Flexibilidade, performance e facilidade de personalização

24. **BarChart / ColumnChart**
   - Funcionalidades: comparações, drill-down, stacked/grouped
   - Biblioteca: Recharts
   - Motivo: Consistência com outros gráficos

25. **PieChart / DonutChart**
   - Funcionalidades: distribuição, seleção de segmentos
   - Biblioteca: Recharts
   - Motivo: Consistência com outros gráficos

26. **HeatMap**
   - Representação de padrões e intensidade
   - Biblioteca: Recharts
   - Motivo: Visualização de complexidade e hotspots

27. **NetworkGraph / DependencyGraph**
   - Visualização de relacionamentos e dependências
   - Biblioteca: React Force Graph
   - Motivo: Performance com grandes conjuntos de dados e interatividade

28. **TreeMap**
   - Visualização hierárquica de dados
   - Biblioteca: Recharts
   - Motivo: Visualização da estrutura de código e componentes

29. **CodeBlock**
   - Syntax highlighting, linhas numeradas
   - Biblioteca: Prism.js ou Shiki
   - Motivo: Performance e suporte a múltiplas linguagens

30. **MetricCard**
   - Exibição de métricas chave com tendências
   - Implementação: Customizada com Tailwind

### 2.4 Componentes Específicos para Perspectivas

31. **AccuracyScoreCard**
   - Visualização de score de precisão com histórico
   - Implementação: Customizada com Recharts e Tailwind

32. **ModuleResponsibilityViewer**
   - Exibição das responsabilidades de módulos com explicações
   - Implementação: Customizada com Tailwind

33. **LayerMapVisualizer**
   - Visualização de mapeamento de camadas
   - Implementação: Customizada com React Force Graph e Tailwind

34. **C4ModelViewer**
   - Visualização interativa de modelos C4
   - Implementação: Customizada com React Flow e Tailwind

35. **FileExplorer**
   - Navegação pela estrutura de arquivos com métricas
   - Implementação: Customizada com Tailwind e reação de árvore

36. **BusinessCapabilityMap**
   - Visualização de mapa de capacidades
   - Implementação: Customizada com D3.js/React e Tailwind

37. **CommitHistoryTimeline**
   - Visualização de histórico de commits com métricas
   - Biblioteca: Recharts (linha do tempo) + componentes customizados
   - Motivo: Visualização de evolução ao longo do tempo

38. **InfrastructureReadinessGauge**
   - Medidor visual de prontidão de infraestrutura
   - Implementação: Customizada com Recharts e Tailwind

39. **EditableExpectationsForm**
   - Interface para edição de expectativas de análise
   - Implementação: Customizada com React Hook Form e Zod

### 2.5 Componentes de Alertas e Notificações (Novo)

40. **AlertSystem**
   - Sistema transversal de alertas e notificações
   - Priorização inteligente de alertas (crítico, importante, informativo)
   - Implementação: Customizada com Zustand e sonner

41. **NotificationCenter**
   - Painel centralizado de notificações
   - Agrupamento por tipo e perspectiva
   - Implementação: Customizada com Tailwind e Headless UI

42. **MetricChangeAlert**
   - Alerta específico para mudanças significativas em métricas
   - Detecção de variações anormais
   - Implementação: Customizada com Recharts e Tailwind

43. **CriticalArtifactAlert**
   - Alerta para presença/ausência de artefatos críticos
   - Implementação: Customizada com Tailwind

### 2.6 Componentes de Rastreabilidade e Comparação (Novo)

44. **LLMTraceabilityPanel**
   - Visualização do raciocínio da IA por trás das expectativas geradas
   - Implementação: Customizada com Tailwind e CodeBlock

45. **ExpectationDiffViewer**
   - Visualização de diferenças entre expectativas automáticas e refinadas
   - Biblioteca: react-diff-viewer
   - Motivo: Visualização clara de diferenças em formato de código

46. **HistoricalComparisonView**
   - Comparação visual entre diferentes pontos no tempo
   - Implementação: Customizada com Recharts e Tailwind

### 2.7 Componentes de Gamificação e Engajamento (Novo)

47. **AchievementBadge**
   - Representação visual de conquistas e marcos
   - Implementação: Customizada com Tailwind e animações

48. **ProgressTracker**
   - Barra de progresso e visualização de jornada
   - Implementação: Customizada com Tailwind

49. **CelebrationOverlay**
   - Animação de celebração para conquistas importantes
   - Biblioteca: react-confetti
   - Motivo: Efeitos visuais atrativos para aumentar engajamento

---

## 3. Páginas / Telas

### 3.1 Tela de Login & Autenticação

**Componentes Principais:**
- Card de autenticação
- Inputs para email/senha
- Botões de ação
- Alertas de erro

**Elementos Principais:**
- Formulário de login
- Opção de "Lembrar de mim"
- Reset de senha
- Alternativa de login com provedor OAuth

### 3.2 Dashboard Principal (Home)

**Componentes Principais:**
- AppShell (layout principal)
- Seletor de projeto
- Cards de resumo por perspectiva
- Gráfico de precisão geral
- Tabela de atividades recentes
- Lista de projetos
- NotificationCenter (novo)
- AlertSystem (novo)

**Elementos Principais:**
- Scores de precisão por perspectiva (com tendências)
- Estatísticas gerais do projeto atual
- Alertas e notificações importantes
- Links rápidos para as principais funcionalidades
- Indicadores de progresso de gamificação (novo)

### 3.3 Dashboard de Engenharia

**Componentes Principais:**
- DataTable de métricas de qualidade
- TreeMap de complexidade de código
- LineChart de evolução de code smells
- FileExplorer com indicadores de qualidade
- Cards de sugestões de refatoração
- MetricChangeAlert (novo)

**Elementos Principais:**
- Filtros por linguagem, diretório, severidade
- Drill-down em arquivos problemáticos
- Visualização temporal de métricas
- Exportação de relatórios
- LLM insights e sugestões
- Comparação histórica de métricas (novo)

### 3.4 Dashboard de Arquitetura

**Componentes Principais:**
- C4ModelViewer interativo
- LayerMapVisualizer
- DependencyGraph
- Cards de padrões de design detectados
- Tabs para diferentes visualizações TOGAF
- ExpectationDiffViewer (novo)

**Elementos Principais:**
- Toggle entre visualizações (C4, dependências, camadas)
- Editor de expectativas de arquitetura
- Filtros por domínio e camada
- Drill-down em componentes
- Visualização de lifecycle
- Rastreabilidade de expectativas (novo)

### 3.5 Dashboard de Infraestrutura

**Componentes Principais:**
- InfrastructureReadinessGauge
- Cards de artefatos detectados
- DataTable de configurações e env vars
- Visualizador de pipeline CI/CD
- Alert cards para issues de segurança
- CriticalArtifactAlert (novo)

**Elementos Principais:**
- Checklist de prontidão para deploy
- Visualização de dependências externas
- Resumo de observabilidade (logging, monitoring)
- Editor de expectativas de infraestrutura
- Relatório de segurança
- Histórico de mudanças em artefatos críticos (novo)

### 3.6 Dashboard de Negócios

**Componentes Principais:**
- BusinessCapabilityMap
- DataTable de matriz de rastreabilidade
- BarChart de cobertura de domínios
- Cards de resumo de módulos por domínio
- HeatMap de zonas sensíveis (GDPR, PII)
- LLMTraceabilityPanel (novo)

**Elementos Principais:**
- Filtros por capacidade e domínio
- Editor de expectativas de negócio
- Drill-down em capacidades específicas
- Visualização de entidades e relacionamentos
- Mapa de processos críticos
- Explicação do raciocínio por trás das expectativas (novo)

### 3.7 Visualização de Análise de Precisão

**Componentes Principais:**
- AccuracyScoreCard para cada perspectiva
- LineChart de evolução de precisão
- EditableExpectationsForm
- Tabela comparativa de expectativas vs. detecção
- Alertas de discrepâncias
- ExpectationDiffViewer (novo)
- LLMTraceabilityPanel (novo)

**Elementos Principais:**
- Editor de expectativas para cada perspectiva
- Visualização de histórico de alterações
- Exportação de relatórios
- Recálculo imediato após alterações
- Sugestões de melhoria
- Explicação do raciocínio da IA (novo)
- Comparação visual de versões de expectativas (novo)

### 3.8 Explorador de Arquivos & Histórico

**Componentes Principais:**
- FileExplorer com estrutura de diretórios
- DataTable de arquivos e métricas
- CommitHistoryTimeline
- CodeBlock para visualização de código
- MetricCards para estatísticas de arquivo
- HistoricalComparisonView (novo)

**Elementos Principais:**
- Navegação por diretório/caminho
- Filtros por tipo de arquivo, autor, data
- Visualização de métricas históricas
- Comparação de versões
- Drill-down em arquivos específicos
- Heatmap de atividade por arquivo
- Comparação direta entre estados históricos (novo)

### 3.9 Configurações & Preferências

**Componentes Principais:**
- Tabs para categorias de configuração
- Forms para preferências
- Toggles para features
- Seletores de temas/visualização

**Elementos Principais:**
- Configurações de usuário/projeto
- Preferências de notificação
- Integração com ferramentas externas
- Personalização de visualizações
- Configurações de alertas e notificações (novo)

### 3.10 Página de Documentação

**Componentes Principais:**
- Sidebar de navegação na documentação
- Cards de exemplos
- CodeBlock para snippets
- Tabs para diferentes seções

**Elementos Principais:**
- Busca na documentação
- Exemplos interativos
- Tutoriais passo-a-passo
- FAQs e troubleshooting

### 3.11 Centro de Notificações e Alertas (Novo)

**Componentes Principais:**
- NotificationCenter
- AlertSystem
- DataTable de histórico de alertas
- Filtros de prioridade e tipo

**Elementos Principais:**
- Lista de notificações ativas
- Histórico de alertas
- Configurações de preferências de notificação
- Ações rápidas para alertas

### 3.12 Painel de Gamificação e Progresso (Novo)

**Componentes Principais:**
- ProgressTracker
- AchievementBadge
- DataTable de conquistas
- CelebrationOverlay

**Elementos Principais:**
- Visualização de progresso geral
- Lista de conquistas e badges
- Próximos marcos a atingir
- Histórico de atividades

---

## 4. Jornadas do Usuário

### 4.1 Jornada de Onboarding

1. **Login / Registro**
   - Autenticação do usuário
   - Configuração inicial de perfil

2. **Seleção de Projeto**
   - Criação ou importação de projeto
   - Configuração de integração com repo Git

3. **Análise Inicial**
   - Visualização de progresso de análise
   - Apresentação de resultados preliminares

4. **Tour Guiado**
   - Introdução às principais funcionalidades
   - Explicação das perspectivas
   - Primeiro badge de conquista (novo)

### 4.2 Jornada de Análise de Engenharia

1. **Visão Geral de Qualidade**
   - Acesso ao dashboard de engenharia
   - Visualização de métricas principais

2. **Exploração de Problemas**
   - Filtragem por severidade/tipo
   - Identificação de arquivos problemáticos

3. **Análise de Arquivo**
   - Visualização de código com problemas
   - Revisão de sugestões de refatoração

4. **Ação de Remediação**
   - Exportação de relatório
   - Marcação para revisão/correção
   - Notificação de mudança significativa (novo)

### 4.3 Jornada de Análise Arquitetural

1. **Identificação de Estilo**
   - Visualização do estilo arquitetural detectado
   - Validação de expectativas

2. **Exploração de Camadas**
   - Navegação pelo modelo C4
   - Análise de responsabilidades

3. **Análise de Dependências**
   - Exploração do grafo de dependências
   - Identificação de problemas de acoplamento

4. **Revisão de Padrões**
   - Análise de padrões de design detectados
   - Verificação de consistência
   - Visualização de raciocínio da IA (novo)

### 4.4 Jornada de DevOps/Infraestrutura

1. **Verificação de Prontidão**
   - Análise de checklist de deployment
   - Identificação de itens faltantes

2. **Revisão de Segurança**
   - Análise de problemas de segurança
   - Verificação de configurações sensíveis

3. **Análise de Observabilidade**
   - Verificação de logs e monitoramento
   - Validação de health checks

4. **Exportação de Plano**
   - Geração de relatório de ações necessárias
   - Priorização de melhorias
   - Alerta para artefatos críticos ausentes (novo)

### 4.5 Jornada de Análise de Negócios

1. **Mapeamento de Capacidades**
   - Visualização de mapa de capacidades
   - Validação de domínios detectados

2. **Revisão de Features**
   - Análise de matriz de rastreabilidade
   - Verificação de cobertura

3. **Análise de Conformidade**
   - Revisão de áreas sensíveis
   - Validação de requisitos regulatórios

4. **Refinamento de Modelo**
   - Ajuste de expectativas de domínio
   - Recálculo de precisão
   - Visualização de diferenças após edição (novo)

### 4.6 Jornada de Análise Histórica

1. **Seleção de Período**
   - Definição de intervalo temporal
   - Filtragem por autor/branch

2. **Exploração de Métricas Temporais**
   - Visualização de tendências de qualidade
   - Análise de evolução arquitetural

3. **Análise de Commits**
   - Revisão de mudanças significativas
   - Correlação com métricas

4. **Comparação de Estados**
   - Análise comparativa entre versões
   - Identificação de regressões
   - Visualização lado a lado de estados (novo)

### 4.7 Jornada de Gamificação (Nova)

1. **Descoberta de Conquistas**
   - Visualização de badges disponíveis
   - Entendimento dos critérios de conquista

2. **Progresso em Jornadas**
   - Acompanhamento de progresso
   - Celebração de marcos atingidos

3. **Compartilhamento de Conquistas**
   - Exportação de badges e conquistas
   - Integração com plataformas externas

4. **Desafios e Próximos Passos**
   - Visualização de próximos desafios
   - Recomendações personalizadas

---

## 5. Especificações de Dashboard

### 5.1 Dashboards com Capacidade de Filtro e Drill-down

Todos os dashboards terão as seguintes capacidades:
 **Filtragem Global**
   - Por diretório/caminho
   - Por data/período
   - Por linguagem de programação
   - Por autor/contribuidor
   - Por tipo de artefato

2. **Capacidades de Drill-down**
   - De visão geral para arquivo específico
   - De componente para código-fonte
   - De métrica agregada para detalhada
   - De domínio para capacidades específicas
   - De camada para componentes

3. **Exportação e Compartilhamento**
   - Exportação em PDF/CSV/JSON
   - Compartilhamento via link
   - Integração com ferramentas de ticket (JIRA, etc.)

4. **Alertas Contextuais** (novo)
   - Notificações baseadas em contexto atual
   - Indicadores visuais de problemas
   - Sugestões proativas de ação

5. **Comparação Histórica** (novo)
   - Seletor de períodos para comparação
   - Visualização lado a lado de estados
   - Indicadores de tendência

### 5.2 Dashboard de Engenharia (Detalhado)

**Layout e Componentes:**
```
+-------------------------------------------------------+
| PageHeader [Título, filtros, ações]                   |
+-------------------------------------------------------+
| [AlertBanner] (novo)                                  |
| Alertas contextuais relevantes para engenharia        |
+-------------------------------------------------------+
| [Grid 1x3]                                            |
| MetricCard | MetricCard | MetricCard                  |
| Code Smells| Complexity | Test Coverage               |
+-------------------------------------------------------+
| [Grid 2x1]                                            |
| LineChart                    | TreeMap                |
| Evolução de Métricas         | Complexidade por Dir   |
+-------------------------------------------------------+
| [TabNav]                                              |
| Problemas | Hotspots | Refatoração | Teste            |
+-------------------------------------------------------+
| [DataTable com tabs ativos]                           |
| Lista de problemas/hotspots com detalhes              |
+-------------------------------------------------------+
| [Panel]                                               |
| Recomendações LLM e insights                          |
+-------------------------------------------------------+
| [HistoricalComparisonView] (novo)                     |
| Comparação de métricas entre períodos                 |
+-------------------------------------------------------+
```

**Interações Específicas:**
- Clique em métrica → Filtra tabela relacionada
- Clique em arquivo na TreeMap → Abre visualização detalhada
- Seleção na linha do tempo → Mostra estado em ponto específico
- TabNav → Alterna entre diferentes aspectos de engenharia
- Hover em problemas → Mostra snippet de código afetado
- Alerta contextual → Expande detalhes e ações recomendadas (novo)
- Seleção de período histórico → Atualiza visualização comparativa (novo)

### 5.3 Dashboard de Arquitetura (Detalhado)

**Layout e Componentes:**
```
+-------------------------------------------------------+
| PageHeader [Título, filtros, perspectiva TOGAF]       |
+-------------------------------------------------------+
| [AlertBanner] (novo)                                  |
| Alertas sobre mudanças arquiteturais significativas   |
+-------------------------------------------------------+
| [Panel]                                               |
| Estilo Arquitetural + Precisão + Ações                |
+-------------------------------------------------------+
| [TabNav]                                              |
| C4 Model | Camadas | Dependências | Padrões | Lifecycle|
+-------------------------------------------------------+
| [Visualização Principal baseada em tab]               |
| C4ModelViewer / LayerMapVisualizer / DependencyGraph |
+-------------------------------------------------------+
| [Grid 1x2]                                            |
| PieChart             | DataTable                      |
| Distribuição Camadas | Principais Componentes         |
+-------------------------------------------------------+
| [ExpectationDiffViewer] (novo)                        |
| Diferenças entre expectativas e detecção              |
+-------------------------------------------------------+
| [Panel]                                               |
| Insights Arquiteturais e Recomendações                |
+-------------------------------------------------------+
| [LLMTraceabilityPanel] (novo)                         |
| Explicação do raciocínio por trás das detecções       |
+-------------------------------------------------------+
```

**Interações Específicas:**
- Zoom e pan em visualizações gráficas
- Clique em nó → Mostra detalhes do componente
- Filtro por camada → Atualiza todas as visualizações
- Toggle de perspectiva TOGAF → Muda classificação de componentes
- Clique em componente na tabela → Centraliza na visualização
- Edição de expectativa → Atualiza diff e recalcula precisão (novo)
- Expansão de raciocínio → Mostra detalhes do processo de inferência (novo)

### 5.4 Especificação de Visualização de Histórico de Arquivos

**Layout e Componentes:**
```
+-------------------------------------------------------+
| PageHeader [Título, filtros de tempo/autor]           |
+-------------------------------------------------------+
| [Grid 3x1]                                            |
| FileExplorer       | CommitHistoryTimeline            |
| Árvore de Diretório| Linha do tempo de commits        |
+-------------------------------------------------------+
| [DataTable]                                           |
| Lista de arquivos com métricas e últimas modificações |
+-------------------------------------------------------+
| [Grid 1x2]                                            |
| CodeBlock        | MetricCharts                       |
| Visualização     | Gráficos de evolução de métricas   |
| de código        | do arquivo selecionado             |
+-------------------------------------------------------+
| [HeatMap]                                             |
| Atividade por arquivo/diretório ao longo do tempo     |
+-------------------------------------------------------+
| [HistoricalComparisonView] (novo)                     |
| Comparação lado a lado de versões do arquivo          |
+-------------------------------------------------------+
```

**Interações Específicas:**
- Seleção de diretório → Filtra arquivos e commits
- Seleção na linha do tempo → Mostra estado em ponto específico
- Clique em arquivo → Mostra código e métricas
- Filtro por autor/tipo → Atualiza todas as visualizações
- Comparação entre datas → Mostra diff visual
- Seleção de múltiplos pontos no tempo → Atualiza comparação histórica (novo)
- Hover em commit → Mostra detalhes e métricas impactadas (novo)

### 5.5 Integração Dashboard/Histórico

Todos os dashboards terão integração com o histórico de arquivos:
- Opções de "Ver histórico" em qualquer arquivo/componente
- Timeline em dashboards principais mostrando eventos significativos
- Capacidade de navegar entre estados históricos da análise
- Comparação de métricas entre períodos
- Correlação de métricas com atividade de commits
- Alertas para mudanças significativas em arquivos críticos (novo)
- Visualização de tendências e previsões baseadas em histórico (novo)

---

## 6. Plano de Implementação

### Fase 1: Founda
- Setup do projeto com Vite, React, TypeScript, TailwindCSS
- Implementação de componentes base (UI)
- Criação de layout principal (AppShell, Sidebar, Header)
- Desenvolvimento de rotas e estrutura de navegação
- Implementação de serviços de autenticação
- **Adição:** Sistema base de alertas e notificações

### Fase 2: Visualizações Core
- Desenvolvimento de componentes de visualização de dados
- Implementação do explorador de arquivos e histórico
- Criação de componentes de tabela e filtros
- Desenvolvimento de gráficos básicos e métricas
- **Adição:** Componentes de comparação histórica

### Fase 3: Dashboards por Perspectiva
- Implementação de dashboard de Engenharia
- Desenvolvimento de dashboard de Arquitetura
- Criação de dashboard de Infraestrutura
- Implementação de dashboard de Negócios
- **Adição:** Integração do sistema de alertas contextuais

### Fase 4: Análise Avançada
- Desenvolvimento de visualizações de precisão
- Implementação de editores de expectativa
- Criação de visualizações avançadas (C4, dependency graphs)
- Desenvolvimento de capacidades de drill-down e filtragem
- **Adição:** Componentes de rastreabilidade de LLM
- **Adição:** Visualizadores de diferenças de expectativas

### Fase 5: Interatividade e Refinamento
- Melhorias de UX e interatividade
- Otimização de performance
- Implementação de exportação e compartilhamento
- Desenvolvimento de tour guiado e onboarding
- Testes de usabilidade e refinamentos finais
- **Adição:** Sistema de gamificação e engajamento
- **Adição:** Refinamento de alertas proativos

### Fase 6: Gamificação e Engajamento (Nova)
- Implementação do sistema de badges e conquistas
- Desenvolvimento de visualizações de progresso
- Criação de celebrações e feedback visual
- Integração com todas as jornadas existentes
- Testes de engajamento e refinamentos

---

## 7. Considerações Finais

Este plano atualizado incorpora as melhorias sugeridas, com foco especial em:

1. **Sistema de Alertas e Notificações Proativas**
   - Componentes dedicados para alertas contextuais
   - Notificações inteligentes baseadas em mudanças significativas
   - Integração transversal em todas as perspectivas

2. **Precisão e Interatividade dos Inputs**
   - Visualizadores de diferenças entre expectativas e detecção
   - Formulários interativos para refinamento de expectativas
   - Feedback visual imediato após alterações

3. **Rastreabilidade e Transparência**
   - Componentes para visualização do raciocínio da IA
   - Explicações detalhadas sobre inferências e detecções
   - Conexão entre código-fonte e conclusões

4. **Gamificação e Engajamento**
   - Sistema de badges e conquistas
   - Visualização de progresso em jornadas
   - Celebrações visuais para marcos importantes

5. **Análise Histórica Avançada**
   - Componentes dedicados para comparação temporal
   - Visualização lado a lado de estados históricos
   - Correlação entre métricas e atividade de desenvolvimento

Estas melhorias garantem uma experiência de usuário mais completa, interativa e engajadora, mantendo o foco nas propostas de valor principais da plataforma.
