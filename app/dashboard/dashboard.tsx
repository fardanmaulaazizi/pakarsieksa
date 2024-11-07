import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChevronRight,
  NotepadText,
  Package,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import ProductPerformance from "./product-performance";
import SalesReport from "./sales-report";
import Link from "next/link";
export default function Dashboard() {
  const navItems = [
    { name: "Users", icon: Users, url: "/dashboard-users" },
    { name: "Products", icon: Package, url: "/dashboard-products" },
    { name: "Promotions", icon: Tag, url: "/dashboard-promotions" },
    { name: "Categories", icon: BarChart3, url: "/dashboard-categories" },
    { name: "Transactions", icon: NotepadText, url: "/dashboard-transactions" },
    { name: "Website Settings", icon: Settings, url: "/dashboard-settings" },
  ];

  const dailySalesData = [
    { name: "Mon", sales: 4000 },
    { name: "Tue", sales: 3000 },
    { name: "Wed", sales: 5000 },
    { name: "Thu", sales: 2780 },
    { name: "Fri", sales: 1890 },
    { name: "Sat", sales: 2390 },
    { name: "Sun", sales: 3490 },
  ];

  const weeklySalesData = [
    { name: "Week 1", sales: 20000 },
    { name: "Week 2", sales: 24000 },
    { name: "Week 3", sales: 19000 },
    { name: "Week 4", sales: 28000 },
  ];

  const monthlySalesData = [
    { name: "Jan", sales: 65000 },
    { name: "Feb", sales: 59000 },
    { name: "Mar", sales: 80000 },
    { name: "Apr", sales: 81000 },
    { name: "May", sales: 56000 },
    { name: "Jun", sales: 55000 },
    { name: "Jul", sales: 40000 },
  ];

  const productPerformanceData = [
    { name: "Power Drill", sales: 4000 },
    { name: "Hammer", sales: 3000 },
    { name: "Saw", sales: 2000 },
    { name: "Screwdriver Set", sales: 2780 },
    { name: "Paint Brush", sales: 1890 },
    { name: "Ladder", sales: 2390 },
  ];

  return (
    <main className="flex-grow ">
      <h2 className="text-3xl font-bold mb-6 text-primary">Dashboard</h2>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesReport />
        <ProductPerformance />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="bg-card text-card-foreground rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <item.icon className="h-5 w-5 mr-2" />
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Kelola dan lihat semua {item.name.toLowerCase()}.
            </p>
            <Link href={item.url}>
              <Button
                variant="outline"
                className="w-full justify-between group"
              >
                Lihat Detail
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
