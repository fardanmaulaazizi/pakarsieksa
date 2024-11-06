import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineChart from "./line-chart";

const dailySalesData = {
  labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
  data: [12, 19, 3, 5, 2],
};

const weeklySalesData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  data: [12, 19, 3, 5, 2],
};

const monthlySalesData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  data: [
    65000, 59000, 80000, 70000, 50000, 60000, 40000, 50000, 60000, 70000, 80000,
    90000,
  ],
};

export default function SalesReport() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Laporan Penjualan</CardTitle>
        <CardDescription>
          Lihat data penjualan berdasarkan periode waktu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <LineChart values={dailySalesData} />
          </TabsContent>
          <TabsContent value="weekly">
            <LineChart values={weeklySalesData} />
          </TabsContent>
          <TabsContent value="monthly">
            <LineChart values={monthlySalesData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
