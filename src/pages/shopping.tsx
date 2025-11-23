import React, { useState } from 'react';
import { ShoppingCart, Heart, User, Trash2, ChevronRight, ChevronLeft, Search } from 'lucide-react';

interface Product {
  id: number;
  category: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
}

const products: Product[] = [
  { id: 1, category: 'Electronics', name: 'Laptop', brand: 'Dell', price: 70000, rating: 4.5, image: '/images/laptop.webp' },
  { id: 2, category: 'Electronics', name: 'Headphones', brand: 'Sony', price: 12000, rating: 4.3, image: '/images/headphones.webp' },
  { id: 3, category: 'Electronics', name: 'Camera', brand: 'Canon', price: 45000, rating: 4.6, image: '/images/camera.webp' },
  { id: 4, category: 'Electronics', name: 'Microwave', brand: 'Samsung', price: 8000, rating: 4.2, image: '/images/microwave.webp' },
  { id: 5, category: 'Electronics', name: 'Smartwatch', brand: 'Apple', price: 25000, rating: 4.8, image: '/images/smartwatch.webp' },
  { id: 6, category: 'Furniture', name: 'Bed', brand: 'Godrej', price: 15000, rating: 4.4, image: '/images/bed.webp' },
  { id: 7, category: 'Furniture', name: 'Sofa', brand: 'Ikea', price: 20000, rating: 4.6, image: '/images/sofa.webp' },
  { id: 8, category: 'Clothes', name: 'T-Shirt', brand: 'Nike', price: 1200, rating: 4.1, image: '/images/tshirt.webp' },
  { id: 9, category: 'Clothes', name: 'Jeans', brand: 'Levi\'s', price: 2500, rating: 4.3, image: '/images/jeans.webp' },
  { id: 10, category: 'Accessories', name: 'Sunglasses', brand: 'Ray-Ban', price: 5000, rating: 4.5, image: '/images/sunglasses.webp' },
  { id: 11, category: 'Accessories', name: 'Watch', brand: 'Fossil', price: 7000, rating: 4.4, image: '/images/watch.webp' },
  { id: 12, category: 'Mobile', name: 'iPhone 15', brand: 'Apple', price: 120000, rating: 4.8, image: '/images/iphone.webp' },
  { id: 13, category: 'Mobile', name: 'Galaxy S23', brand: 'Samsung', price: 90000, rating: 4.6, image: '/images/galaxy.webp' },
];

const categories = ['Electronics', 'Furniture', 'Clothes', 'Accessories', 'Mobile'];

interface ShoppingProps {
  onBack: () => void;
}

const Shopping: React.FC<ShoppingProps> = ({ onBack }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (product: Product) => setCart(prev => [...prev, product]);
  const addToWishlist = (product: Product) => {
    if (!wishlist.find(p => p.id === product.id)) setWishlist(prev => [...prev, product]);
  };
  const removeFromCart = (productId: number) => setCart(prev => prev.filter(p => p.id !== productId));

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}
      <div className="bg-blue-800 text-white flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="flex items-center space-x-1 hover:text-gray-200">
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">ShopEase</h1>
        </div>
        <div className="flex items-center space-x-4">
           <div className="flex text-gray-900">
    <input
      type="text"
      placeholder="Search products..."
      className="px-4 py-2 rounded-l-lg outline-none text-black w-64"
    />
    <button className="bg-yellow-400 px-4 py-2 rounded-r-lg flex items-center justify-center hover:bg-yellow-500">
      <Search className="w-5 h-5" />
    </button>
  </div>
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
          <User className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* WINTER SALE BANNER */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-8 mb-6">
        <h2 className="text-3xl font-bold">Winter Sale is Here!</h2>
        <p className="text-lg mt-2">Up to 50% off on selected products. Hurry up!</p>
      </div>

      {/* PROMO ADS */}
     <div className="flex gap-4 px-6 mb-6">
  <img
    src="/images/ad1.gif"
    alt="Ad 1"
    className="flex-1 h-20 object-cover rounded-lg shadow-lg"
  />
  <img
    src="/images/ad2.jpg"
    alt="Ad 2"
    className="flex-1 h-20 object-cover rounded-lg shadow-lg"
  />
  <img
    src="/images/ad3.jpg"
    alt="Ad 3"
    className="flex-1 h-20 object-cover rounded-lg shadow-lg"
  />
</div>
      {/* Categories */}
      <div className="flex space-x-4 px-6 mb-6">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === category
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-blue-50'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition relative">
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-3 rounded" />
            <h3 className="font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-lg font-semibold mt-1 text-gray-900">₹{product.price.toLocaleString()}</p>
            <p className="text-yellow-500">⭐ {product.rating}</p>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                <Heart className="w-4 h-4 inline text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Modal */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg p-4 rounded-lg w-80 max-h-[70vh] overflow-auto">
          <h3 className="font-bold text-gray-800 mb-2">Cart ({cart.length})</h3>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 font-bold text-gray-800">
            Total: ₹{cart.reduce((acc, item) => acc + item.price, 0).toLocaleString()}
          </div>
          <button className="mt-2 w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 flex items-center justify-center transition">
            Checkout <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Shopping;

