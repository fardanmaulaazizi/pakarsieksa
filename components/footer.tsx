import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { menu } from "@/data/menu";

export default function Footer() {
  return (
    <footer className="bg-primary text-black mt-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col text-2xl justify-between items-center gap-8">
          <h3 className="text-xl font-bold mb-4 text-yellow">
            Tentang Pakarsie
          </h3>
          <p className="text-white text-sm text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad nisi
            beatae saepe dignissimos, officiis tenetur consectetur, harum
            necessitatibus commodi ut ea. Rem fugit, assumenda quis dicta iure
            voluptate nesciunt consequatur laborum eos nihil quidem cupiditate
            voluptas similique aspernatur mollitia omnis nobis odio sint
            dolorem. Nihil voluptatum dolores, dignissimos quae maiores ducimus
            aperiam sapiente? Impedit, unde.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-yellow font-bold">
            &copy; 2024 Pakarsie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
