"use client";
import { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/navbar";

export default function ProductDetail() {
  const [reviews, setReviews] = useState([
    {
      name: "Alex Johnson",
      rating: 5,
      date: "2023-05-15",
      comment:
        "Absolutely love this chair! It's made my work-from-home experience so much more comfortable. The lumbar support is fantastic, and I can sit for hours without any discomfort. Highly recommended for anyone spending long hours at a desk.",
      helpful: 24,
      image: "/placeholder.svg?height=100&width=100&text=Chair",
    },
    {
      name: "Sarah Lee",
      rating: 4,
      date: "2023-05-10",
      comment:
        "Great chair overall. The lumbar support is fantastic, but I wish the armrests had a bit more padding. Still, it's a significant upgrade from my previous office chair. The assembly was straightforward, which is a plus.",
      helpful: 18,
      image: "/placeholder.svg?height=100&width=100&text=Office",
    },
    {
      name: "Chris Wong",
      rating: 5,
      date: "2023-05-05",
      comment:
        "Best office chair I've ever owned. Well worth the investment for my back health. I've noticed a significant reduction in back pain since I started using this chair. The adjustable features allow me to find the perfect position for my body.",
      helpful: 32,
      image: null,
    },
  ]);

  const recommendedProducts = [
    {
      name: "Ergonomic Keyboard",
      price: 129.99,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200&text=Keyboard",
    },
    {
      name: "LED Desk Lamp",
      price: 49.99,
      rating: 4.2,
      image: "/placeholder.svg?height=200&width=200&text=Lamp",
    },
    {
      name: "Adjustable Standing Desk",
      price: 399.99,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200&text=Desk",
    },
  ];

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const reviewToAdd = {
      ...newReview,
      date: currentDate,
      helpful: 0,
      image: null,
    };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
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
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        <div className="grid md:grid-cols-2 gap-8 bg-white p-16 shadow-md ">
          {/* Product Image */}
          <div className="aspect-square relative">
            <img
              src={"/images/products/acer-aspire-a514-53.png"}
              alt="Ergonomic Office Chair"
              className="object-cover rounded-lg w-full h-full"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4 ">
            <h1 className="text-3xl font-bold">Acer Aspire 5 a514-53kg</h1>
            <p className="text-muted-foreground">
              Experience ultimate comfort with our ergonomic office chair.
              Designed to support your body during long work hours, this chair
              features adjustable lumbar support, breathable mesh back, and
              customizable armrests.
            </p>

            <p className="text-2xl font-bold">
              Rp 1.499.000{" "}
              <span className="text-slate-700 text-sm font-normal">
                stok: 50
              </span>
            </p>

            <div className="flex gap-4 mt-4">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Ulasan</h2>

          {/* Review Submission Form */}
          <Card className="mb-8">
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                <h3 className="text-lg font-semibold">Tulis Ulasan</h3>
                <div>
                  <Label htmlFor="name">Nama Anda</Label>
                  <Input
                    id="name"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="comment">Ulasan</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit">Submit Ulasan</Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Reviews */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-4 items-start">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${review.name.charAt(
                        0
                      )}`}
                    />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{review.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-2">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Rekomendasi Produk</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map((product, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <img
                    src={"/images/products/acer-aspire-a514-53.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>
                  <p className="font-semibold mt-2">${product.price}</p>
                  <Button className="w-full mt-4">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
