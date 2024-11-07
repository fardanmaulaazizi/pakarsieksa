"use client";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function About() {
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

  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Mike Johnson",
      role: "COO",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Sarah Brown",
      role: "CMO",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  const companyValues = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible.",
    },
    {
      title: "Integrity",
      description: "We uphold the highest standards of honesty and ethics.",
    },
    {
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and diverse perspectives.",
    },
    {
      title: "Customer-Centric",
      description: "Our customers' success is our top priority.",
    },
  ];

  return (
    <div>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isLogin={true}
      />
      <div className="max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Tentang Kami</h1>

        <section className="mb-12 ">
          <Card className="p-5 ">
            <CardHeader className="p-0 mb-5">
              <CardTitle className="font-bold">Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground">
                Founded in 2010, our company has been at the forefront of
                technological innovation, delivering cutting-edge solutions to
                businesses worldwide. With a team of dedicated professionals and
                a passion for excellence, we've grown from a small startup to a
                global leader in our industry.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-5">
            <CardHeader className="p-0 mb-5">
              <CardTitle className="font-bold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground">
                Our mission is to empower businesses with innovative technology
                solutions that drive growth, efficiency, and success. We are
                committed to delivering exceptional value to our clients,
                fostering a culture of continuous learning, and making a
                positive impact on the world through our work.
              </p>
            </CardContent>
          </Card>
        </section>

        

        <Card className="bg-white p-5">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyValues.map((value, index) => (
              <Card key={index} className="p-5">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center p-0 mb-3">
                    <Badge variant="outline" className="me-2">
                      {index + 1}
                    </Badge>
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
