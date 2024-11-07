import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menu } from "@/data/menu";
import { productsDummy } from "@/data/productsdummy";
import { Menu, Minus, Plus, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const products = productsDummy;

export default function Navbar({
  cart,
  addToCart,
  removeFromCart,
  isLogin,
}: any) {
  const [language, setLanguage] = useState("Indonesian");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    return products
      .filter((product) => product.name.toLowerCase().includes(lowercasedQuery))
      .map(({ id, name, price }) => ({ id, name, price }));
  }, [searchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemsCount = cart.reduce(
    (total: any, item: any) => total + item.quantity,
    0
  );
  const cartTotal = cart.reduce((total: any, item: any) => {
    const product = products.find((p: any) => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <>
      <nav className="bg-primary shadow-md fixed w-full z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4 w-full">
            <div className="flex items-center gap-3">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-yellow">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className=" bg-yellow text-white">
                  <nav className="flex flex-col gap-4 mb-3">
                    <img
                      src="/images/logo.png"
                      alt="logo"
                      className="w-full mx-auto"
                    />

                    {menu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.link}
                        className="text-md font-bold text-primary hover:text-yellow hover:bg-red p-3 rounded"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Link
                href="/"
                className="text-2xl font-bold text-primary gap-3 items-center text-white hover:text-yellow flex"
              >
                Pakarxie
              </Link>
            </div>
            <div className="flex items-center gap-5">
              {/* Search bar */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      placeholder="Search..."
                      className="w-24 md:w-64"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search products..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Products">
                        {searchResults.map((product) => (
                          <CommandItem key={product.id}>
                            <Link href={`/products/${product.id}`}>
                              <div className="flex justify-between w-full flex-col">
                                <span>{product.name}</span>
                                <span className="text-muted-foreground">
                                  {product.price.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </span>
                              </div>
                            </Link>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div>
                {/* Cart */}
                {isLogin ? (
                  <div className="flex items-center gap-2">
                    {/* Cart */}
                    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative text-white"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          {cartItemsCount > 0 && (
                            <Badge className="absolute -top-2 -right-2 px-2 py-1 bg-red hover:bg-red">
                              {cartItemsCount}
                            </Badge>
                          )}
                          <span className="sr-only">Open cart</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Your Cart</SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                          {cart.length === 0 ? (
                            <p className="text-center text-gray-500 mt-4">
                              Your cart is empty
                            </p>
                          ) : (
                            cart.map((item: any) => {
                              const product = products.find(
                                (p: any) => p.id === item.id
                              );
                              if (!product) return null;
                              return (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between py-4"
                                >
                                  <div className="flex items-center space-x-4">
                                    <img
                                      src={`/images/products/${product.image}`}
                                      alt={product.name}
                                      width={64}
                                      height={64}
                                      className="rounded-md"
                                    />
                                    <div>
                                      <h3 className="font-medium">
                                        {product.name}
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {product.price.toLocaleString("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => addToCart(item.id)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </ScrollArea>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-medium">
                              {cartTotal.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}
                            </span>
                          </div>
                          <Button className="w-full">Checkout</Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Profile when login */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white"
                        >
                          <User className="h-5 w-5" />
                          <span className="sr-only">Open user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href="/profile">
                          <DropdownMenuItem className="hover:cursor-pointer">
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/orders">
                          <DropdownMenuItem className="hover:cursor-pointer">
                            Riwayat Pembelian
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard">
                          <DropdownMenuItem className="hover:cursor-pointer">
                            Dashboard
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:cursor-pointer">
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  // Profile when not login
                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User account</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Account</DialogTitle>
                      <DialogHeader>
                        <DialogDescription>
                          Login or create an account
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="login">Login</TabsTrigger>
                          <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                          <form className="space-y-4">
                            <Input placeholder="Email" type="email" />
                            <Input placeholder="Password" type="password" />
                            <Button className="w-full">Login</Button>
                          </form>
                        </TabsContent>
                        <TabsContent value="register">
                          <form className="space-y-4">
                            <Input placeholder="Name" />
                            <Input placeholder="Email" type="email" />
                            <Input placeholder="Password" type="password" />
                            <Button className="w-full">Register</Button>
                          </form>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
