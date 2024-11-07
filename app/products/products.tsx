"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const categories = [
  {
    id: 1,
    name: "Perkakas Listrik",
    subcategories: [
      { id: 11, name: "Gerinda" },
      { id: 12, name: "Mesin Gergaji" },
      { id: 13, name: "Mesin Poles" },
      { id: 14, name: "Bor" },
    ],
  },
  {
    id: 2,
    name: "Perkakas",
    subcategories: [
      { id: 21, name: "Keamanan Diri" },
      { id: 22, name: "Pengukuran" },
      { id: 23, name: "Gergaji" },
      { id: 24, name: "Palu dan Kapak" },
    ],
  },
  {
    id: 3,
    name: "Peralatan Listrik",
    subcategories: [{ id: 31, name: "Bor" }],
  },
];

export const products = [
  {
    id: 1,
    name: "Krisbow Gerinda",
    category: "Perkakas Listrik",
    subcategory: "Gerinda",
    image: "gerinda.png",
    price: 374900,
    reviews: 100,
  },
  {
    id: 2,
    name: "Worx Jigsaw 10 Cm 750 W",
    category: "Perkakas Listrik",
    subcategory: "Mesin Gergaji",
    image: "work-jigsaw.png",
    price: 896400,
    reviews: 200,
  },
  {
    id: 3,
    name: "Krisbow Brim Helm Kuning",
    category: "Perkakas",
    subcategory: "Keamanan Diri",
    image: "krisbow-helm.png",
    price: 92900,
    reviews: 1200,
  },
  {
    id: 4,
    name: "Krisbow Kacamata Pengaman",
    category: "Perkakas",
    subcategory: "Keamanan Diri",
    image: "kacamata-pengaman.png",
    price: 200000,
    reviews: 1200,
  },
  {
    id: 5,
    name: "Krisbow Mikrometer Luar 0-25mm/0.01mm",
    category: "Perkakas",
    subcategory: "Pengukuran",
    image: "micrometer.png",
    price: 329900,
    reviews: 1200,
  },
  {
    id: 6,
    name: "Worx Mesin Amplas Kayu 250W",
    category: "Perkakas Listrik",
    subcategory: "Mesin Poles",
    image: "worx-mesin-amplas-kayu-250w.png",
    price: 503400,
    reviews: 120,
  },
  {
    id: 7,
    name: "Tactix Jangka Sorong Digital 15 Cm",
    category: "Perkakas",
    subcategory: "Pengukuran",
    image: "tactix-jangka-sorong-digital-15-cm.png",
    price: 503400,
    reviews: 120,
  },
  {
    id: 8,
    name: "Greenworks Mesin Amplas Kayu Orbital 12.5 Cm 24v",
    category: "Perkakas Listrik",
    subcategory: "Bor",
    image: "greenworks-mesin-amplas-kayu-orbital-12-5-cm-24v.png",
    price: 832300,
    reviews: 120,
  },
  {
    id: 9,
    name: "Krisbow Bor Cordless Impact 10 Mm 12v Ircid122",
    category: "Perkakas Listrik",
    subcategory: "Bor",
    image: "krisbow-bor-cordless-impact-10-mm-12v-Ircid122.png",
    price: 799920,
    reviews: 120,
  },
  {
    id: 10,
    name: "Worx Bor Cordless Rotary Hammer 26 Mm 20v Wx392.1",
    category: "Perkakas Listrik",
    subcategory: "Bor",
    image: "worx-bor-cordless-rotary-hammer-26-mm-20v-wx392-1.png",
    price: 1891450,
    reviews: 133,
  },
  {
    id: 11,
    name: "Krisbow Gergaji Besi Square Type 30cm",
    category: "Perkakas",
    subcategory: "Gergaji",
    image: "Krisbow-gergaji-besi-square-type-30cm.png",
    price: 27400,
    reviews: 133,
  },
  {
    id: 12,
    name: "Greenworks Gergaji Sirkular Cordless 6 Inci 24v",
    category: "Perkakas Listrik",
    subcategory: "Bor",
    image: "greenworks-gergaji-sirkular-cordless-6-inci-24v.png",
    price: 1588300,
    reviews: 133,
  },
  {
    id: 13,
    name: "Krisbow Palu Kambing Dengan Handle Rubber 220 Gr",
    category: "Perkakas",
    subcategory: "Palu dan Kapak",
    image: "krisbow-palu-kambing-dengan-handle-rubber-220-gram.png",
    price: 67900,
    reviews: 77,
  },
  {
    id: 14,
    name: "Tactix Maru Palu Dengan Handle Fiberglass 226 Gr",
    category: "Perkakas",
    subcategory: "Palu dan Kapak",
    image: "tactix-maru-palu-dengan-handle-fiberglass-226-gr.png",
    price: 90930,
    reviews: 77,
  },
  {
    id: 15,
    name: "Krisbow Obeng Nirkabel Bmc 3.6v Ircs362",
    category: "Peralatan Listrik",
    subcategory: "Bor",
    image: "krisbow-obeng-nirkabel-bmc-3.6v-Ircs362.png",
    price: 379900,
    reviews: 67,
  },
  {
    id: 16,
    name: "Worx Bor Listrik Impact 600 Watt 13 Mm Wx317.3",
    category: "Peralatan Listrik",
    subcategory: "Bor",
    image: "worx-bor-listrik-impact-600-watt-13-mm-wx317.3.png",
    price: 896400,
    reviews: 55,
  },
  {
    id: 17,
    name: "Krisbow Mesin Gergaji Jigsaw Cordless 18v Esj-18c",
    category: "Peralatan Listrik",
    subcategory: "Bor",
    image: "krisbow-mesin-gergaji-jigsaw-cordless-18v-esj-18c.png",
    price: 1332000,
    reviews: 67,
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    Record<number, boolean>
  >({});
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Record<number, boolean>
  >({});
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [minReviews, setMinReviews] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    setSelectedCategories((prev) => ({ ...prev, [categoryId]: checked }));
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      const subcategoryUpdates = category.subcategories.reduce(
        (acc, subcat) => {
          acc[subcat.id] = checked;
          return acc;
        },
        {} as Record<number, boolean>
      );
      setSelectedSubcategories((prev) => ({ ...prev, ...subcategoryUpdates }));
    }
  };

  const handleSubcategoryChange = (
    categoryId: number,
    subcategoryId: number,
    checked: boolean
  ) => {
    setSelectedSubcategories((prev) => ({ ...prev, [subcategoryId]: checked }));
  };

  const isSubcategorySelected = (categoryId: number) => {
    return (
      categories
        .find((cat) => cat.id === categoryId)
        ?.subcategories.some((subcat) => selectedSubcategories[subcat.id]) ||
      false
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    const reviewMatch = product.reviews >= minReviews;

    const categorySelected =
      selectedCategories[
        categories.find((cat) => cat.name === product.category)?.id ?? -1
      ];
    const subcategorySelected =
      selectedSubcategories[
        categories
          .find((cat) => cat.name === product.category)
          ?.subcategories.find((subcat) => subcat.name === product.subcategory)
          ?.id ?? -1
      ];

    const categoryMatch = categorySelected || subcategorySelected;

    // If no category or subcategory is selected, show all products
    const anyCategorySelected =
      Object.values(selectedCategories).some(Boolean) ||
      Object.values(selectedSubcategories).some(Boolean);

    return (
      matchesSearch &&
      priceMatch &&
      reviewMatch &&
      (anyCategorySelected ? categoryMatch : true)
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategories,
    selectedSubcategories,
    minPrice,
    maxPrice,
    minReviews,
  ]);

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
      <div className="flex flex-col md:flex-row min-h-screen pt-16">
        {/* Sidebar for filters */}
        <aside className="w-full md:w-64 bg-primary border border-yellow p-4">
          <h2 className="text-2xl font-bold text-yellow mb-4">Filters</h2>

          {/* Categories */}
          <div className="mb-6 text-white">
            <h3 className="font-semibold mb-2 text-yellow">
              Berdasarkan Kategori
            </h3>
            {categories.map((category) => (
              <div key={category.id} className="mb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories[category.id]}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                    className="bg-white"
                  />
                  <Label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </Label>
                </div>
                <div className="ml-6 mt-1 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`subcategory-${subcategory.id}`}
                        checked={selectedSubcategories[subcategory.id] || false}
                        onCheckedChange={(checked) =>
                          handleSubcategoryChange(
                            category.id,
                            subcategory.id,
                            checked as boolean
                          )
                        }
                        className="bg-white"
                      />
                      <Label htmlFor={`subcategory-${subcategory.id}`}>
                        {subcategory.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-yellow">
              Berdasarkan Harga
            </h3>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-1/2"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-1/2"
              />
            </div>
          </div>

          {/* Minimum Reviews */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-yellow">
              Berdasarkan Jumlah Review
            </h3>
            <Select onValueChange={(value) => setMinReviews(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select minimum reviews" />
              </SelectTrigger>
              <SelectContent className="bg-yellow">
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="100">100+</SelectItem>
                <SelectItem value="500">500+</SelectItem>
                <SelectItem value="1000">1000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-16">
          {/* Search bar */}
          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
              >
                <CardContent className="p-4">
                  <div className="relative overflow-hidden">
                    <img
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
                  <h3 className="text-lg font-semibold h-16">
                    {product.name.length > 40
                      ? product.name.slice(0, 40) + "..."
                      : product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.category} - {product.subcategory}
                  </p>
                  <p className="text-xl font-bold">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                  <p className="text-slate-400">Review: {product.reviews} </p>
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

              // <div
              //   key={product.id}
              //   className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              // >
              //   <div>
              //     <Link href="/products/2">
              //       <img
              //         src={`/images/products/${product.image}`}
              //         alt={product.name}
              //         className="w-full h-full object-cover "
              //       />
              //     </Link>
              //   </div>
              //   <h3 className="font-semibold">{product.name}</h3>
              // <p className="text-sm text-gray-600">
              //   {product.category} - {product.subcategory}
              // </p>
              //   <p className="mt-2 font-bold">
              //     {product.price.toLocaleString("id-ID", {
              //       style: "currency",
              //       currency: "IDR",
              //     })}
              //   </p>
              //   <p className="text-sm text-gray-500">
              //     {product.reviews} reviews
              //   </p>
              //   <Button className="mt-2 w-full">Add to Cart</Button>
              // </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No products found.</p>
          )}

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                  />
                </PaginationItem>
                {[
                  ...Array(
                    Math.ceil(filteredProducts.length / productsPerPage)
                  ),
                ].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => paginate(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      paginate(
                        Math.min(
                          Math.ceil(filteredProducts.length / productsPerPage),
                          currentPage + 1
                        )
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
}
