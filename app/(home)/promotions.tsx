import PromotionsGallery from "@/components/imageGallery";

export default function Promotions() {
  return (
    <section className="mt-12 max-w-6xl mx-auto px-4">
      <div className="w-full mb-5 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <h3 className="font-bold text-6xl mb-4 text-white">Kabar Terbaru</h3>
          <h4 className="text-yellow mb-5 text-xl">
            Dapatkan Informasi terbaru dari kami
          </h4>
        </div>
        <div className="w-full md:w-2/3 bg-white p-4 rounded shadow-md">
          <PromotionsGallery />
        </div>
      </div>
    </section>
  );
}
