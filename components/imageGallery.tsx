"use client";

import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { promotionImages } from "@/data/promotion";

export default function PromotionsGallery() {
  const [selectedImage, setSelectedImage] = useState(promotionImages[0]);

  return (
    <div>
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-2/3 mb-3 md:me-5">
          <img
            src={selectedImage.image}
            alt={selectedImage.name}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="md:w-1/3">
          <ScrollArea className="rounded-md bg-yellow p-3">
            <div className="grid grid-cols-2 gap-2 ">
              {promotionImages.map((promotion) => (
                <button
                  key={promotion.id}
                  onClick={() => setSelectedImage(promotion)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-md",
                    selectedImage.id === promotion.id &&
                      "ring-2 ring-yellow-500"
                  )}
                >
                  <img
                    src={promotion.image}
                    alt={promotion.name}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
