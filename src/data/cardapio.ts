import type { MealWindowId } from "../lib/time";

export type ParteDeTexto =
  | { tipo: "texto"; valor: string }
  | { tipo: "receita"; receitaId: string; rotulo: string }
  | { tipo: "ancora"; secaoId: string; rotulo: string };

export interface OpcaoDeRefeicao {
  rotulo: string;
  partes: ParteDeTexto[];
}

export interface ItemDeLista {
  rotulo: string;
  partes: ParteDeTexto[];
}

export type SecaoDoCardapio =
  | { id: string; mealWindowId?: MealWindowId; titulo: string; tipo: "simples"; partes: ParteDeTexto[] }
  | { id: string; mealWindowId?: MealWindowId; titulo: string; tipo: "opcoes"; opcoes: OpcaoDeRefeicao[] }
  | { id: string; mealWindowId?: MealWindowId; titulo: string; tipo: "lista"; itens: ItemDeLista[] };

const t = (valor: string): ParteDeTexto => ({ tipo: "texto", valor });
const receita = (receitaId: string, rotulo: string): ParteDeTexto => ({
  tipo: "receita",
  receitaId,
  rotulo,
});
const ancora = (secaoId: string, rotulo: string): ParteDeTexto => ({
  tipo: "ancora",
  secaoId,
  rotulo,
});

export const CARDAPIO_PADRAO: SecaoDoCardapio[] = [
  {
    id: "agua-jejum",
    mealWindowId: "agua-jejum",
    titulo: "Água em jejum",
    tipo: "simples",
    partes: [t("Tomar 500 ml de água em jejum.")],
  },
  {
    id: "cafe-da-manha",
    mealWindowId: "cafe-da-manha",
    titulo: "Café da manhã",
    tipo: "opcoes",
    opcoes: [
      {
        rotulo: "Opção 1",
        partes: [
          t(
            "1 ovo inteiro + 2 claras mexidas (feito com um fio de azeite) + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.",
          ),
        ],
      },
      {
        rotulo: "Opção 2",
        partes: [
          t(
            "2 fatias de pão de forma integral + 30 g de queijo branco + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.",
          ),
        ],
      },
      {
        rotulo: "Opção 3",
        partes: [
          t("1 "),
          receita("bolo-banana-frigideira", "bolo de banana de frigideira"),
          t(
            " + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.",
          ),
        ],
      },
      {
        rotulo: "Opção 4",
        partes: [
          t(
            "2 fatias de pão de forma integral + 1 ovo feito no azeite + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.",
          ),
        ],
      },
      {
        rotulo: "Opção 5",
        partes: [
          t(
            "60 g de cuscuz + 1 ovo mexido + 1 xícara de café sem açúcar ou chá de erva doce sem açúcar + 170 g de mamão ou melão + 1 colher de sopa de aveia em flocos.",
          ),
        ],
      },
    ],
  },
  {
    id: "lanche-da-manha",
    mealWindowId: "lanche-da-manha",
    titulo: "Lanche da manhã",
    tipo: "simples",
    partes: [t("1 maçã ou 100 g de uva.")],
  },
  {
    id: "almoco",
    mealWindowId: "almoco",
    titulo: "Almoço",
    tipo: "lista",
    itens: [
      { rotulo: "Carboidrato", partes: [t("50 g de arroz ou purê de batata")] },
      { rotulo: "Leguminosa", partes: [t("50 g de feijão")] },
      {
        rotulo: "Proteína",
        partes: [
          t(
            "120 g (peito de frango / coxa e sobrecoxa de frango sem pele / moela de frango / carne vermelha sem gordura aparente), assada, cozida ou grelhada",
          ),
        ],
      },
      {
        rotulo: "Vegetais",
        partes: [
          t(
            "à vontade ou 150 g: abóbora cabotiá, abóbora moranga, abóbora paulista, abobrinha italiana, beterraba, cenoura, chuchu, maxixe, pepino, quiabo, tomate, vagem, acelga, agrião, alface, brócolis, chicória, couve, couve-flor, espinafre, manjericão ou repolho",
          ),
        ],
      },
      {
        rotulo: "Sobremesa",
        partes: [t("1 laranja com bagaço ou 1 mexerica ou kiwi ou 2 rodelas de abacaxi")],
      },
    ],
  },
  {
    id: "cafe-da-tarde",
    mealWindowId: "cafe-da-tarde",
    titulo: "Café da tarde",
    tipo: "opcoes",
    opcoes: [
      {
        rotulo: "Opção 1",
        partes: [
          t(
            "1 pão francês (sem miolo) com 1 ovo (feito com um fio de azeite) + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango.",
          ),
        ],
      },
      {
        rotulo: "Opção 2",
        partes: [
          t(
            "2 fatias de pão de forma integral + 30 g de queijo branco + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango.",
          ),
        ],
      },
      {
        rotulo: "Opção 3",
        partes: [
          t("1 "),
          receita("lanche-natural", "lanche natural"),
          t(" + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango."),
        ],
      },
      {
        rotulo: "Opção 4",
        partes: [t("1 "), receita("smoothie-banana-morango", "smoothie de banana e morango"), t(".")],
      },
      {
        rotulo: "Opção 5",
        partes: [
          t("1 "),
          receita("pao-de-queijo-frigideira", "pão de queijo de frigideira"),
          t(" + 1 xícara de chá de cidreira sem açúcar + 200 g de uva, melancia, melão ou morango."),
        ],
      },
    ],
  },
  {
    id: "jantar",
    mealWindowId: "jantar",
    titulo: "Jantar",
    tipo: "opcoes",
    opcoes: [
      {
        rotulo: "Opção 1",
        partes: [t("Repetir o "), ancora("almoco", "almoço"), t(".")],
      },
      { rotulo: "Opção 2", partes: [receita("crepioca", "Crepioca"), t(".")] },
      { rotulo: "Opção 3", partes: [receita("caldo-de-abobora", "Caldo de abóbora"), t(".")] },
      { rotulo: "Opção 4", partes: [receita("caldo-de-abobrinha", "Caldo de abobrinha"), t(".")] },
      {
        rotulo: "Opção 5",
        partes: [t("2 fatias de pão de forma integral + 80 g de frango desfiado.")],
      },
    ],
  },
  {
    id: "ceia",
    mealWindowId: "ceia",
    titulo: "Ceia",
    tipo: "simples",
    partes: [t("1 xícara de chá de hortelã.")],
  },
  {
    id: "agua-meta",
    titulo: "Meta diária de água",
    tipo: "simples",
    partes: [t("Tomar 3 litros de água por dia.")],
  },
];

export function getSecaoById(id: string): SecaoDoCardapio | undefined {
  return CARDAPIO_PADRAO.find((secao) => secao.id === id);
}

export function getSecaoTeaser(secao: SecaoDoCardapio): string {
  if (secao.tipo === "simples") {
    return secao.partes.map((p) => (p.tipo === "texto" ? p.valor : p.rotulo)).join("");
  }
  if (secao.tipo === "opcoes") {
    return `${secao.opcoes.length} opções para escolher`;
  }
  return "Arroz, feijão, proteína, vegetais e sobremesa";
}
