"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Store() {
  const [wishlist, setWishlist] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [selectedSize, setSelectedSize] = useState({}); 
  const [availability] = useState({
    "T-shirt": "In stock",
    "Jeans": "Out of stock",
    "Jacket": "In stock",
    "Shoes": "In stock",
    "Hat": "Out of stock",
    "Shirt": "In stock",
    "Jeans2": "In stock",
  });

  const products = [
    { name: "T-shirt", price: "$20", image: "/images/t-shirt.jpg", sizes: ["S", "M", "L"] },
    { name: "Jeans", price: "$40", image: "/images/jeans.jpg", sizes: ["28", "30", "32"] },
    { name: "Jacket", price: "$60", image: "/images/jacket.jpg", sizes: ["M", "L", "XL"] },
    { name: "Shoes", price: "$80", image: "/images/shoes.jpg", sizes: ["8", "9", "10"] },
    { name: "Hat", price: "$15", image: "/images/hat.jpg", sizes: ["One size"] },
    { name: "Shirt", price: "$30", image: "/images/shirt.jpg", sizes: ["S", "M", "L", "XL"] },
    { name: "Jeans2", price: "$40", image: "/images/jeans2.jpg", sizes: ["28", "30", "32"] },
  ];

  const handleSizeSelect = (productName, size) => {
    setSelectedSize((prevSizes) => ({
      ...prevSizes,
      [productName]: size,
    }));
  };

  const handleAvailability = (productName) => {
    return availability[productName] || "Unknown";
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.name === product.name)) {
        return prevWishlist.filter((item) => item.name !== product.name); // Remove from wishlist
      } else {
        return [...prevWishlist, product]; // Add to wishlist
      }
    });
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to the cart
  };

  const router = useRouter(); // To navigate to the wishlist page

  const goToWishlist = () => {
    router.push("/wishlist"); // Navigate to the wishlist page
  };

  return (
    <div className="p-10">
      {/* Wishlist Button at the top-left */}
      <div className="mb-8">
        <button
          onClick={goToWishlist} // Navigate to the wishlist page
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Wishlist ({wishlist.length})
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-blue-600">Fashiox Store</h1>

      {/* Store Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {products.map((product, index) => (
          <div key={index} className="border p-5 rounded-lg shadow-sm text-center border-blue-300">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="mx-auto rounded"
            />
            <h2 className="text-xl font-bold mt-4 text-blue-600">{product.name}</h2>
            <p className="text-blue-500 font-bold">{product.price}</p>
            <p className="text-green-500">{handleAvailability(product.name)}</p>

            {/* Size Selection for T-shirt, Shirt, Jacket, Jeans */}
            {(product.name === "T-shirt" || product.name === "Shirt" || product.name === "Jacket" || product.name === "Jeans") && (
              <div className="mt-4">
                <p className="font-bold">Select Size:</p>
                <div className="flex justify-center space-x-4">
                  {product.sizes.map((size, sizeIndex) => (
                    <button
                      key={sizeIndex}
                      onClick={() => handleSizeSelect(product.name, size)}
                      className={`px-4 py-2 rounded-lg ${selectedSize[product.name] === size ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} transition-colors duration-300`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Status */}
            <div className="mt-4">
              <p className="font-bold">Availability: {handleAvailability(product.name)}</p>
            </div>

            {/* Add to Wishlist and Add to Cart Buttons */}
            <div className="mt-4 space-x-4">
              <button
                onClick={() => toggleWishlist(product)}
                className={`px-4 py-2 rounded-lg ${wishlist.some(item => item.name === product.name) ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'} transition-colors duration-300`}
              >
                {wishlist.some(item => item.name === product.name) ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                onClick={() => addToCart(product)}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
