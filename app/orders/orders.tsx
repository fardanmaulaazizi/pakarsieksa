"use client";

import { useState, useMemo, useEffect } from "react";
import { CalendarIcon, CreditCard, X } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/navbar";

// Mock data for orders
const orders = [
  {
    id: "ORD001",
    date: "2023-05-15",
    total: 125.99,
    status: "Delivered",
    items: [
      { name: "Product A", quantity: 2, price: 49.99 },
      { name: "Product B", quantity: 1, price: 26.01 },
    ],
  },
  {
    id: "ORD002",
    date: "2023-06-02",
    total: 79.99,
    status: "Processing",
    items: [{ name: "Product C", quantity: 1, price: 79.99 }],
  },
  {
    id: "ORD003",
    date: "2023-06-10",
    total: 199.97,
    status: "Shipped",
    items: [
      { name: "Product D", quantity: 3, price: 59.99 },
      { name: "Product E", quantity: 1, price: 20.0 },
    ],
  },
];

// Mock data for payment methods
const paymentMethods = [
  {
    id: "PM001",
    type: "Credit Card",
    last4: "1234",
    expiry: "05/25",
    isDefault: true,
  },
  {
    id: "PM002",
    type: "PayPal",
    email: "user@example.com",
    isDefault: false,
  },
];

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesDateRange =
        (!dateRange.from ||
          (Date.parse(dateRange.from as any) &&
            new Date(order.date) >= new Date(dateRange.from))) &&
        (!dateRange.to ||
          (Date.parse(dateRange.to as any) &&
            new Date(order.date) <= new Date(dateRange.to)));

      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDateRange && matchesStatus;
    });
  }, [searchQuery, dateRange, statusFilter, orders]);

  const resetDateRange = () => {
    setDateRange({ from: undefined, to: undefined });
  };
  const [cart, setCart] = useState([]);
  const addToCart = (productId: number) => {
    setCart((prevCart: any) => {
      const existingItem = prevCart.find((item: any) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item: any) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (productId: number) => {
    setCart((prevCart: any) => {
      const existingItem = prevCart.find((item: any) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item: any) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item: any) => item.id !== productId);
      }
    });
  };
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 10);
    return () => clearTimeout(timer);
  }, [cart]);
  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isLogin={true}
      />
      <div className="max-w-6xl mx-auto p-4 pt-24">
        <h1 className="text-3xl font-bold mb-5">Riwayat Pembelian</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-start justify-between mb-5">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search orders..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal h-full",
                  !dateRange.from && !dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(newDateRange) => {
                  setDateRange({
                    from: newDateRange?.from,
                    to: newDateRange?.to ?? undefined, 
                  });
                }}
                numberOfMonths={2}
              />
              <div className="flex items-center justify-end gap-2 p-2 border-t">
                <Button variant="ghost" size="sm" onClick={resetDateRange}>
                  Reset
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pembelian</CardTitle>
            <CardDescription>
              Berikut adalah riwayat pembelian Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              {filteredOrders.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No orders found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {order.total.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Processing"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Lihat Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Order Details - {order.id}
                              </DialogTitle>
                              <DialogDescription>
                                Order placed on {order.date}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2">Items:</h4>
                              <ul>
                                {order.items.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex justify-between"
                                  >
                                    <span>
                                      {item.name} x{item.quantity}
                                    </span>
                                    <span>
                                      {(
                                        item.price * item.quantity
                                      ).toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                      })}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-4 flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>
                                  $
                                  {order.total.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>

        {/* <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your saved payment methods</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-secondary rounded-full">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{method.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {method.type === "Credit Card"
                      ? `**** ${method.last4} (Expires ${method.expiry})`
                      : method.email}
                  </p>
                </div>
              </div>
              {method.isDefault && <Badge variant="outline">Default</Badge>}
            </div>
          ))}
          <Button className="w-full">Add New Payment Method</Button>
        </CardContent>
      </Card> */}
      </div>
    </>
  );
}
