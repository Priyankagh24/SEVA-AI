import React, { useState } from "react";
import { ShoppingCart, Heart, User, Search, Trash2 } from "lucide-react";

interface Item {
  id: number;
  name: string;
  price: number;
  from: string;
  type: "veggie" | "food" | "beverage" | "snack";
  image: string;
  rating: number;
  cuisine?: string;
  discount?: number;
  badge?: "New" | "Hot" | "Popular";
}

interface FoodProps {
  onBack: () => void;
  userData: { name: string; village: string };
}

// Fully populated items
const itemsData: Item[] = [
  // Veggies
  { id: 1, name: "Potato", price: 25, from: "Green Fresh Veggies", type: "veggie", image: "/images/potato.webp", rating: 4.2 },
  { id: 2, name: "Cucumber", price: 28, from: "Organic Farm", type: "veggie", image: "/images/Cucumber.webp", rating: 4.1 },
  { id: 3, name: "Spinach", price: 20, from: "Organic Farm", type: "veggie", image: "/images/spinach.jpg", rating: 4.0, badge: "Popular" },
  { id: 4, name: "Capsicum", price: 45, from: "Green Fresh Veggies", type: "veggie", image: "/images/capsicum.webp", rating: 4.3 },
  { id: 5, name: "Carrot", price: 40, from: "Organic Farm", type: "veggie", image: "/images/carrot.jpg", rating: 4.2 },
  { id: 6, name: "Cabbage", price: 30, from: "Village Market", type: "veggie", image: "/images/cabbage.webp", rating: 4.1 },
  { id: 7, name: "Bhindi", price: 60, from: "Village Market", type: "veggie", image: "/images/Bhindi.webp", rating: 4.4, discount: 5 },
  { id: 8, name: "Brinjal", price: 35, from: "Organic Farm", type: "veggie", image: "/images/brinjal.webp", rating: 4.0, badge: "New" },

  // Food
  { id: 9, name: "Chicken Biryani", price: 180, from: "Biryani House", type: "food", image: "/images/biryani.avif", rating: 4.5, cuisine: "North Indian", discount: 10 },
  { id: 10, name: "Veg Biryani", price: 140, from: "Biryani House", type: "food", image: "/images/vegbiryani.avif", rating: 4.3, cuisine: "North Indian" },
  { id: 11, name: "Paneer Butter Masala", price: 150, from: "North Indian Tadka", type: "food", image: "/images/paneer.avif", rating: 4.4, cuisine: "North Indian", badge: "Hot" },
  { id: 12, name: "Veg Thali", price: 260, from: "South Delight", type: "food", image: "/images/thali.avif", rating: 4.2 },
  { id: 13, name: "Mushroom fry", price: 90, from: "Momo Magic", type: "food", image: "/images/mushroom.avif", rating: 4.3 },

  // Beverages
  { id: 14, name: "Coca Cola", price: 40, from: "Beverage Station", type: "beverage", image: "/images/coke.avif", rating: 4.2 },
  { id: 15, name: "Amul Milk", price: 50, from: "Beverage Station", type: "beverage", image: "/images/amul.webp", rating: 4.4, badge: "Popular" },
  { id: 16, name: "Lassi", price: 35, from: "Local Dairy", type: "beverage", image: "/images/lassi.webp", rating: 4.3 },
  { id: 17, name: "Cold Coffee", price: 70, from: "Coffee Corner", type: "beverage", image: "/images/cofee.avif", rating: 4.5, discount: 10 },
  { id: 18, name: "Tea", price: 45, from: "Tea House", type: "beverage", image: "/images/tea.avif", rating: 4.3 },

  // Snacks
  { id: 19, name: "Samosa", price: 15, from: "Street Food Hub", type: "snack", image: "/images/samosa.avif", rating: 4.1, badge: "New" },
  { id: 20, name: "Waffle", price: 120, from: "North Indian Tadka", type: "snack", image: "/images/waffle.avif", rating: 4.6 },
  { id: 21, name: "French Fries", price: 50, from: "Burger Hub", type: "snack", image: "/images/fries.avif", rating: 4.2, discount: 5 },
  { id: 22, name: "Veg Sandwich", price: 70, from: "Sandwich Corner", type: "snack", image: "/images/sandwich.avif", rating: 4.3 },
  { id: 23, name: "Burger", price: 120, from: "Burger Hub", type: "snack", image: "/images/burger.avif", rating: 4.4 },
  { id: 24, name: "Chowmein", price: 70, from: "Noodle House", type: "snack", image: "/images/chowmein.avif", rating: 4.2, badge: "Hot" },
];

// Categories
const categories = ["Veggies", "Food", "Beverages", "Snacks"];

