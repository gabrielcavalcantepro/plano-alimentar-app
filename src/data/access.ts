import { MATERIAL_COMPLEMENTAR } from "./materialComplementar";

/**
 * Controle de acesso ao Material Complementar — SEM login/backend.
 *
 * Como funciona hoje: este arquivo é a única fonte de verdade sobre quais itens
 * aparecem na aba "Material Complementar". A aba nunca lista o catálogo inteiro
 * (`MATERIAL_COMPLEMENTAR`) direto — sempre filtra por `UNLOCKED_ITEM_IDS`.
 *
 * Estado atual: `"all"`, ou seja, todo mundo que abrir o app vê os 5 itens.
 * Isso foi uma decisão explícita pra fase atual (ver README, seção "Material
 * Complementar e controle de acesso") — não é o padrão pra quando existirem
 * várias clientes com compras diferentes.
 *
 * Pra restringir por cliente (quando isso passar a ser necessário), troque o
 * valor abaixo por um array com os `id`s liberados (ver os `id`s em
 * `materialComplementar.ts`) e gere um build/deploy próprio pra essa cliente.
 * Ex.: apenas quem comprou a Lista de Compras e o combo de Marmitas:
 *
 *   export const UNLOCKED_ITEM_IDS: string[] | "all" = [
 *     "lista-de-compras",
 *     "marmitas-inteligentes",
 *   ];
 *
 * O combo "leve todos com desconto" (item 6 do Apêndice) não é um material —
 * é uma oferta de checkout. Quem compra o combo simplesmente recebe um build
 * com todos os 5 ids do array `TODOS_OS_ITEM_IDS` abaixo.
 */
export const UNLOCKED_ITEM_IDS: string[] | "all" = "all";

export const TODOS_OS_ITEM_IDS: string[] = MATERIAL_COMPLEMENTAR.map((item) => item.id);

export function getMateriaisLiberados() {
  if (UNLOCKED_ITEM_IDS === "all") return MATERIAL_COMPLEMENTAR;
  const liberados = new Set(UNLOCKED_ITEM_IDS);
  return MATERIAL_COMPLEMENTAR.filter((item) => liberados.has(item.id));
}
