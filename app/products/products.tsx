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

const categories = [
  {
    id: 1,
    name: "Electronics",
    subcategories: [
      { id: 11, name: "Smartphones" },
      { id: 12, name: "Laptops" },
      { id: 13, name: "Accessories" },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    subcategories: [
      { id: 21, name: "Men" },
      { id: 22, name: "Women" },
      { id: 23, name: "Kids" },
    ],
  },
  {
    id: 3,
    name: "Home & Garden",
    subcategories: [
      { id: 31, name: "Furniture" },
      { id: 32, name: "Decor" },
      { id: 33, name: "Gardening" },
    ],
  },
];

const products = [
  {
    id: 1,
    name: "iPhone 12",
    category: "Electronics",
    subcategory: "Smartphones",
    image: "acer-aspire-a514-53.png",
    price: 799,
    reviews: 1200,
  },
  {
    id: 2,
    name: "MacBook Pro",
    category: "Electronics",
    subcategory: "Laptops",
    image: "cupboard.png",
    price: 1299,
    reviews: 980,
  },
  {
    id: 3,
    name: "AirPods Pro",
    category: "Electronics",
    subcategory: "Accessories",
    image: "cupboard.png",
    price: 249,
    reviews: 2100,
  },
  {
    id: 4,
    name: "Men's Slim Shirt",
    category: "Clothing",
    subcategory: "Men",
    image: "desk-chair.png",
    price: 39,
    reviews: 450,
  },
  {
    id: 5,
    name: "Women's Dress",
    category: "Clothing",
    subcategory: "Women",
    image: "desk-chair.png",
    price: 59,
    reviews: 720,
  },
  {
    id: 6,
    name: "Kids' Sneakers",
    category: "Clothing",
    subcategory: "Kids",
    image: "desk-chair.png",
    price: 45,
    reviews: 280,
  },
  {
    id: 7,
    name: "Leather Sofa",
    category: "Home & Garden",
    subcategory: "Furniture",
    image: "desk-chair.png",
    price: 899,
    reviews: 150,
  },
  {
    id: 8,
    name: "Wall Clock",
    category: "Home & Garden",
    subcategory: "Decor",
    image: "desk-chair.png",
    price: 29,
    reviews: 890,
  },
  {
    id: 9,
    name: "Garden Hose",
    category: "Home & Garden",
    subcategory: "Gardening",
    image: "desk-chair.png",
    price: 19,
    reviews: 340,
  },
  {
    id: 10,
    name: "Samsung Galaxy S21",
    category: "Electronics",
    subcategory: "Smartphones",
    image: "desk-chair.png",
    price: 799,
    reviews: 1500,
  },
  {
    id: 11,
    name: "Dell XPS 13",
    category: "Electronics",
    subcategory: "Laptops",
    image: "desk-chair.png",
    price: 999,
    reviews: 760,
  },
  {
    id: 12,
    name: "Wireless Mouse",
    category: "Electronics",
    subcategory: "Accessories",
    image: "desk-chair.png",
    price: 29,
    reviews: 1800,
  },
  {
    id: 13,
    name: "Men's Jeans",
    category: "Clothing",
    subcategory: "Men",
    image: "desk-chair.png",
    price: 49,
    reviews: 620,
  },
  {
    id: 14,
    name: "Women's Blouse",
    category: "Clothing",
    subcategory: "Women",
    image: "desk-chair.png",
    price: 34,
    reviews: 410,
  },
  {
    id: 15,
    name: "Kids' Pajamas",
    category: "Clothing",
    subcategory: "Kids",
    image: "desk-chair.png",
    price: 25,
    reviews: 190,
  },
  {
    id: 16,
    name: "Dining Table Set",
    category: "Home & Garden",
    subcategory: "Furniture",
    image: "desk-chair.png",
    price: 599,
    reviews: 80,
  },
  {
    id: 17,
    name: "Table Lamp",
    category: "Home & Garden",
    subcategory: "Decor",
    image: "desk-chair.png",
    price: 39,
    reviews: 560,
  },
  {
    id: 18,
    name: "Pruning Shears",
    category: "Home & Garden",
    subcategory: "Gardening",
    image: "desk-chair.png",
    price: 15,
    reviews: 230,
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
  const [maxPrice, setMaxPrice] = useState<number>(1500);
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
    // Remove the line that was automatically selecting the parent category
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
            <h3 className="font-semibold mb-2 text-yellow">Categories</h3>
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
            <h3 className="font-semibold mb-2 text-yellow">Price Range</h3>
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
            <h3 className="font-semibold mb-2 text-yellow">Minimum Reviews</h3>
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
                className="group hover:shadow-lg transition-shadow duration-300"
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
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.category} - {product.subcategory}
                  </p>
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
