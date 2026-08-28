export const DICAS_DO_DIA = [
  "Comer bem no puerpério é um ato de cuidado com você, não uma cobrança.",
  "Beber água também é cuidar de quem cuida, sem culpa se hoje for menos que ontem.",
  "Está tudo bem ir com calma. Seu corpo está fazendo um trabalho enorme.",
  "Uma refeição simples e feita com carinho já é suficiente.",
  "Descansar quando dá também faz parte do plano.",
  "Você não precisa comer perfeito hoje. Precisa se cuidar hoje.",
  "Cada mamada, cada colher de comida, é um gesto de amor, inclusive por você.",
];

export function getDicaDoDia(date: Date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return DICAS_DO_DIA[dayOfYear % DICAS_DO_DIA.length];
}
