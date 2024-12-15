"use client";
import { useState } from "react";
import Image from "next/image";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      // Check if the item already exists in the wishlist
      if (prevWishlist.some((item) => item.name === product.name)) {
        return prevWishlist; // If exists, don't add again
      }
      return [...prevWishlist, product]; // Otherwise, add it
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (product) => {
    setWishlist((prevWishlist) => {
      return prevWishlist.filter((item) => item.name !== product.name);
    });
  };

  // Sample products to demonstrate functionality
  const products = [
    { name: "T-shirt", price: "$20", image: "/images/t-shirt.jpg" },
    { name: "Jeans", price: "$40", image: "/images/jeans.jpg" },
    { name: "Jacket", price: "$60", image: "/images/jacket.jpg" },
    { name: "Shoes", price: "$80", image: "/images/shoes.jpg" },
    { name: "Hat", price: "$15", image: "/images/hat.jpg" },
    { name: "Shirt", price: "$30", image: "/images/shirt.jpg" },
  ];

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Your Wishlist</h1>

      {/* If no items are in the wishlist */}
      {wishlist.length === 0 ? (
        <p className="text-xl text-center text-gray-500">Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Show each item in the wishlist */}
          {wishlist.map((product) => (
            <div
              key={product.name}
              className="flex flex-col border p-5 rounded-lg shadow-sm text-center border-blue-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="mx-auto rounded"
                />
              </div>
              <h2 className="text-xl font-bold mt-4 text-blue-600">{product.name}</h2>
              <p className="text-blue-500 font-bold">{product.price}</p>

              <button
                onClick={() => removeFromWishlist(product)}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white transition-colors duration-300"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Products to be added to wishlist */}
      <h2 className="text-3xl font-bold mt-10 text-blue-600">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex flex-col border p-5 rounded-lg shadow-sm text-center border-blue-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="mx-auto rounded"
              />
            </div>
            <h2 className="text-xl font-bold mt-4 text-blue-600">{product.name}</h2>
            <p className="text-blue-500 font-bold">{product.price}</p>

            <button
              onClick={() => addToWishlist(product)}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white transition-colors duration-300"
            >
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
