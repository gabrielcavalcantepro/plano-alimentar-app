import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressDrop } from "../components/ui/ProgressDrop";
import {
  BrandMark,
  IconArrowRight,
  IconBell,
  IconBowl,
  IconCheck,
  IconClock,
  IconDroplet,
  IconInstagram,
  IconSparkle,
} from "../components/icons";
import { formatMinutes, getCurrentMealWindow, getGreeting, getNextMealWindow, minutesUntil } from "../lib/time";
import { getSecaoById, getSecaoTeaser } from "../data/cardapio";
import { useHydration } from "../hooks/useHydration";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNotificationPermission } from "../hooks/useNotificationPermission";
import { scheduleTodaysMealNotifications } from "../lib/notifications";
import { getDicaDoDia } from "../lib/dicas";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../lib/navigation";

function NomeOnboarding({ onDone }: { onDone: (nome: string) => void }) {
  const [valor, setValor] = useState("");
  return (
    <Card className="mb-6 flex flex-col gap-3 border border-brand-100 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-lg text-espresso-900">Como prefere que a gente te chame?</p>
        <p className="text-sm text-espresso-500">Só pra deixar o app um pouco mais seu. É opcional.</p>
      </div>
      <form
        className="flex shrink-0 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (valor.trim()) onDone(valor.trim());
        }}
      >
        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Seu nome"
          maxLength={30}
          className="w-36 rounded-full border border-espresso-200 bg-white px-4 py-2 text-sm text-espresso-800 outline-none focus-visible:border-brand-400 sm:w-44"
        />
        <Button type="submit" size="sm">
          Salvar
        </Button>
        <button
          type="button"
          onClick={() => onDone("")}
          className="whitespace-nowrap px-2 text-sm font-medium text-espresso-400 hover:text-espresso-600"
        >
          agora não
        </button>
      </form>
    </Card>
  );
}

function NotificacoesOnboarding({
  onAtivar,
  onDispensar,
}: {
  onAtivar: () => void;
  onDispensar: () => void;
}) {
  const [pedidoFeito, setPedidoFeito] = useState(false);

  return (
    <Card className="mb-6 flex flex-col gap-3 border border-brand-100 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <IconBell className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg text-espresso-900">Ativar lembretes de refeição</p>
            <p className="text-sm text-espresso-500">
              A gente avisa direto pelo navegador na hora de cada refeição do seu cardápio. Dá pra
              desativar quando quiser.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="sm"
            icon={<IconBell />}
            onClick={() => {
              setPedidoFeito(true);
              onAtivar();
            }}
          >
            Ativar notificações
          </Button>
          <button
            type="button"
            onClick={onDispensar}
            className="whitespace-nowrap px-2 text-sm font-medium text-espresso-400 hover:text-espresso-600"
          >
            agora não
          </button>
        </div>
      </div>
      {pedidoFeito ? (
        <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs leading-relaxed text-brand-700 sm:ml-[3.25rem]">
          Se não abriu nenhum aviso na tela, o navegador costuma esconder esse pedido num
          ícone discreto perto do endereço do site (um sino ou um cadeado, lá em cima). É só
          clicar nele e escolher "Permitir".
        </p>
      ) : null}
    </Card>
  );
}

export function Inicio() {
  const navigate = useNavigate();
  const [nome, setNome] = useLocalStorage("plano:nome", "");
  const [onboardingFeita, setOnboardingFeita] = useLocalStorage("plano:onboarding-feita", false);
  const [notifDispensada, setNotifDispensada] = useLocalStorage("plano:notificacoes-dispensadas", false);
  const { permission, supported, request } = useNotificationPermission();
  const hydration = useHydration();

  const agora = new Date();
  const refeicaoAtual = getCurrentMealWindow(agora);
  const proximaRefeicao = getNextMealWindow(agora);
  const secaoAtual = getSecaoById(refeicaoAtual.id);
  const faltamMin = minutesUntil(proximaRefeicao, agora);

  const Icone = refeicaoAtual.id === "agua-jejum" ? IconDroplet : IconBowl;

  return (
    <div className="pb-4">
      {!onboardingFeita && (
        <NomeOnboarding
          onDone={(valor) => {
            setNome(valor);
            setOnboardingFeita(true);
          }}
        />
      )}

      {onboardingFeita && supported && permission === "default" && !notifDispensada && (
        <NotificacoesOnboarding
          onAtivar={async () => {
            await request();
            scheduleTodaysMealNotifications();
          }}
          onDispensar={() => setNotifDispensada(true)}
        />
      )}

      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
          {agora.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
        </p>
        <h1 className="mt-1 text-3xl text-espresso-900 sm:text-4xl">
          {getGreeting(agora)}
          {nome ? `, ${nome}` : ""}.
        </h1>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Icone className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-espresso-400">
                Agora é a hora de
              </p>
              <h2 className="mt-0.5 text-2xl text-espresso-900">{refeicaoAtual.label}</h2>
              {secaoAtual ? (
                <p className="mt-1 text-sm text-espresso-500">{getSecaoTeaser(secaoAtual)}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  size="sm"
                  icon={<IconArrowRight />}
                  iconPosition="right"
                  onClick={() => navigate(`/cardapio?secao=${refeicaoAtual.id}`)}
                >
                  Ver opções no cardápio
                </Button>
                <span className="inline-flex items-center gap-1.5 text-xs text-espresso-400">
                  <IconClock className="h-3.5 w-3.5" />
                  Próxima: {proximaRefeicao.label} em {formatMinutes(faltamMin)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col items-center gap-3 p-6 text-center">
          <div>
            <h2 className="font-display text-lg text-espresso-900">Hidratação do dia</h2>
            <p className="mt-1 text-xs leading-relaxed text-espresso-500">
              Toque nos botões sempre que beber água. A gota vai enchendo até você completar a meta.
            </p>
          </div>
          <ProgressDrop percent={hydration.percent} size={72} />
          <p className="text-sm text-espresso-500">
            <span className="font-display text-xl text-espresso-900">
              {(hydration.ml / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} L
            </span>{" "}
            de {(hydration.goalMl / 1000).toLocaleString("pt-BR")} L
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => hydration.addMl(250)}>
              +250 ml
            </Button>
            <Button size="sm" variant="secondary" onClick={() => hydration.addMl(500)}>
              +500 ml
            </Button>
          </div>
          <button
            type="button"
            onClick={hydration.toggleJejum}
            className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
              hydration.jejumDone
                ? "border-sage-300 bg-sage-100 text-sage-700"
                : "border-espresso-200 text-espresso-500 hover:border-brand-300"
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                hydration.jejumDone ? "border-sage-500 bg-sage-500 text-white" : "border-espresso-300"
              }`}
            >
              {hydration.jejumDone ? <IconCheck className="h-3 w-3" /> : null}
            </span>
            {hydration.jejumMl} ml em jejum tomados
          </button>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="flex items-start gap-3 p-5 lg:col-span-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
            <IconSparkle className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-espresso-600">{getDicaDoDia(agora)}</p>
        </Card>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl bg-espresso-900 p-5 text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
            <IconInstagram className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Seguir no Instagram</span>
            <span className="block truncate text-xs text-espresso-300">{INSTAGRAM_HANDLE}</span>
          </span>
          <BrandMark className="h-4 w-4 shrink-0 text-brand-400" />
        </a>
      </div>
    </div>
  );
}
