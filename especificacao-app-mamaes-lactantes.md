# Especificação — App Mamães Lactantes

## 1. Contexto

Este app é o entregável digital de um infoproduto de nutrição para mães lactantes, da nutricionista **Ákila Samara Castro (CRN/29522)**. Hoje o conteúdo existe em PDF (anexo neste projeto) e será transformado num **aplicativo web** — não vai para loja de apps, mas precisa ser **instalável como PWA** direto do navegador (adicionar à tela inicial), porque uma das abas do próprio app ensina a cliente a fazer isso.

O público é majoritariamente mães no pós-parto, provavelmente acessando pelo celular, muitas vezes com pouco tempo livre e cansadas. O tom do produto deve ser acolhedor, prático e sem julgamento — é sobre alimentação no puerpério, um tema sensível; evite qualquer linguagem que soe como cobrança ou culpa em relação a peso/corpo.

Você (Claude Code) tem **liberdade total sobre a implementação**: stack, biblioteca de componentes, animações, layout exato de cada tela, copy, iconografia, ilustrações. As seções abaixo definem *o quê* e *o porquê*; o *como* é seu. A única coisa que peço explicitamente é: não entregue um visual genérico de app-gerado-por-IA — pense nisso como um produto premium pago, com identidade própria.

## 2. Identidade visual

- **Cor de destaque:** `#C84600`
- **Fonte de títulos:** Inria Serif
- **Fonte de texto/corpo:** Poppins ou Inter (escolha uma das duas e use com consistência em todo o app)
- Construa uma paleta de apoio (neutros, superfícies, estados de sucesso/alerta/bloqueado) que derive harmonicamente da cor de destaque — não é obrigatório ficar só em laranja/terracota, mas a cor de destaque deve estar presente na identidade.
- Evite os clichês visuais mais comuns de design gerado por IA (fundo creme + serifado + accent terracota tipo "look padrão"; dark mode com um único neon; broadsheet com hairlines por toda parte). Use a combinação Inria Serif + Poppins/Inter e a cor #C84600 como ponto de partida para algo que pareça pensado especificamente para este produto — maternidade, nutrição, cuidado, mas sem ser piegas ou clínico demais.
- Vale ter um elemento de assinatura visual (algo memorável e recorrente na interface) desde que faça sentido pro tema.
- Cuide do básico de qualidade: responsivo de verdade até telas pequenas, foco de teclado visível, respeitar `prefers-reduced-motion`.

## 3. Responsividade (requisito de comportamento, não sugestão)

O app muda de padrão de navegação conforme o tamanho de tela:

- **Desktop:** layout tipo "plataforma/área de membros", com **menu lateral fixo**, mostrando ícone + label de cada seção.
- **Tablet e celular:** **menu inferior fixo**, somente ícones (sem label, ou label só no item ativo), organizado como uma **barra deslizável horizontalmente** (scroll horizontal) — são 7 destinos no menu principal, não cabem todos fixos numa tela pequena sem rolagem.

## 4. Arquitetura de informação (abas principais)

7 destinos no menu principal, nesta ordem:

1. **Início**
2. **Cardápio**
3. **Receitas**
4. **Bônus**
5. **Consultorias**
6. **Material Complementar**
7. **Como Baixar o App no Celular**

Não existe aba de "Perfil". O botão de Instagram e o crédito da nutricionista ficam como elementos globais (ver seção 5).

### 4.1 Início

- Saudação/resumo do dia.
- Destaque para a refeição "atual" ou "próxima", com base no horário do dia (café da manhã, almoço, etc. — usar os intervalos de horário que fizerem sentido).
- Lembretes de hidratação: 500ml em jejum e meta de 3 litros por dia (pode ser só informativo, ou um tracker leve — critério seu).
- Botão "Seguir no Instagram" visível.

### 4.2 Cardápio

Tem uma alternância interna (toggle/tabs) entre dois cardápios:

- **Cardápio Padrão** — conteúdo completo, ver Apêndice A para todo o texto extraído do PDF original. Estrutura: Água em jejum → Café da manhã (5 opções) → Lanche da manhã → Almoço → Café da tarde (5 opções) → Jantar (5 opções) → Ceia → Água (meta diária). Onde uma opção referenciar uma receita (ex: "bolo de banana de frigideira"), tem que linkar/apontar para o item correspondente na aba Receitas em vez de duplicar o texto do preparo ali dentro.
- **Cardápio APLV** (Alergia à Proteína do Leite de Vaca) — **estado "Em produção"**: visível no toggle, mas travado/desabilitado, com um badge ou mensagem clara tipo "Em produção — em breve" e sem conteúdo real ainda. Não esconder a opção, só deixar claro que ela existe mas não está disponível.

### 4.3 Receitas

Biblioteca central com as 7 receitas que aparecem no Cardápio Padrão, com ingredientes e modo de preparo passo a passo (texto completo no Apêndice A):

