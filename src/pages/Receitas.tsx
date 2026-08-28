import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/ui/PageHeader";
import { Drawer } from "../components/ui/Drawer";
import { Badge } from "../components/ui/Badge";
import { RECEITAS, getReceitaById, type Receita } from "../data/receitas";
import { IconArrowRight, IconClock } from "../components/icons";

function ReceitaDetalhe({ receita }: { receita: Receita }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Receita</p>
      <h2 className="pr-8 font-display text-2xl text-espresso-900">{receita.titulo}</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge tone="neutral">{receita.porcao}</Badge>
        <Badge tone="neutral" icon={<IconClock />}>
          {receita.tempoPreparo}
        </Badge>
      </div>

      <h3 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-espresso-500">
        Ingredientes
      </h3>
      <ul className="flex flex-col gap-1.5">
        {receita.ingredientes.map((ingrediente, index) => (
          <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-espresso-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
            {ingrediente}
          </li>
        ))}
      </ul>

      <h3 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-espresso-500">
        Modo de preparo
      </h3>
      <ol className="flex flex-col gap-3">
        {receita.modoDePreparo.map((passo, index) => (
          <li key={index} className="flex gap-3 text-sm leading-relaxed text-espresso-600">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
              {index + 1}
            </span>
            <p className="pt-0.5">{passo}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Receitas() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [aberta, setAberta] = useState<Receita | null>(null);

  useEffect(() => {
    const receita = getReceitaById(recipeId);
    setAberta(receita ?? null);
  }, [recipeId]);

  return (
    <div className="pb-4">
      <PageHeader
        eyebrow="Biblioteca"
        title="Receitas"
        description="As receitas que aparecem no seu cardápio, com ingredientes e passo a passo completos."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RECEITAS.map((receita) => (
          <Link
            key={receita.id}
            to={`/receitas/${receita.id}`}
            className="flex flex-col gap-3 rounded-xl bg-surface p-5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
          >
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">{receita.porcao}</Badge>
              <Badge tone="neutral" icon={<IconClock />}>
                {receita.tempoPreparo}
              </Badge>
            </div>
            <h2 className="font-display text-xl leading-snug text-espresso-900">{receita.titulo}</h2>
            <p className="line-clamp-2 flex-1 text-sm text-espresso-500">
              {receita.ingredientes.slice(0, 3).join(" · ")}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Ver receita
              <IconArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>

      <Drawer open={Boolean(aberta)} onClose={() => navigate("/receitas")}>
        {aberta ? <ReceitaDetalhe receita={aberta} /> : null}
      </Drawer>
    </div>
  );
}
