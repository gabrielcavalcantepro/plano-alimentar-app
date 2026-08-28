# Plano Alimentar Para Lactantes

App web (PWA instalável, sem loja de aplicativos) com o cardápio, as receitas e os
conteúdos de apoio do infoproduto de nutrição para mães lactantes da nutricionista
**Ákila Samara Castro (CRN/29522)**.

Baseado em [`especificacao-app-mamaes-lactantes.md`](./especificacao-app-mamaes-lactantes.md) —
esse arquivo continua sendo a fonte de verdade do produto; este README documenta como o
código implementa o que está lá, e as decisões tomadas onde a especificação deixou em
aberto.

## Stack

- **Vite + React + TypeScript** — SPA pura, sem servidor/backend. Faz sentido aqui porque
  não existe login nem dado dinâmico do lado do servidor: tudo é conteúdo estático
  (cardápio, receitas, textos) definido em arquivos TypeScript.
- **Tailwind CSS v4** (`@tailwindcss/vite`, configuração via `@theme` em `src/index.css`)
  para o design system (cores, tipografia, raios, sombras).
- **React Router (`HashRouter`)** para as 6 abas. Rotas com `#/` de propósito — funciona
  em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, um S3 qualquer) sem
  precisar configurar rewrite de SPA no servidor.
- **`vite-plugin-pwa`** (Workbox) para manifest + service worker.
- **`@fontsource/inria-serif`** e **`@fontsource/poppins`** — fontes auto-hospedadas (não
  via Google Fonts CDN), pra funcionarem também offline uma vez que o service worker
  já tenha feito o cache.
- **`motion`** (sucessora da Framer Motion) só pra uma animação específica: o retângulo
  laranja que indica a aba ativa no menu inferior do celular desliza suavemente entre os
  ícones ao navegar, em vez de pular direto (`layoutId` compartilhado em
  `src/components/layout/BottomNav.tsx`, com fallback instantâneo se
  `prefers-reduced-motion` estiver ativo).

Não há back-end, banco de dados ou autenticação. Ver seção **Material Complementar e
controle de acesso** abaixo para como isso afeta aquela aba especificamente.

## Rodando o projeto

```bash
npm install
npm run dev       # ambiente de desenvolvimento, http://localhost:5173
npm run build     # build de produção em dist/ (tsc -b && vite build)
npm run preview   # serve o build de produção localmente, pra testar o PWA de verdade
```

O manifest e o service worker só ficam "reais" no build de produção
(`npm run build && npm run preview`) — em `npm run dev` o Vite não gera o `sw.js`.
Pra testar a instalação do PWA de verdade, use `npm run preview` (ou publique o build).

## Identidade visual

- **Cor de destaque:** `#C84600`, com uma paleta de apoio derivada dela (`brand-50`
  a `brand-900`), mais três famílias de apoio definidas em `src/index.css`:
  `espresso` (neutros quentes, usados em texto e no menu lateral/inferior escuro),
  `sage` (verde, estados positivos/dicas) e `plum` (tom neutro reservado só pro estado
  "em produção/bloqueado", pra não confundir com alerta de erro).
- **Tipografia:** Inria Serif nos títulos, Poppins no corpo (a especificação permitia
  Poppins ou Inter — Poppins foi escolhida por soar mais acolhedora/arredondada,
  combinando melhor com o tom "cuidado" do produto do que a Inter, mais neutra).
- **Assinatura visual:** um símbolo próprio (folha + gota estilizadas, em
  `src/components/icons/index.tsx` como `BrandMark`, também usado como base do ícone do
  PWA) que aparece no wordmark, no rodapé da barra lateral, no tracker de hidratação
  (`ProgressDrop`) e como acento em pontos-chave da UI. Fugimos de propósito do combo
  "fundo creme + serifado + terracota" mencionado na especificação como clichê: o fundo
  de conteúdo é branco/quase-neutro (não creme), e o menu de navegação (lateral no
  desktop, inferior no mobile) usa um marrom-espresso escuro — um contraste tonal que dá
  ar de "plataforma premium" em vez de página de landing genérica.
