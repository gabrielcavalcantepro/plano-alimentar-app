# Onde colocar os PDFs dos Bônus

Coloque os arquivos reais dos dois guias aqui, com estes nomes exatos:

- `guia-saladas-saciantes.pdf` → Guia de Saladas Saciantes em 10 Minutos
- `guia-perdendo-medidas.pdf` → Guia Perdendo Medidas em 20 Passos Sem Dieta Radical

Depois de colocar os arquivos aqui, é só pedir pra eu processar: eu leio o conteúdo de
cada PDF, ajusto a descrição de cada card em [`src/data/bonus.ts`](../../src/data/bonus.ts)
pra refletir o conteúdo real (hoje é só um texto de exemplo), copio o arquivo pra
`public/bonus/<nome>.pdf` (assim ele fica disponível pra download direto pelo app) e
preencho `arquivoUrl` em `bonus.ts` apontando pra lá. O botão "Abrir guia" no app passa a
funcionar sozinho assim que isso for feito, sem precisar mexer em mais nada.

Essa pasta (`content/bonus/`) é só uma área de rascunho/intake, não é servida pelo app.
`public/bonus/` (criada só quando os arquivos finais forem processados) é que vira o link
público de download.
