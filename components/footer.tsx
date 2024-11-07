import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-black mt-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col text-2xl justify-between items-center ">
          <p className="text-white text-lg text-center">
            10.000+ Jenis Alat Keperkakasan , Esok Penghantaran ke awak.
          </p>
          <h3 className="text-xl font-bold text-yellow  mb-5">- Pakarxie -</h3>
          <p className="text-yellow text-sm text-center hover:underline ">
            <Link
              href="emailto:tianyuanhardware@gmail.com"
              className="flex items-center gap-2 text-lg"
            >
              <Mail className="h-5" />
              Email: tianyuanhardware@gmail.com
            </Link>
          </p>
        </div>
        <div className="mt-8  border-t border-slate-100 text-center">
          <p className="text-sm text-yellow font-bold">
            &copy; 2024 Pakarxie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