- Foco de teclado visível globalmente (`:focus-visible` em `src/index.css`),
  `prefers-reduced-motion` respeitado (reduz todas as transições/animações), modal de
  receita usa `<dialog>` nativo (focus trap e Esc para fechar de graça).

## Estrutura

```
src/
  components/
    layout/     AppShell, SidebarNav (desktop), BottomNav (mobile/tablet), TopBar, Footer
    ui/         Button, Badge, Card, SegmentedControl, AccordionItem, Drawer, EmptyState, ProgressDrop
    cardapio/   MenuParts — renderiza texto do cardápio misturado com links de receita/âncora
    icons/      ícones SVG próprios (sem biblioteca externa) + BrandMark
  data/         cardapio.ts, receitas.ts, bonus.ts, consultorias.ts, materialComplementar.ts, access.ts
  hooks/        useLocalStorage, useHydration, useInstallPrompt, usePrefersReducedMotion
  lib/          time.ts (janelas de refeição), platform.ts (detecção iOS/Android), navigation.ts, dicas.ts, youtube.ts
  pages/        Inicio, Cardapio, Receitas, Bonus (inclui as consultorias), MaterialComplementar, ComoBaixar
design/         fonte do ícone (icon-source.svg) + preview
scripts/        generate-icons.mjs — regenera os PNGs do PWA a partir do design/icon-source.svg
```

## Arquitetura de navegação e responsividade

`AppShell` (`src/components/layout/AppShell.tsx`) decide o layout **por CSS**, não por
JavaScript: `SidebarNav` é `hidden lg:flex` e `BottomNav`/`TopBar` são `lg:hidden`. Isso
evita qualquer "pulo" de layout dependente de JS/media query no primeiro render.

- **Desktop (≥1024px):** menu lateral **fixo** (`lg:fixed lg:inset-y-0`, não rola com a
  página), ícone + label, com o botão do Instagram e o crédito da nutricionista fixados
  embaixo da lista de navegação. O conteúdo à direita (`lg:ml-72` pra compensar a largura
  da sidebar) rola normalmente, independente da barra de navegação.
- **Tablet/celular (<1024px):** barra superior fina (logo + atalho do Instagram) e menu
  inferior fixo com os 6 destinos. Os itens são só ícone, exceto o item ativo (que ganha
  label e um indicador laranja animado atrás do ícone, que desliza suavemente até a nova
  posição a cada navegação). A barra é uma lista com `overflow-x-auto` + `scroll-snap`,
  pronta pra rolar horizontalmente se algum dia os ícones não couberem mais numa tela
  pequena.

## Conteúdo (Cardápio e Receitas)

Todo o texto do Cardápio Padrão e das 7 receitas vem literalmente do Apêndice A e B da
especificação, estruturado em `src/data/cardapio.ts` e `src/data/receitas.ts`. Quando uma
opção do cardápio menciona uma receita (ex.: "bolo de banana de frigideira"), o dado
guarda uma referência (`{ tipo: "receita", receitaId, rotulo }`) em vez de duplicar o
texto de preparo — `MenuParts` renderiza isso como um link que abre a receita
correspondente (`/#/receitas/:id`) num modal, sem sair do cardápio. O texto de preparo de
cada receita foi quebrado em passos numerados a partir do parágrafo corrido do PDF
original, preservando o conteúdo, só reformatando pra "passo a passo" como pedido.

O **Cardápio APLV** existe no toggle, mas sem conteúdo: mostra um estado bloqueado com o
badge "Em produção — em breve" (`src/pages/Cardapio.tsx`). Quando o conteúdo real
existir, é só adicionar um `CARDAPIO_APLV` em `cardapio.ts` no mesmo formato do
`CARDAPIO_PADRAO` e trocar o `EmptyState` pela mesma renderização usada no cardápio
padrão.

## Bônus (guias + consultorias) e Material Complementar

