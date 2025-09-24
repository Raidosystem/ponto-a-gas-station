# PONTO A - Posto e Conveniência

Site profissional moderno para posto de combustível com conveniência integrada, focado em experiência premium e vendas diretas via WhatsApp.

**Experience Qualities**:
1. **Premium** - Sensação de qualidade superior e confiabilidade, elevando a percepção da marca acima de postos convencionais
2. **Eficiente** - Navegação intuitiva que permite encontrar produtos e fazer pedidos rapidamente via WhatsApp
3. **Acolhedor** - Interface calorosa que transmite hospitalidade e cuidado com o cliente

**Complexity Level**: Light Application (multiple features with basic state)
- Múltiplas categorias de produtos, galeria visual, integração WhatsApp e informações do posto, mas sem necessidade de contas de usuário ou sistemas complexos

## Essential Features

**Vitrine de Combustíveis**
- Functionality: Exibe tipos de combustível disponíveis com preços atualizados
- Purpose: Transparência de preços e atração de clientes
- Trigger: Visualização imediata na página inicial
- Progression: Visualização dos tipos → Verificação de preços → Ação via WhatsApp para abastecimento
- Success criteria: Preços claros e botão WhatsApp funcional para consultas

**Catálogo de Conveniência**
- Functionality: Showcase visual dos produtos da conveniência organizados por categorias
- Purpose: Impulsionar vendas da conveniência e facilitar pedidos remotos
- Trigger: Navegação por categorias ou busca
- Progression: Seleção da categoria → Visualização dos produtos → Seleção do item → Pedido via WhatsApp
- Success criteria: Produtos organizados, imagens atrativas e integração WhatsApp seamless

**Integração WhatsApp Inteligente**
- Functionality: Botões contextuais que enviam mensagens pré-formatadas para diferentes tipos de pedido
- Purpose: Facilitar vendas e atendimento personalizado
- Trigger: Clique em qualquer botão de ação (combustível, produto, contato)
- Progression: Clique no botão → Abertura do WhatsApp → Mensagem pré-preenchida → Finalização manual pelo cliente
- Success criteria: Mensagens contextuais bem formatadas e abertura correta do WhatsApp

**Informações do Posto**
- Functionality: Localização, horários, serviços adicionais e contatos
- Purpose: Facilitar visitas físicas e comunicação
- Trigger: Seção dedicada na página ou footer
- Progression: Consulta de informações → Decisão de visita ou contato → Ação
- Success criteria: Informações sempre atualizadas e facilmente acessíveis

## Edge Case Handling
- **Produtos Indisponíveis**: Indicação visual clara e remoção temporária do catálogo
- **WhatsApp não Instalado**: Fallback para versão web do WhatsApp
- **Imagens não Carregadas**: Placeholders elegantes com nome do produto
- **Preços Desatualizados**: Disclaimer sobre confirmação de preços via WhatsApp

## Design Direction
O design deve evocar modernidade premium e confiabilidade, misturando a praticidade urbana com acolhimento familiar. Interface rica em detalhes visuais que demonstre qualidade superior.

## Color Selection
Triadic (três cores equilibradas) - Combinação sofisticada que transmite energia, confiança e premium.

- **Primary Color**: Azul Profissional (oklch(0.45 0.15 240)) - Transmite confiança e profissionalismo
- **Secondary Colors**: Laranja Energético (oklch(0.65 0.18 45)) para destaque e calls-to-action, Verde Sutil (oklch(0.55 0.12 140)) para indicações de disponibilidade
- **Accent Color**: Dourado Premium (oklch(0.75 0.12 85)) - Para elementos VIP e promoções especiais
- **Foreground/Background Pairings**: 
  - Background Claro (oklch(0.98 0.01 240)): Texto Principal (oklch(0.15 0.02 240)) - Ratio 14.2:1 ✓
  - Primary Azul (oklch(0.45 0.15 240)): Texto Branco (oklch(0.98 0.01 0)) - Ratio 8.1:1 ✓
  - Secondary Laranja (oklch(0.65 0.18 45)): Texto Branco (oklch(0.98 0.01 0)) - Ratio 4.8:1 ✓
  - Accent Dourado (oklch(0.75 0.12 85)): Texto Escuro (oklch(0.15 0.02 240)) - Ratio 5.9:1 ✓

## Font Selection
Tipografia que balance modernidade com legibilidade, transmitindo profissionalismo sem ser corporativa demais.

- **Typographic Hierarchy**: 
  - H1 (Nome do Posto): Inter Bold/32px/tight letter spacing
  - H2 (Seções): Inter SemiBold/24px/normal spacing
  - H3 (Categorias): Inter Medium/18px/normal spacing
  - Body (Descrições): Inter Regular/16px/relaxed line height
  - Buttons (CTAs): Inter Medium/14px/wide letter spacing

## Animations
Animações sutis e propositais que reforcem a sensação premium sem comprometer a velocidade, priorizando micro-interações que surpreendam positivamente.

- **Purposeful Meaning**: Hover effects em cards que simulam elevação física, transições suaves que guiam o olhar
- **Hierarchy of Movement**: Cards de produtos têm animações mais elaboradas, botões WhatsApp pulsam sutilmente, elementos informativos são mais estáticos

## Component Selection
- **Components**: Cards customizados para produtos, Dialogs para detalhes, Buttons com variantes para WhatsApp, Tabs para categorias, Badge para preços
- **Customizations**: Cards com glass-morphism effect, botões WhatsApp com ícone integrado, grid responsivo para produtos
- **States**: Hover com elevação em cards, loading states para preços, badges de "disponível/indisponível"
- **Icon Selection**: Phosphor icons - Fuel para combustíveis, ShoppingCart para conveniência, WhatsappLogo para CTAs, MapPin para localização
- **Spacing**: Sistema 4px base (gap-4, p-6, m-8) com espaçamento generoso para sensação premium
- **Mobile**: Grid adaptativo, navigation tabs horizontais, cards empilhados com swipe gestures para categorias