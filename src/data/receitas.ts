export interface Receita {
  id: string;
  titulo: string;
  porcao: string;
  tempoPreparo: string;
  ingredientes: string[];
  modoDePreparo: string[];
}

export const RECEITAS: Receita[] = [
  {
    id: "bolo-banana-frigideira",
    titulo: "Bolo de Banana de Frigideira",
    porcao: "1 porção",
    tempoPreparo: "~15 min",
    ingredientes: [
      "1 banana madura amassada",
      "1 ovo",
      "2 colheres de sopa de farinha de aveia",
      "1 colher de chá de mel (opcional)",
      "1/2 colher de fermento em pó químico",
    ],
    modoDePreparo: [
      "Em um bowl, misture a banana amassada, o ovo, a farinha de aveia e o mel até formar uma massa homogênea.",
      "Adicione o fermento por último e misture delicadamente.",
      "Aqueça a frigideira em fogo baixo e despeje a massa, espalhando em formato de disco grosso.",
      "Tampe e cozinhe por 4 a 5 minutos de cada lado, até firmar e dourar.",
    ],
  },
  {
    id: "lanche-natural",
    titulo: "Lanche Natural",
    porcao: "1 porção",
    tempoPreparo: "~10 min",
    ingredientes: [
      "2 fatias de pão de forma integral",
      "100 g de frango cozido desfiado",
      "1/2 xícara de cenoura ralada",
      "2 colheres de sopa de milho verde",
      "2 colheres de sopa de requeijão cremoso light",
      "1/2 cebola roxa",
      "Cheiro-verde a gosto",
      "Sal e temperos naturais a gosto",
    ],
    modoDePreparo: [
      "Misture bem todos os ingredientes do recheio.",
      "Monte o sanduíche com as fatias de pão.",
      "Pode ser guardado na geladeira por até 3 dias, ótimo para adiantar.",
    ],
  },
  {
    id: "smoothie-banana-morango",
    titulo: "Smoothie de Banana e Morango",
    porcao: "1 porção",
    tempoPreparo: "~5 min",
    ingredientes: [
      "1 banana madura",
      "1/2 xícara de morangos",
      "1/2 xícara de leite desnatado",
      "1/4 xícara de iogurte natural",
      "1 colher de chá de mel (opcional)",
      "Pedras de gelo (opcional)",
    ],
    modoDePreparo: [
      "Bata todos os ingredientes no liquidificador até ficar cremoso, por cerca de 1 minuto.",
      "Use gelo se quiser a bebida mais gelada.",
    ],
  },
  {
    id: "pao-de-queijo-frigideira",
    titulo: "Pão de Queijo de Frigideira",
    porcao: "1 porção",
    tempoPreparo: "~10 min",
    ingredientes: [
      "1 ovo",
      "2 colheres de sopa de queijo branco ralado",
      "1 colher de sopa de tapioca",
      "Pitada de sal",
      "2 colheres de sopa de queijo branco para rechear",
    ],
    modoDePreparo: [
      "Misture o ovo, o queijo ralado, a tapioca e o sal com um garfo.",
      "Coloque na frigideira antiaderente e deixe dourar dos dois lados.",
      "Recheie com o queijo ralado reservado.",
    ],
  },
  {
    id: "crepioca",
    titulo: "Crepioca",
    porcao: "1 porção",
    tempoPreparo: "~10 min",
    ingredientes: [
      "3 colheres de sopa de tapioca",
      "1 ovo",
      "1 colher de requeijão cremoso light",
      "Recheio a gosto (queijo branco e requeijão, ou carne moída, ou frango desfiado)",
    ],
    modoDePreparo: [
      "Misture bem a tapioca, o ovo e o requeijão.",
      "Leve à frigideira antiaderente e doure dos dois lados.",
      "Recheie a gosto.",
    ],
  },
  {
    id: "caldo-de-abobora",
    titulo: "Caldo de Abóbora",
    porcao: "2 a 3 porções",
    tempoPreparo: "~25 min",
    ingredientes: [
      "1 abóbora pequena em cubos",
      "4 dentes de alho",
      "1 cebola",
      "Sal e temperos naturais a gosto",
    ],
    modoDePreparo: [
      "Cozinhe a abóbora em água fervente com o alho, a cebola e os temperos até desmanchar.",
      "Escorra o excesso de água e amasse na própria panela até virar um creme homogêneo.",
      "Ajuste o sal e sirva.",
    ],
  },
  {
    id: "caldo-de-abobrinha",
    titulo: "Caldo de Abobrinha",
    porcao: "3 a 4 porções",
    tempoPreparo: "~30 min",
    ingredientes: [
      "800 g de abobrinhas verdes em cubos",
      "2 cebolas pequenas picadas",
      "15 ml de azeite de oliva",
      "4 xícaras de água quente",
      "Salsinha, sal e temperos a gosto",
    ],
    modoDePreparo: [
      "Refogue a cebola no azeite até dourar.",
      "Adicione as abobrinhas e refogue por 3 minutos.",
      "Adicione a água quente, tempere e cozinhe por 20 minutos.",
      "Bata tudo no liquidificador até formar um creme homogêneo.",
      "Sirva polvilhado com salsinha.",
    ],
  },
];

export function getReceitaById(id: string | undefined): Receita | undefined {
  if (!id) return undefined;
  return RECEITAS.find((r) => r.id === id);
}
