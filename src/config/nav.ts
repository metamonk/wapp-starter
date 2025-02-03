import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/transactions",
        title: "Transactions",
        icon: Globe,
      },
      {
        href: "/tracked-wallets",
        title: "Tracked Wallets",
        icon: Globe,
      },
      {
        href: "/users",
        title: "Users",
        icon: Globe,
      },
    ],
  },

];

