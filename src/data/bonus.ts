export interface ItemDeBonus {
  id: string;
  titulo: string;
  descricao: string;
  /** URL do PDF/arquivo real. `null` enquanto o material não chega. */
  arquivoUrl: string | null;
}

export const BONUS: ItemDeBonus[] = [
  {
    id: "guia-saladas-saciantes",
    titulo: "Guia de Saladas Saciantes em 10 Minutos",
    descricao:
      "Combinações rápidas de saladas que rendem e saciam, pensadas pra rotina corrida do puerpério.",
    arquivoUrl: null,
  },
  {
    id: "guia-perdendo-medidas",
    titulo: "Guia Perdendo Medidas em 20 Passos Sem Dieta Radical",
    descricao:
      "Passos práticos e graduais para quem quer resultado no seu tempo, sem restrição extrema.",
    arquivoUrl: null,
  },
];