**Consultorias vive dentro da aba Bônus**, não como aba própria: por pedido explícito
(menos ícones na barra do celular, e as consultorias "são bônus mesmo"), a página
`src/pages/Bonus.tsx` renderiza os itens de `src/data/bonus.ts` (os 2 guias em PDF) e de
`src/data/consultorias.ts` (as 3 consultorias gravadas) juntos, no mesmo estilo de card.
A rota antiga `/consultorias` redireciona pra `/bonus` (em `App.tsx`), caso algum link
antigo aponte pra ela.

- **Guias (PDF):** cada item tem `arquivoUrl: null` até o PDF real existir (ver seção
  **PDFs dos guias de Bônus** abaixo). Quando preenchido, o card troca o badge
  "Conteúdo em breve" por um botão "Abrir guia" que abre o PDF numa nova aba.
- **Consultorias (vídeo):** cada item em `consultorias.ts` tem `tipo: "youtube" | "externo"`.
  - `"youtube"`: o botão "Assistir agora" abre um modal com o vídeo **embutido no próprio
    app** (`src/lib/youtube.ts` converte o link `youtu.be/...` pra uma URL de embed do
    `youtube-nocookie.com`). Hoje é o caso de "Silenciando a Fome Emocional" e "Quebrando
    o Ciclo da Autossabotagem".
  - `"externo"`: o botão "Assistir no Google Drive" só abre o link numa nova aba, sem
    tentar embutir (um vídeo do Drive não embuta de forma confiável). É o caso de
    "Construindo Metas Que Cabem na Sua Rotina".

**Material Complementar** segue com a mesma lógica de placeholder: cada item em
`src/data/materialComplementar.ts` tem `arquivoUrl: null` até o PDF existir, e o card
mostra "Conteúdo em breve" enquanto isso.

Não é preciso mexer em nenhum componente pra ligar um conteúdo real — só editar os
arquivos de dados.

## PDFs dos guias de Bônus

Os 2 guias (Saladas Saciantes, Perdendo Medidas) ainda não têm PDF real. Criamos
[`content/bonus/`](./content/bonus/) como pasta de rascunho pra receber os arquivos:
suba `guia-saladas-saciantes.pdf` e `guia-perdendo-medidas.pdf` lá (nomes exatos, ver o
`LEIA-ME.md` dentro da pasta) e peça pra processar. A partir disso: o conteúdo do PDF é
lido pra ajustar a descrição de cada card em `bonus.ts` pro texto real (hoje é só um
resumo de exemplo), o arquivo final vai pra `public/bonus/`, e `arquivoUrl` passa a
apontar pra lá, o que já liga o botão "Abrir guia" sozinho.

## Material Complementar e controle de acesso (sem login)

Essa aba são os orderbumps: só deveriam aparecer os itens que aquela cliente comprou.
Como não existe login/backend, a solução adotada foi a mais simples possível dado o
volume atual: **um arquivo de configuração estático**, `src/data/access.ts`, que decide
quais `id`s de `materialComplementar.ts` aparecem.

**Estado atual:** `UNLOCKED_ITEM_IDS = "all"` — todo mundo que abrir o app vê os 5
itens. Essa foi uma decisão explícita pra fase atual do produto (poucas vendas,
controle manual ainda é razoável), não o modelo pensado pra quando houver muitas
clientes com combinações de compra diferentes.

**Quando for necessário restringir por cliente:**

1. Edite `UNLOCKED_ITEM_IDS` em `src/data/access.ts` pra um array com os `id`s
   liberados (os `id`s estão em `materialComplementar.ts`), por exemplo:
   ```ts
   export const UNLOCKED_ITEM_IDS: string[] | "all" = ["lista-de-compras", "marmitas-inteligentes"];
   ```
2. Gere um build (`npm run build`) e publique numa URL própria pra essa cliente
   (ou grupo de clientes com a mesma combinação de compra).

