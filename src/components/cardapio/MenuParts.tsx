import { Link } from "react-router-dom";
import type { ParteDeTexto } from "../../data/cardapio";

export function MenuParts({
  partes,
  onAnchorClick,
}: {
  partes: ParteDeTexto[];
  onAnchorClick?: (secaoId: string) => void;
}) {
  return (
    <>
      {partes.map((parte, index) => {
        if (parte.tipo === "texto") return <span key={index}>{parte.valor}</span>;

        if (parte.tipo === "receita") {
          return (
            <Link
              key={index}
              to={`/receitas/${parte.receitaId}`}
              className="mx-0.5 inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[0.92em] font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:bg-brand-100"
            >
              {parte.rotulo}
            </Link>
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => onAnchorClick?.(parte.secaoId)}
            className="mx-0.5 font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
          >
            {parte.rotulo}
          </button>
        );
      })}
    </>
  );
}
