import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChart from "./bar-chart";

const productPerformance = {
  labels: ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"],
  data: [12, 19, 3, 5, 2],
};
export default function ProductPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
        <CardDescription>Analisis produk penjualan terbaik</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart values={productPerformance} />
      </CardContent>
    </Card>
  );
}