Ou seja: hoje é **um app, uma configuração, todo mundo vê tudo**; o caminho de migração
natural pra várias clientes com acessos diferentes é **um build por combinação de
compra** (cada cliente ou grupo recebe seu link). Isso funciona bem em baixo volume, mas
não escala pra centenas de clientes individuais — quando chegar nesse ponto, o próximo
passo é um backend mínimo (mesmo que só uma função serverless + planilha) que resolva o
acesso por e-mail/código de compra em vez de por build. Optamos por não construir esse
backend agora porque a especificação pede a solução mais simples possível dado que login
ainda não existe — não fazia sentido introduzir infraestrutura de servidor só pra essa
tela.

O item 6 do Apêndice ("combo, leve todos com desconto") não é um material de conteúdo —
é uma oferta de checkout. Por isso ele não aparece em `materialComplementar.ts`; quem
compra o combo simplesmente recebe um build com os 5 ids liberados.

## PWA

- **Manifest:** gerado por `vite-plugin-pwa` a partir da config em `vite.config.ts`
  (nome, cores, ícones, `display: "standalone"`).
- **Ícones:** `design/icon-source.svg` é a arte-fonte (a mesma marca folha/gota da
  identidade visual). `scripts/generate-icons.mjs` usa `sharp` pra gerar todos os
  tamanhos em `public/icons/` (192, 512, 512 maskable, apple-touch-icon). Pra trocar o
  ícone (ex.: quando a nutricionista aprovar uma logo definitiva), edite o SVG e rode:
  ```bash
  node scripts/generate-icons.mjs
  ```
- **Service worker:** autogerado pelo Workbox (`registerType: "autoUpdate"`), faz cache
  de todo o app (JS/CSS/HTML/fontes/ícones) — o app funciona offline depois da primeira
  visita, o que é relevante pro público (mães usando com conexão instável).
- A aba **"Como Baixar o App no Celular"** (`src/pages/ComoBaixar.tsx`) detecta iOS vs.
  Android pelo user agent (com opção de trocar manualmente), mostra o passo a passo de
  instalação específico de cada um, e usa o evento `beforeinstallprompt` pra oferecer um
  botão "Instalar agora" de verdade quando o navegador suporta (Chrome/Edge/Android — no
  iOS a instalação é sempre manual, é limitação do Safari).

## Notificações de refeição

Na primeira visita (depois do onboarding do nome), a tela Início mostra um convite pra
ativar lembretes: "Ativar lembretes de refeição", com um botão que pede a permissão de
notificação do navegador (`src/pages/Inicio.tsx`, componente `NotificacoesOnboarding`).
Se a cliente recusar ou fechar, não pergunta de novo (fica salvo em `localStorage`).

**Sobre "cliquei e não abriu nada":** isso já aconteceu em teste no Chrome desktop e não
é bug — verificamos com o navegador de verdade que `Notification.requestPermission()` é
chamado corretamente (com o clique do usuário preservado). O que acontece é que o Chrome
atual, por padrão, não abre mais aquele pop-up grande pra pedir permissão de notificação:
ele só mostra um ícone discreto perto do endereço do site (um sino ou cadeado, no topo),
e o pedido fica parado ali até alguém clicar nesse ícone e escolher "Permitir". Isso é
uma política do navegador, não tem como o app forçar o pop-up antigo de volta. Por isso o
botão "Ativar notificações" mostra, depois do clique, um aviso ensinando a cliente a
procurar esse ícone — ver `pedidoFeito` em `NotificacoesOnboarding` (`Inicio.tsx`).