1. Bolo de Banana de Frigideira
2. Lanche Natural
3. Smoothie de Banana e Morango
4. Pão de Queijo de Frigideira
5. Crepioca
6. Caldo de Abóbora
7. Caldo de Abobrinha

### 4.4 Bônus

Guias/materiais bônus do produto (conteúdo em texto/PDF, não gravado):

1. Guia de Saladas Saciantes em 10 Minutos
2. Guia Perdendo Medidas em 20 Passos Sem Dieta Radical

Os arquivos reais (PDFs) serão fornecidos depois — monte a UI com cards/estado pronto para receber um link de download ou visualização, usando por enquanto um placeholder claro de "conteúdo em breve" se não houver arquivo.

### 4.5 Consultorias

Bônus em formato de consultoria **gravada** (vídeo ou áudio):

1. Construindo Metas Que Cabem na Sua Rotina
2. Silenciando a Fome Emocional
3. Quebrando o Ciclo da Autossabotagem

Trate como itens de "aula"/sessão gravada — pense em uma UI adequada pra assistir/ouvir (player embutido, ou link externo, o que fizer mais sentido). Arquivos/links reais virão depois; use placeholder.

### 4.6 Material Complementar

Estes são os **orderbumps** — produtos extras oferecidos no checkout. A lista completa de possíveis itens é:

1. Guia de Doces Fit Que Não Sabotam Seu Emagrecimento
2. Manual Emagrecendo Depois da Amamentação
3. Guia de Lanches Anti-Fome Entre as Mamadas
4. Lista de Compras Sem Perder Tempo no Mercado
5. Marmitas Inteligentes Para Não Cozinhar Todo Dia
6. Combo "leve todos os produtos acima com desconto" — este item 6 não é um material em si, é uma oferta que, se comprada, libera os itens 1–5 juntos.

**Ponto importante:** esta aba deve mostrar **apenas os itens que aquela cliente específica comprou**, não a lista inteira sempre. Como ainda não existe um sistema de login/backend definido, proponha e implemente a forma mais simples e sensata de resolver isso (por exemplo: um arquivo de configuração por cliente/deploy que marca quais itens estão liberados, editável manualmente por vocês a cada venda). Documente no README a forma escolhida e como atualizar isso pra uma nova cliente.

### 4.7 Como Baixar o App no Celular

Não recebi um roteiro específico pra essa aba, então meu palpite é que ela deve ser o tutorial padrão de instalação de PWA — assumindo isso, monte:

- Detecção (ou seleção manual) de sistema: iOS (Safari) vs Android (Chrome), com instruções específicas pra cada um (passo a passo de "adicionar à tela de início").
- Deixe claro o benefício de instalar (acesso rápido, parece um app nativo, funciona com o app fechado como atalho).
- Isso depende de o app estar tecnicamente configurado como PWA de verdade (manifest.json, ícones em vários tamanhos, service worker básico) — trate isso como requisito técnico, não só de conteúdo.

Se esse não for o conteúdo que a cliente (usuária final do app) esperava para essa aba, é só ajustar depois — o importante agora é o app já nascer instalável.

## 5. Elementos globais (fora do menu de abas)

- **Botão "Seguir no Instagram":** fixo/visível globalmente (ex: cabeçalho ou dentro do Início). O link real do Instagram ainda não foi definido — use um placeholder óbvio (ex: `#TODO-instagram-url`) fácil de encontrar e substituir depois.
- **Crédito da nutricionista:** rodapé discreto com "Ákila Samara Castro — Nutricionista — CRN/29522".

## 6. Dados/assets ainda pendentes (marcar como placeholder no código)

