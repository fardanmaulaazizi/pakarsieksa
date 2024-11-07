import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { banner } from "@/data/banner";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banner.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden h-screen">
      {banner.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`/images/banner/${slide.image}`}
            width={1920}
            height={1080}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-32 md:w-44 mb-2 mx-auto hover:-rotate-45 transition-all duration-150 cursor-pointer shadow-md"
              />
              <h2 className="text-lg md:text-4xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-md md:text-xl mb-8">{slide.description}</p>
              <Link href="/product">
                <Button
                  size="lg"
                  className="bg-yellow text-white hover:bg-yellow-300"
                >
                  Beli Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + banner.length) % banner.length
          )
        }
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={() =>
          setCurrentSlide((prevSlide) => (prevSlide + 1) % banner.length)
        }
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>
    </section>
  );
}
