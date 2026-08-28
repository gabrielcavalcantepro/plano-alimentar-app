import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";
import { buttonClasses } from "../components/ui/buttonStyles";
import { getMateriaisLiberados } from "../data/access";
import { IconArrowRight, IconFolder } from "../components/icons";

export function MaterialComplementar() {
  const materiais = getMateriaisLiberados();

  return (
    <div className="pb-4">
      <PageHeader
        eyebrow="Extras da sua compra"
        title="Material Complementar"
        description="Aqui aparecem só os materiais que fazem parte da sua compra."
      />

      {materiais.length === 0 ? (
        <EmptyState
          icon={<IconFolder />}
          title="Nenhum material liberado ainda"
          description="Se você já comprou algum material complementar e ele não aparece aqui, chama a gente pelo Instagram que resolvemos rapidinho."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {materiais.map((item) => (
            <Card key={item.id} className="flex flex-col gap-4 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <IconFolder className="h-5 w-5" />
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
                  Abrir material
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
        </div>
      )}
    </div>
  );
}