- URL real do Instagram.
- Arquivos/links dos Bônus, Consultorias e Material Complementar.
- Conteúdo do Cardápio APLV.
- Logo em alta resolução (o PDF original tem uma marca em formato de ave/fênix estilizada, em tom verde-oliva, que pode servir de referência, mas a nova identidade usa a cor #C84600 como destaque — decida se mantém a ave como símbolo ou propõe algo novo alinhado à nova paleta).

## 7. Requisitos técnicos

- App web instalável como PWA (manifest, ícones, service worker mínimo funcional).
- Não precisa de submissão a loja de apps.
- Stack livre — escolha o que for mais adequado e rápido de manter.
- Prioridade de performance/UX em mobile, já que é o dispositivo mais provável de uso.

---

## Apêndice A — Conteúdo integral do Cardápio Padrão (fonte: PDF original)

Use este texto como fonte de verdade para o conteúdo (o PDF original está disponível apenas como referência visual/de marca, não precisa reabri-lo para extrair texto).

### Água em jejum
Tomar 500 ml de água em jejum.

### Café da manhã

**Opção 1:** 1 ovo inteiro + 2 claras mexidas (feito com um fio de azeite) + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.

**Opção 2:** 2 fatias de pão de forma integral + 30 g de queijo branco + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.

**Opção 3:** 1 bolo de banana de frigideira (ver receita) + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.

**Opção 4:** 2 fatias de pão de forma integral + 1 ovo feito no azeite + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.

**Opção 5:** 60 g de cuscuz + 1 ovo mexido + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.

### Lanche da manhã
1 maçã ou 100 g de uva.

### Almoço
- 50 g de arroz ou purê de batata
- 50 g de feijão
- 120 g de proteína (peito de frango / coxa e sobrecoxa de frango sem pele / moela de frango / carne vermelha sem gordura aparente), em qualquer preparação assada, cozida ou grelhada
- Vegetais à vontade ou 150 g: abóbora cabotiá, abóbora moranga, abóbora paulista, abobrinha italiana, beterraba, cenoura, chuchu, maxixe, pepino, quiabo, tomate, vagem, acelga, agrião, alface, brócolis, chicória, couve, couve-flor, espinafre, manjericão, repolho
- Sobremesa: 1 laranja com bagaço ou 1 mexerica ou kiwi ou 2 rodelas de abacaxi

### Café da tarde

**Opção 1:** 1 pão francês (sem miolo) com 1 ovo (feito com um fio de azeite) + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango.

**Opção 2:** 2 fatias de pão de forma integral + 30 g de queijo branco + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango.

**Opção 3:** 1 lanche natural (ver receita) + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango.

**Opção 4:** 1 smoothie de banana e morango (ver receita).

**Opção 5:** 1 pão de queijo de frigideira (ver receita) + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango.

### Jantar

**Opção 1:** repetir o almoço.

**Opção 2:** crepioca (ver receita).

**Opção 3:** caldo de abóbora (ver receita).

**Opção 4:** caldo de abobrinha (ver receita).

**Opção 5:** 2 fatias de pão de forma integral + 80 g de frango desfiado.

### Ceia
1 xícara de chá de hortelã.

### Água
Tomar 3 litros de água por dia.

---

## Apêndice B — Receitas completas

### Bolo de banana de frigideira (1 porção)
**Ingredientes:** 1 banana madura amassada · 1 ovo · 2 col. sopa de farinha de aveia · 1 col. chá de mel (opcional) · 1/2 colher de fermento em pó químico

**Preparo:** Em um bowl, misture a banana amassada, o ovo, a farinha de aveia e o mel até formar uma massa homogênea. Adicione o fermento por último e misture delicadamente. Aqueça a frigideira em fogo baixo, despeje a massa espalhando em formato de disco grosso, tampe e cozinhe por 4 a 5 minutos de cada lado, até firmar e dourar.

### Lanche natural
**Ingredientes:** 2 fatias de pão de forma integral · recheio: 100 g de frango cozido desfiado, 1/2 xícara de cenoura ralada, 2 col. sopa de milho verde, 2 col. sopa de requeijão cremoso light, 1/2 cebola roxa, cheiro-verde a gosto, sal e temperos naturais a gosto

**Preparo:** Misture o recheio e monte o sanduíche. Pode ser guardado na geladeira por até 3 dias.

### Smoothie de banana e morango
**Ingredientes:** 1 banana madura · 1/2 xícara de morangos · 1/2 xícara de leite desnatado · 1/4 xícara de iogurte natural · 1 col. chá de mel (opcional) · pedras de gelo (opcional)

**Preparo:** Bata tudo no liquidificador até ficar cremoso, por cerca de 1 minuto. Use gelo se quiser a bebida mais gelada.

### Pão de queijo de frigideira
**Ingredientes:** 1 ovo · 2 col. sopa de queijo branco ralado · 1 col. sopa de tapioca · pitada de sal · 2 col. sopa de queijo branco para rechear

**Preparo:** Misture todos os ingredientes com um garfo, coloque numa frigideira antiaderente e deixe dourar dos dois lados. Recheie com o queijo ralado.

### Crepioca
**Ingredientes:** 3 col. sopa de tapioca · 1 ovo · 1 colher de requeijão cremoso light · recheio a gosto (queijo branco e requeijão, ou carne moída, ou frango desfiado)

**Preparo:** Misture bem os três primeiros ingredientes e leve a uma frigideira antiaderente. Doure dos dois lados e recheie.

### Caldo de abóbora
**Ingredientes:** 1 abóbora pequena em cubos · 4 dentes de alho · 1 cebola · sal e temperos naturais a gosto

**Preparo:** Cozinhe a abóbora em água fervente com o alho, a cebola e os temperos até desmanchar. Escorra o excesso de água e amasse na própria panela até virar um creme homogêneo. Ajuste o sal e sirva.

### Caldo de abobrinha
**Ingredientes:** 800 g de abobrinhas verdes em cubos · 2 cebolas pequenas picadas · 15 ml de azeite de oliva · 4 xícaras de água quente · salsinha, sal e temperos a gosto

**Preparo:** Refogue a cebola no azeite até dourar, adicione as abobrinhas e refogue por 3 minutos. Adicione a água quente, tempere e cozinhe por 20 minutos. Bata tudo no liquidificador até formar um creme homogêneo. Sirva polvilhado com salsinha.
