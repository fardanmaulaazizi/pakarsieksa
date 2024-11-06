import {
  BarChart3,
  Gauge,
  NotepadText,
  Package,
  Settings,
  SquareChartGantt,
  Tag,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: BarChart3,
  },
  {
    title: "Promotions",
    url: "/dashboard/promotions",
    icon: Tag,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: NotepadText,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-primary text-yellow">
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl text-white font-bold mb-5">
            Pakarsie
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="text-lg font-bold">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
