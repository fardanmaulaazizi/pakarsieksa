import { orders } from "@/data/dummyOrders";
import Orders from "./orders";

export default function Page() {
  const ordersHistory = orders;
  return <Orders />;
}
