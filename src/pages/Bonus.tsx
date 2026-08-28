import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Drawer } from "../components/ui/Drawer";
import { buttonClasses } from "../components/ui/buttonStyles";
import { BONUS } from "../data/bonus";
import { CONSULTORIAS } from "../data/consultorias";
import { getYoutubeEmbedUrl } from "../lib/youtube";
import { IconArrowRight, IconExternalLink, IconGift, IconHeadphones, IconPlayCircle } from "../components/icons";

interface Assistindo {
  titulo: string;
  embedUrl: string;
  watchUrl: string;
}

export function Bonus() {
  const [assistindo, setAssistindo] = useState<Assistindo | null>(null);

  return (
    <div className="pb-4">
      <PageHeader
        eyebrow="De presente"
        title="Bônus"
        description="Guias e consultorias extras que acompanham o seu plano, pra consultar sempre que precisar."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {BONUS.map((item) => (
          <Card key={item.id} className="flex flex-col gap-4 p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <IconGift className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl leading-snug text-espresso-900">{item.titulo}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-espresso-500">{item.descricao}</p>
            </div>

            {item.arquivoUrl ? (
              <a
                href={item.arquivoUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses("primary", "sm", "self-start")}
              >
                Abrir guia
                <IconArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <div className="flex items-center gap-3">
                <Badge tone="plum">Conteúdo em breve</Badge>
                <span className="text-xs text-espresso-400">Vamos avisar quando estiver disponível</span>
              </div>
            )}
          </Card>
        ))}

        {CONSULTORIAS.map((sessao) => {
          const embedUrl = sessao.tipo === "youtube" ? getYoutubeEmbedUrl(sessao.url) : null;
          return (
            <Card key={sessao.id} className="flex flex-col gap-4 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <IconHeadphones className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h2 className="font-display text-xl leading-snug text-espresso-900">{sessao.titulo}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-espresso-500">{sessao.descricao}</p>
              </div>

              {embedUrl ? (
                <Button
                  size="sm"
                  className="self-start"
                  icon={<IconPlayCircle />}
                  onClick={() => setAssistindo({ titulo: sessao.titulo, embedUrl, watchUrl: sessao.url })}
                >
                  Assistir agora
                </Button>
              ) : (
                <a
                  href={sessao.url}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClasses("secondary", "sm", "self-start")}
                >
                  Assistir no Google Drive
                  <IconExternalLink className="h-4 w-4" />
                </a>
              )}
            </Card>
          );
        })}
      </div>

      <Drawer size="lg" open={Boolean(assistindo)} onClose={() => setAssistindo(null)}>
        {assistindo ? (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Consultoria</p>
            <h2 className="pr-8 font-display text-2xl text-espresso-900">{assistindo.titulo}</h2>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                className="h-full w-full"
                src={assistindo.embedUrl}
                title={assistindo.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a
              href={assistindo.watchUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-espresso-400 hover:text-brand-600"
            >
              Não carregou? Abrir direto no YouTube
              <IconExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
