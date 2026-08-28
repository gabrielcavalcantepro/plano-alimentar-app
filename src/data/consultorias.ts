export interface Consultoria {
  id: string;
  titulo: string;
  descricao: string;
  /**
   * "youtube": assiste dentro do próprio app (vídeo embutido).
   * "externo": abre em outra aba (ex.: um link do Google Drive, que não embuta de forma confiável).
   */
  tipo: "youtube" | "externo";
  url: string;
}

export const CONSULTORIAS: Consultoria[] = [
  {
    id: "metas-que-cabem-na-rotina",
    titulo: "Construindo Metas Que Cabem na Sua Rotina",
    descricao:
      "Como definir metas realistas pro momento de vida que você está, sem se cobrar pelo ritmo de antes.",
    tipo: "externo",
    url: "https://drive.google.com/file/d/1z74T-6n9ai99VuC5D236Gny2ZlH6ZbBD/view?usp=sharing",
  },
  {
    id: "silenciando-a-fome-emocional",
    titulo: "Silenciando a Fome Emocional",
    descricao: "Entenda os gatilhos da fome emocional no puerpério e formas gentis de lidar com eles.",
    tipo: "youtube",
    url: "https://youtu.be/JlvBYoeONjY",
  },
  {
    id: "quebrando-o-ciclo-da-autossabotagem",
    titulo: "Quebrando o Ciclo da Autossabotagem",
    descricao: "Identifique padrões de autossabotagem e como interrompê-los sem culpa.",
    tipo: "youtube",
    url: "https://youtu.be/OnDlYhO90Gc",
  },
];
