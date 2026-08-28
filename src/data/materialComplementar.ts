export interface ItemDeMaterial {
  id: string;
  titulo: string;
  descricao: string;
  /** URL do PDF/arquivo real. `null` enquanto o material não chega. */
  arquivoUrl: string | null;
}

/**
 * Os 5 orderbumps possíveis (Apêndice, item 6 do documento é o combo — uma oferta de
 * checkout que libera os 5 abaixo juntos, não um material em si; por isso não entra
 * como item de conteúdo aqui). Ver `access.ts` para quais itens aparecem pra cada cliente.
 */
export const MATERIAL_COMPLEMENTAR: ItemDeMaterial[] = [
  {
    id: "doces-fit",
    titulo: "Guia de Doces Fit Que Não Sabotam Seu Emagrecimento",
    descricao: "Receitas de doces mais leves pra matar a vontade sem sair do objetivo.",
    arquivoUrl: null,
  },
  {
    id: "manual-emagrecendo-depois-da-amamentacao",
    titulo: "Manual Emagrecendo Depois da Amamentação",
    descricao: "Um guia completo pra fase de transição, depois que a amamentação começa a diminuir.",
    arquivoUrl: null,
  },
  {
    id: "lanches-anti-fome-entre-as-mamadas",
    titulo: "Guia de Lanches Anti-Fome Entre as Mamadas",
    descricao: "Opções rápidas pra segurar a fome nos intervalos corridos entre uma mamada e outra.",
    arquivoUrl: null,
  },
  {
    id: "lista-de-compras",
    titulo: "Lista de Compras Sem Perder Tempo no Mercado",
    descricao: "Lista pronta, organizada por corredor, pra fazer a compra da semana sem enrolação.",
    arquivoUrl: null,
  },
  {
    id: "marmitas-inteligentes",
    titulo: "Marmitas Inteligentes Para Não Cozinhar Todo Dia",
    descricao: "Estratégias de preparo em lote pra ter comida pronta sem cozinhar todos os dias.",
    arquivoUrl: null,
  },
];
