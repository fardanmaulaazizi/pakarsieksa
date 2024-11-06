"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/data/products";
import Link from "next/link";

export default function ProductCarousel({
  isLogin,
  addToCart,
}: {
  isLogin: boolean;
  addToCart: (productId: number) => void;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4  pt-16">
      <div className="w-full mb-5">
        <h3 className="font-bold text-6xl mb-4 text-white">
          Eksplor Produk Kami
        </h3>
        <h4 className="text-lg text-yellow">
          Jelajahi produk kami untuk memenuhi kebutuhan Anda
        </h4>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 items-center">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-4">
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/images/products/${product.image}`}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover mb-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href="/products/1">
                        <Button className="bg-red hover:bg-yellow">
                          Lihat Product
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-xl font-bold">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
          <CarouselItem className="pl-2 md:pl-4 md:basis-1/ lg:basis-1/3 h-full text-center">
            <Link href={"/products"}>
              <Button className="bg-primary text-yellow hover:bg-yellow hover:text-white shadow-lg">
                Lihat Lainnya
              </Button>
            </Link>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
