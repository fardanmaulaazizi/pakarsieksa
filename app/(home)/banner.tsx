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
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-transparent flex items-center justify-center md:justify-start ">
            <div className=" text-white text-center md:text-start md:ms-24 md:w-full p-3">
              <h2 className="text-3xl text-center md:text-start md:text-7xl font-bold mb-8 md:w-2/5 ">
                {slide.title}
              </h2>
              <p className="text-xl md:text-3xl mb-8 md:w-2/5">
                {slide.description}
              </p>
              <Link href="/product">
                <Button
                  size={"lg"}
                  className="bg-primary text-white text-xl hover:bg-red py-6 px-7"
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