Com a permissão concedida, `src/lib/notifications.ts` agenda, pra cada janela de
refeição que ainda não passou hoje (`MEAL_WINDOWS` em `src/lib/time.ts`), um
`setTimeout` que dispara uma notificação no horário de início daquela refeição, com o
título certo (ex.: "Hora do almoço") e um resumo tirado do próprio cardápio
(`getSecaoTeaser`). A notificação usa `ServiceWorkerRegistration.showNotification()` (não
o construtor `new Notification()`) porque é o único jeito que funciona de forma
confiável no Chrome Android, a plataforma mais provável de uso. O reagendamento roda de
novo a cada 30 minutos e sempre que a aba volta a ficar visível
(`src/hooks/useMealNotifications.ts`, chamado uma vez em `AppShell.tsx`), então o
dia seguinte também fica coberto sem precisar recarregar a página. A janela "Água em
jejum" (04:30) fica de fora de propósito — é cedo demais pra mandar notificação sem
pedir.

**Limitação importante, pra não prometer mais do que o app entrega:** como este é um
app sem servidor, essas notificações só disparam enquanto o navegador/PWA está aberto ou
recém-minimizado (é assim que `setTimeout` e o service worker funcionam sem um backend
de push). Não é o mesmo que notificação por push de verdade, que continua chegando com o
app completamente fechado ou o celular travado — isso exigiria um servidor de push (Web
Push com VAPID) mandando mensagens pra cada dispositivo inscrito, o que está fora do
escopo de "sem backend" deste projeto. Se isso virar um requisito mais forte no futuro, o
caminho é montar esse servidor de push (pode ser uma função serverless simples) e trocar
o agendamento local por assinaturas reais de push.

## Placeholders pendentes

- **PDFs dos 2 guias de Bônus** — ver seção **PDFs dos guias de Bônus** acima.
- **Arquivos do Material Complementar** — mesma lógica dos guias de Bônus, em
  `src/data/materialComplementar.ts` (`arquivoUrl`).
- **Conteúdo do Cardápio APLV** — toggle existe, sem conteúdo (ver seção específica acima).
- **Logo em alta resolução** — a especificação perguntava se deveríamos manter a ave/fênix
  do material original (verde-oliva) ou propor algo novo alinhado à nova paleta.
  Optamos por uma marca nova (folha/gota, em `#C84600`/creme) porque a ave em verde-oliva
  não conversava com a nova identidade em terracota — mas é só um ponto de partida:
  `design/icon-source.svg` é fácil de substituir por uma logo definitiva se a
  nutricionista preferir manter a referência da ave.

Já resolvidos numa rodada anterior de ajustes: URL real do Instagram, e os 3 links de
consultoria (2 do YouTube embutidos no app, 1 do Google Drive como link externo) — ver
seção **Bônus** acima.

## Decisões que vale registrar

- **Nome do produto:** a especificação não define um nome pro app (só o nome da
  nutricionista). Foi definido como **"Plano Alimentar Para Lactantes"** (usado no
  manifest, no wordmark e no título da aba).
- **Roteador com `HashRouter`:** escolhido em vez de `BrowserRouter` porque o app pode
  ser publicado em hospedagens estáticas simples sem configuração de rewrite de SPA —
  com hash, qualquer servidor estático funciona sem configuração extra.
- **Nome da cliente (Início):** a saudação da Home pode usar o primeiro nome da pessoa,
  perguntado uma vez (opcional, sem obrigatoriedade) e guardado só em `localStorage` do
  aparelho — não é enviado a lugar nenhum, é só personalização local.
- **Tracker de hidratação:** a especificação permitia algo "só informativo ou tracker
  leve" — foi implementado como tracker leve (mais um toque de produto premium do que
  texto estático), salvo em `localStorage` por dia, sem nenhuma coleta de dado real. O
  card tem título e instrução curta explicando o que é e como usar, e o desenho que
  enche é uma gota d'água literal (`WATER_DROP_PATH` em `src/components/icons/index.tsx`),
  separada do símbolo folha/gota usado no resto da marca, justamente pra não deixar
  ambíguo o que ela representa.
- **Travessões:** removidos de todo texto visível na interface (títulos, descrições,
  badges, rodapé), a pedido explícito. Onde fazia sentido, viraram ponto final, vírgula,
  dois-pontos ou ponto médio (`·`) — comentários de código não foram tocados, por não
  serem texto exibido ao usuário.
