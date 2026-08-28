import {
  IconHome,
  IconBowl,
  IconBook,
  IconGift,
  IconFolder,
  IconPhoneDown,
  type IconProps,
} from "../components/icons";
import type { ComponentType } from "react";

export interface NavItem {
  to: string;
  navLabel: string;
  icon: ComponentType<IconProps>;
  end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", navLabel: "Início", icon: IconHome, end: true },
  { to: "/cardapio", navLabel: "Cardápio", icon: IconBowl },
  { to: "/receitas", navLabel: "Receitas", icon: IconBook },
  { to: "/bonus", navLabel: "Bônus", icon: IconGift },
  { to: "/material-complementar", navLabel: "Material Complementar", icon: IconFolder },
  { to: "/como-baixar", navLabel: "Instalar o App", icon: IconPhoneDown },
];

export const INSTAGRAM_URL = "https://www.instagram.com/nutricionistaakilasamara/";
export const INSTAGRAM_HANDLE = "@nutricionistaakilasamara";
