import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const promotions = [
  {
    quote: "blablabla",
    name: "Udin",
    title: "Promotion 1",
  },
  {
    quote: "blablabla",
    name: "John Doe",
    title: "Promotion 1",
  },
];
export default function Categories() {
  return (
    <section className="py-5 bg-yellow">
      <div className="max-w-6xl mx-auto px-4">
        <div className="w-full mb-5">
          <h3 className="font-bold text-6xl mb-4 text-red text-center">
            Produk Kami
          </h3>
          <h4 className="text-slate-800 font-semibold text-xl text-center">
            Kami menyediakan seluruh kebutuhan anda
          </h4>
        </div>
        <InfiniteMovingCards items={promotions} />
      </div>
    </section>
  );
}
