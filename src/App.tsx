import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { Inicio } from "./pages/Inicio";
import { Cardapio } from "./pages/Cardapio";
import { Receitas } from "./pages/Receitas";
import { Bonus } from "./pages/Bonus";
import { MaterialComplementar } from "./pages/MaterialComplementar";
import { ComoBaixar } from "./pages/ComoBaixar";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/receitas/:recipeId" element={<Receitas />} />
        <Route path="/bonus" element={<Bonus />} />
        <Route path="/consultorias" element={<Navigate to="/bonus" replace />} />
        <Route path="/material-complementar" element={<MaterialComplementar />} />
        <Route path="/como-baixar" element={<ComoBaixar />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
