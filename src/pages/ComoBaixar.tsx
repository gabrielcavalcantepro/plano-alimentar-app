import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import { Button } from "../components/ui/Button";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { detectMobileOS } from "../lib/platform";
import {
  IconCheck,
  IconDroplet,
  IconMoreVertical,
  IconPhoneDown,
  IconPlusSquare,
  IconShare,
  IconSparkle,
} from "../components/icons";

type OS = "ios" | "android";

const PASSOS: Record<OS, string[]> = {
  ios: [
    "Abra este site no Safari (instalação só funciona por ele, não pelo navegador de dentro do Instagram, por exemplo).",
    "Toque no ícone de Compartilhar: o quadrado com uma seta pra cima, na barra do navegador.",
    'Deslize as opções e toque em "Adicionar à Tela de Início".',
    'Toque em "Adicionar", no canto superior direito.',
    "Pronto! O ícone aparece na sua tela inicial, como um app de verdade.",
  ],
  android: [
    "Abra este site no Google Chrome.",
    "Toque nos três pontinhos, no canto superior direito da tela.",
    'Toque em "Adicionar à tela inicial" ou "Instalar aplicativo".',
    'Confirme tocando em "Instalar".',
    "Pronto! O app abre em tela cheia, sem a barra do navegador.",
  ],
};

const BENEFICIOS = [
  { icon: IconPhoneDown, texto: "Acesso em 1 toque, direto da tela inicial" },
  { icon: IconDroplet, texto: "Funciona rápido mesmo com internet fraca" },
  { icon: IconSparkle, texto: "Tela cheia, sem distração do navegador" },
];

export function ComoBaixar() {
  const [os, setOs] = useState<OS>(() => (detectMobileOS() === "ios" ? "ios" : "android"));
  const { canPromptInstall, isInstalled, promptInstall } = useInstallPrompt();

  return (
    <div className="pb-4">
      <PageHeader
        eyebrow="Leve no bolso"
        title="Como baixar o app no celular"
        description="Sem loja de aplicativos e sem espaço ocupado. Em menos de um minuto o app fica salvo na sua tela inicial."
      />

      {isInstalled ? (
        <Card className="flex items-center gap-4 p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
            <IconCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-lg text-espresso-900">Você já instalou o app por aqui</p>
            <p className="text-sm text-espresso-500">
              É só abrir pelo ícone na sua tela inicial sempre que precisar.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {BENEFICIOS.map(({ icon: Icone, texto }, index) => (
              <Card key={index} className="flex items-center gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icone className="h-5 w-5" />
                </span>
                <p className="text-sm leading-snug text-espresso-600">{texto}</p>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <SegmentedControl
              value={os}
              onChange={setOs}
              options={[
                { value: "ios", label: "iPhone (Safari)" },
                { value: "android", label: "Android (Chrome)" },
              ]}
            />
          </div>

          <Card className="mt-4 p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                {os === "ios" ? <IconShare className="h-5 w-5" /> : <IconMoreVertical className="h-5 w-5" />}
              </span>
              <h2 className="font-display text-lg text-espresso-900">
                {os === "ios" ? "Passo a passo no iPhone" : "Passo a passo no Android"}
              </h2>
            </div>

            <ol className="flex flex-col gap-4">
              {PASSOS[os].map((passo, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-espresso-600">{passo}</p>
                </li>
              ))}
            </ol>

            {os === "android" && canPromptInstall ? (
              <Button className="mt-6" icon={<IconPlusSquare />} onClick={() => promptInstall()}>
                Instalar agora
              </Button>
            ) : os === "android" ? (
              <p className="mt-6 text-xs text-espresso-400">
                Se o botão de instalação não aparecer automaticamente, use os três pontinhos do Chrome
                como no passo 2 acima.
              </p>
            ) : (
              <p className="mt-6 text-xs text-espresso-400">
                No iPhone a instalação é sempre manual, pelos passos acima. A Apple não permite instalar
                direto por um botão.
              </p>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