const Food: React.FC<FoodProps> = ({ onBack }) => {
  const [tab, setTab] = useState("Food");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Item[]>([]);
  const [wishlist, setWishlist] = useState<Item[]>([]);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "discount" | "newest">("newest");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const filteredItems = itemsData
    .filter(
      (item) =>
        (tab === "Veggies" && item.type === "veggie") ||
        (tab === "Food" && item.type === "food") ||
        (tab === "Beverages" && item.type === "beverage") ||
        (tab === "Snacks" && item.type === "snack")
    )
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return (b.discount || 0) - (a.discount || 0);
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  const addToWishlist = (item: Item) => {
    if (!wishlist.find((i) => i.id === item.id)) setWishlist([...wishlist, item]);
  };

  const removeFromCart = (item: Item) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

  const handleQuantityChange = (itemId: number, qty: number) => {
    setQuantities({ ...quantities, [itemId]: qty });
  };

  const frequentlyBought = filteredItems.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-blue-600 font-semibold flex items-center gap-1">
          ← Back
        </button>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="px-3 py-1 rounded-l-lg outline-none border"
            />
            <button className="bg-red-600 px-3 py-1 rounded-r-lg">
              <Search className="w-5 h-5 text-white" />
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

      {/* Banner */}
      <div className="relative bg-red-600 rounded-xl overflow-hidden mb-6 shadow-lg">
        <img
          src="/images/banner-food.avif"
          alt="Big Sale Banner"
          className="w-full h-48 object-cover brightness-90"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            Enjoy discounts on your favorite snacks, beverages & fresh veggies!
          </h2>
          <p className="text-white text-lg mb-4">
            Get up to 50% off on fresh veggies, snacks & beverages!
          </p>
          <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition">
            Order Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-4">
        {categories.map((c) => (
          <button
            key={c}
            className={`px-4 py-2 rounded-full font-semibold ${
              tab === c ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Sorting */}
      <div className="flex justify-end mb-2">
        <select
          className="border px-3 py-1 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="newest">Newest</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
        </select>
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-3 flex flex-col justify-between relative">
            {item.badge && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 text-xs rounded">
                {item.badge}
              </span>
            )}
            {item.discount && (
              <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 text-xs rounded">
                {item.discount}% OFF
              </span>
            )}
            <img src={item.image} alt={item.name} className="h-28 w-full object-cover rounded-md mb-2" />
            <h3 className="font-semibold">{item.name}</h3>
            {item.cuisine && <p className="text-sm text-gray-500">{item.cuisine}</p>}
            <p className="text-gray-600 text-sm">From: {item.from}</p>
            <p className="text-green-700 font-semibold mt-1">₹{item.price}</p>
            <p className="text-yellow-500">⭐ {item.rating}</p>

            {/* Quantity & Add Buttons */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min={1}
                value={quantities[item.id] || 1}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="w-16 text-center border rounded"
              />
              <button
                className="flex-1 bg-red-600 text-white py-1 rounded flex items-center justify-center gap-1"
                onClick={() => addToCart({ ...item, price: item.price * (quantities[item.id] || 1) })}
              >
                <ShoppingCart size={14} /> Add
              </button>
              <button
                className="bg-gray-200 p-1 rounded flex items-center justify-center"
                onClick={() => addToWishlist(item)}
              >
                <Heart size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Frequently Bought Together */}
      {frequentlyBought.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="font-bold mb-2">Frequently Bought Together</h2>
          <div className="flex gap-4 overflow-x-auto">
            {frequentlyBought.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg shadow p-2 min-w-[140px]">
                <img src={item.image} alt={item.name} className="h-24 w-full object-cover rounded" />
                <p className="text-sm font-semibold mt-1">{item.name}</p>
                <p className="text-green-700 text-sm">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="font-bold mb-2">You May Also Like</h2>
        <div className="flex gap-4 overflow-x-auto">
          {itemsData.slice(0, 5).map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg shadow p-2 min-w-[140px]">
              <img src={item.image} alt={item.name} className="h-24 w-full object-cover rounded" />
              <p className="text-sm font-semibold mt-1">{item.name}</p>
              <p className="text-green-700 text-sm">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 right-0 w-80 bg-white shadow-lg p-4 rounded-tl-lg rounded-bl-lg max-h-96 overflow-auto">
          <h2 className="font-bold mb-2">Your Order ({cart.length})</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-1 bg-gray-50 p-2 rounded">
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item)}>
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          ))}
          <p className="mt-2 font-semibold">Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</p>
          <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg">Checkout</button>
        </div>
      )}

      {/* Wishlist Drawer */}
      {wishlist.length > 0 && (
        <div className="fixed bottom-0 left-0 w-80 bg-white shadow-lg p-4 rounded-tr-lg rounded-br-lg max-h-96 overflow-auto">
          <h2 className="font-bold mb-2">Wishlist ({wishlist.length})</h2>
          {wishlist.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-1 bg-gray-50 p-2 rounded">
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setWishlist(wishlist.filter((i) => i.id !== item.id))} className="text-red-500">
                  Remove
                </button>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Food;
