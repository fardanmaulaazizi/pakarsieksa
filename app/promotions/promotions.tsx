"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import Navbar from "@/components/navbar";
// import { X } from "lucide-react";

// Sample data for the gallery
const galleryItems = [
  { id: 1, src: "/images/promotions/promotion-1.jpg", alt: "Product 1" },
  { id: 2, src: "/images/promotions/promotion-2.jpg", alt: "Product 2" },
  { id: 3, src: "/images/promotions/promotion-3.jpg", alt: "Product 3" },
  { id: 4, src: "/images/promotions/promotion-1.jpg", alt: "Product 4" },
  { id: 5, src: "/images/promotions/promotion-2.jpg", alt: "Product 5" },
  { id: 6, src: "/images/promotions/promotion-3.jpg", alt: "Product 6" },
];

export default function Promotions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
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
    <div>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isLogin={true}
      />
      <div
        className={`container mx-auto px-4 py-8 pt-24 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Event Promosi Kami</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Spesial untuk kamu yang ingin menikmati
          </p>
          <Link href={"/products"}>
            <Button
              size="lg"
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Belanja Sekarang
            </Button>
          </Link>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`transition-all duration-500 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-0 relative">
                      <AspectRatio ratio={4 / 3}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-all duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Lihat Detail
                          </span>
                        </div>
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] p-0">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1280}
                    height={1280}
                    className="h-full w-full"
                  />
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
