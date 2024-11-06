"use client";
import Banner from "./banner";
import Categories from "./category";
import Products from "./products";
import Promotions from "./promotions";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import PromotionGallery from "@/components/imageGallery";

export default function Home({ isLogin }: any) {
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

  const products = [
    {
      id: 1,
      name: "Hammer",
      category: "Tools",
      subcategory: "Hand Tools",
      price: 19.99,
    },
    {
      id: 2,
      name: "Painting",
      category: "Painting",
      subcategory: "Painting",
      price: 19.99,
    },
    {
      id: 3,
      name: "Painting",
      category: "Painting",
      subcategory: "Painting",
      price: 19.99,
    },
    {
      id: 4,
      name: "Painting",
      category: "Painting",
      subcategory: "Painting",
      price: 19.99,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col bg-red">
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isLogin={isLogin}
      />
      <Banner />
      <Promotions />
      <Categories />
      <Products addToCart={addToCart} isLogin={isLogin} />
      <Footer />
    </div>
  );
}
