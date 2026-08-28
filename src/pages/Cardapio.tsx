import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/ui/PageHeader";
import { SegmentedControl } from "../components/ui/SegmentedControl";
import { AccordionItem } from "../components/ui/AccordionItem";
import { EmptyState } from "../components/ui/EmptyState";
import { Badge } from "../components/ui/Badge";
import { MenuParts } from "../components/cardapio/MenuParts";
import { CARDAPIO_PADRAO } from "../data/cardapio";
import { getCurrentMealWindow } from "../lib/time";
import { IconBowl, IconDroplet, IconLock } from "../components/icons";

const iconePorSecao: Record<string, typeof IconBowl> = {
  "agua-jejum": IconDroplet,
  "agua-meta": IconDroplet,
};

export function Cardapio() {
  const [searchParams] = useSearchParams();
  const secaoAlvo = searchParams.get("secao");
  const [tab, setTab] = useState<"padrao" | "aplv">("padrao");
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set([secaoAlvo ?? getCurrentMealWindow().id]),
  );
  const [highlighted, setHighlighted] = useState<string | null>(secaoAlvo);

  useEffect(() => {
    if (!secaoAlvo) return;
    setOpenSections((prev) => new Set(prev).add(secaoAlvo));
    setHighlighted(secaoAlvo);
    const timeout = window.setTimeout(() => {
      document.getElementById(secaoAlvo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    const clearHighlight = window.setTimeout(() => setHighlighted(null), 2400);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(clearHighlight);
    };
  }, [secaoAlvo]);

  function toggle(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAnchor(id: string) {
    setOpenSections((prev) => new Set(prev).add(id));
    setHighlighted(id);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    window.setTimeout(() => setHighlighted(null), 2400);
  }

  return (
    <div className="pb-4">
      <PageHeader
        eyebrow="Alimentação guiada"
        title="Cardápio"
        description="Um roteiro completo pro seu dia, do jejum à ceia. Troque as opções à vontade dentro de cada refeição."
      />

      <SegmentedControl
        value={tab}
        onChange={setTab}
        options={[
          { value: "padrao", label: "Cardápio Padrão" },
          { value: "aplv", label: "Cardápio APLV", icon: <IconLock className="h-3.5 w-3.5" /> },
        ]}
      />

      <div className="mt-6">
        {tab === "padrao" ? (
          <div className="flex flex-col gap-3">
            {CARDAPIO_PADRAO.map((secao) => {
              const Icone = iconePorSecao[secao.id] ?? IconBowl;
              return (
                <AccordionItem
                  key={secao.id}
                  id={secao.id}
                  title={secao.titulo}
                  icon={<Icone />}
                  open={openSections.has(secao.id)}
                  onToggle={() => toggle(secao.id)}
                  highlighted={highlighted === secao.id}
                >
                  {secao.tipo === "simples" && (
                    <p className="text-[0.95rem] leading-relaxed text-espresso-600">
                      <MenuParts partes={secao.partes} onAnchorClick={handleAnchor} />
                    </p>
                  )}

                  {secao.tipo === "opcoes" && (
                    <ul className="flex flex-col gap-2.5">
                      {secao.opcoes.map((opcao, index) => (
                        <li key={index} className="flex gap-3 rounded-lg bg-canvas px-3.5 py-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                            {index + 1}
                          </span>
                          <p className="text-sm leading-relaxed text-espresso-600">
                            <MenuParts partes={opcao.partes} onAnchorClick={handleAnchor} />
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {secao.tipo === "lista" && (
                    <dl className="flex flex-col gap-2.5">
                      {secao.itens.map((item, index) => (
                        <div key={index} className="rounded-lg bg-canvas px-3.5 py-3">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                            {item.rotulo}
                          </dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-espresso-600">
                            <MenuParts partes={item.partes} onAnchorClick={handleAnchor} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </AccordionItem>
              );
            })}
          </div>
        ) : (
          <EmptyState
            tone="plum"
            icon={<IconLock />}
            title="Cardápio APLV em produção"
            description="Estamos preparando um cardápio completo e seguro para alergia à proteína do leite de vaca (APLV). Assim que ficar pronto, ele aparece bem aqui, sem precisar atualizar o app."
            action={<Badge tone="plum">Em breve</Badge>}
          />
        )}
      </div>
    </div>
  );
}
