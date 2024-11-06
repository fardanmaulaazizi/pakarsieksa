"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO, TechCorp",
    content:
      "Peralatan yang kami butuhkan selalu tersedia dengan harga yang kompetitif, dan pengirimannya selalu tepat waktu. Sangat puas dengan kualitas produk dan pelayanannya!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Bob Smith",
    role: "Designer, CreativeCo",
    content:
      "Platform ini sangat direkomendasikan bagi siapa saja yang mencari peralatan MRO berkualitas",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Carol Williams",
    role: "Marketing Manager, BrandX",
    content:
      "Situs ini sangat mudah digunakan, dan timnya selalu siap membantu kapan saja. Ini adalah solusi MRO yang kami butuhkan!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Brown",
    role: "CTO, InnovateNow",
    content:
      "Kami dapat menemukan segala kebutuhan peralatan repair dan maintenance di satu tempat. Sangat memudahkan bisnis kami!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Eva Martinez",
    role: "Freelance Developer",
    content:
      "Terima kasih sudah membantu menjaga operasional kami tetap lancar!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Frank Lee",
    role: "Product Manager, StartupY",
    content:
      "Mereka tidak hanya menjual barang, tapi juga memberikan support yang cepat saat ada masalah dengan produk.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: { name: string; role: string; content: string; avatar: string };
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-yellow  text-primary  h-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red hover:text-yellow hover:shadow-lg">
        <CardContent
          className={cn(
            "p-6 flex flex-col h-full transition-colors duration-300"
          )}
        >
          <blockquote className="text-lg mb-4 flex-grow">
            &ldquo;{testimonial.content}&rdquo;
          </blockquote>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-4 text-black">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white">{testimonial.name}</div>
              <div className="text-sm text-white">{testimonial.role}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
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
    <div>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isLogin={true}
      />
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headingVariants}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Apa kata mereka</h1>
          <p className="text-xl text-muted-foreground">
            Temukan alasan mengapa mereka memilih kami
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
