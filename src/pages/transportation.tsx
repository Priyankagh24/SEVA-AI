import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, DollarSign, Star, User, Phone, MessageSquare, Shield, Zap, Car, Bike, Bus, Truck, Users, ChevronRight, ChevronLeft, Search, Filter, Heart, Gift, Wallet, CreditCard, History, Map, Share2, Menu, X, Bell, Settings, Award, TrendingUp, Calendar, Package } from "lucide-react";


interface TransportProps {
  onBack?: () => void;
}

export default function TransportService({ onBack }: TransportProps) {
  const [activeTab, setActiveTab] = useState("book");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [currentRide, setCurrentRide] = useState(null);
  const [savedPlaces, setSavedPlaces] = useState([
    { id: 1, name: "Home", address: "123 Main Street, Bhubaneswar", icon: "🏠" },
    { id: 2, name: "Work", address: "Tech Park, Patia, Bhubaneswar", icon: "💼" },
    { id: 3, name: "Hospital", address: "AIIMS Bhubaneswar", icon: "🏥" }
  ]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const vehicles = [
    { id: "bike", name: "Bike", icon: Bike, capacity: "1", time: "2 min", price: 45, priceKm: 8, discount: 20, color: "blue", popular: true },
    { id: "auto", name: "Auto", icon: Car, capacity: "3", time: "3 min", price: 65, priceKm: 12, discount: 15, color: "yellow", popular: false },
    { id: "mini", name: "Mini", icon: Car, capacity: "4", time: "4 min", price: 95, priceKm: 15, discount: 10, color: "green", popular: true },
    { id: "sedan", name: "Sedan", icon: Car, capacity: "4", time: "5 min", price: 135, priceKm: 18, discount: 5, color: "purple", popular: false },
    { id: "suv", name: "SUV", icon: Truck, capacity: "6", time: "6 min", price: 185, priceKm: 22, discount: 0, color: "red", popular: false },
    { id: "share", name: "Share", icon: Users, capacity: "4", time: "8 min", price: 35, priceKm: 6, discount: 30, color: "teal", popular: true }
  ];

  const nearbyDrivers = [
    { id: 1, name: "Rajesh Kumar", rating: 4.9, trips: 1247, vehicle: "Bike", distance: "0.5 km", time: "2 min", photo: "👨", verified: true },
    { id: 2, name: "Amit Patel", rating: 4.8, trips: 892, vehicle: "Auto", distance: "0.8 km", time: "3 min", photo: "👨", verified: true },
    { id: 3, name: "Priya Singh", rating: 4.95, trips: 2103, vehicle: "Mini", distance: "1.2 km", time: "4 min", photo: "👩", verified: true }
  ];

  const offers = [
    { id: 1, code: "RIDE50", discount: "50% OFF", desc: "On your first ride", valid: "Valid till Dec 31", color: "from-blue-500 to-blue-600" },
    { id: 2, code: "WEEKEND", discount: "30% OFF", desc: "Weekend special", valid: "Sat & Sun only", color: "from-purple-500 to-purple-600" },
    { id: 3, code: "SAVE20", discount: "₹20 OFF", desc: "On rides above ₹100", valid: "Use 5 times", color: "from-green-500 to-green-600" }
  ];

  const recentRides = [
    { id: 1, from: "Home", to: "Tech Park", vehicle: "Bike", fare: 45, date: "Today, 9:30 AM", driver: "Rajesh Kumar", rating: 4.9 },
    { id: 2, from: "Tech Park", to: "City Mall", vehicle: "Auto", fare: 65, date: "Yesterday, 6:45 PM", driver: "Amit Patel", rating: 4.8 },
    { id: 3, from: "City Mall", to: "Home", vehicle: "Mini", fare: 95, date: "Nov 20, 8:15 PM", driver: "Priya Singh", rating: 4.95 }
  ];



  const handleBookRide = () => {
    if (selectedVehicle && pickup && dropoff) {
      setCurrentRide({
        vehicle: vehicles.find(v => v.id === selectedVehicle),
        driver: nearbyDrivers[0],
        pickup,
        dropoff,
        fare: vehicles.find(v => v.id === selectedVehicle).price,
        status: "searching"
      });
      setBookingStep(2);
      
      setTimeout(() => {
        setCurrentRide(prev => ({ ...prev, status: "driver_found" }));
        setBookingStep(3);
      }, 3000);
    }
  };

  const renderBooking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <Navigation className="w-7 h-7 text-blue-600" />
          <span>Book Your Ride</span>
        </h2>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <div className="absolute left-4 top-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup location"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
            />
            <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <Navigation className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Drop-off location"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
            />
            <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Saved Places</h3>
          <div className="grid grid-cols-3 gap-3">
            {savedPlaces.map(place => (
              <button
                key={place.id}
                onClick={() => setDropoff(place.address)}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <span className="text-3xl mb-2">{place.icon}</span>
                <span className="text-sm font-semibold text-gray-900">{place.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Choose Vehicle</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {vehicles.map(vehicle => {
              const VehicleIcon = vehicle.icon;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedVehicle === vehicle.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {vehicle.popular && (
                    <span className="absolute top-2 right-2 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full font-bold">
                      Popular
                    </span>
                  )}
                  {vehicle.discount > 0 && (
                    <span className="absolute top-2 left-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">
                      {vehicle.discount}% OFF
                    </span>
                  )}
                  <div className={`w-16 h-16 bg-${vehicle.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <VehicleIcon className={`w-10 h-10 text-${vehicle.color}-600`} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{vehicle.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{vehicle.capacity} seats • {vehicle.time} away</p>
                  <p className="text-xl font-bold text-gray-900">₹{vehicle.price}</p>
                  <p className="text-xs text-gray-500">₹{vehicle.priceKm}/km</p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleBookRide}
          disabled={!selectedVehicle || !pickup || !dropoff}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          Book Ride Now
        </button>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Gift className="w-6 h-6" />
            <h3 className="font-bold text-lg">Special Offers</h3>
          </div>
          <button className="text-sm font-semibold underline">View All</button>
        </div>
        <div className="space-y-3">
          {offers.slice(0, 2).map(offer => (
            <div key={offer.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">{offer.discount}</p>
                <p className="text-sm opacity-90">{offer.desc}</p>
                <p className="text-xs opacity-75 mt-1">{offer.valid}</p>
              </div>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                {offer.code}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRides = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <History className="w-7 h-7 text-purple-600" />
          <span>Recent Rides</span>
        </h2>

        <div className="space-y-4">
          {recentRides.map(ride => (
            <div key={ride.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-500 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="font-semibold text-gray-900">{ride.from}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="font-semibold text-gray-900">{ride.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">₹{ride.fare}</p>
                  <p className="text-sm text-gray-500">{ride.vehicle}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👨</span>
                  <div>
                    <p className="font-semibold text-sm">{ride.driver}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold">{ride.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{ride.date}</p>
                  <button className="text-xs text-blue-600 font-semibold mt-1">Book Again</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <Award className="w-12 h-12 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Ride Rewards</h3>
          <p className="text-3xl font-bold mb-2">2,450 Points</p>
          <p className="text-sm opacity-90 mb-4">Redeem for free rides & cashback</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
            View Rewards
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <TrendingUp className="w-12 h-12 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Total Savings</h3>
          <p className="text-3xl font-bold mb-2">₹1,240</p>
          <p className="text-sm opacity-90 mb-4">Saved with offers this month</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
            More Offers
          </button>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <Calendar className="w-7 h-7 text-indigo-600" />
        <span>Schedule Ride</span>
      </h2>

      <div className="space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
            <input type="time" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
          <input type="text" placeholder="Enter pickup location" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Drop Location</label>
          <input type="text" placeholder="Enter drop location" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type</label>
          <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none">
            <option>Select vehicle</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
        Schedule Ride
      </button>

      <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
        <h3 className="font-semibold text-indigo-900 mb-2">💡 Pro Tips</h3>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li>• Schedule at least 30 minutes in advance</li>
          <li>• Get 10% discount on scheduled rides</li>
          <li>• Driver will be assigned 15 mins before pickup</li>
        </ul>
      </div>
    </div>
  );

  const renderPackage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <Package className="w-7 h-7 text-teal-600" />
          <span>Package Delivery</span>
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Package Size</label>
            <div className="grid grid-cols-3 gap-3">
              {["Small", "Medium", "Large"].map(size => (
                <button key={size} className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all">
                  <p className="font-semibold">{size}</p>
                  <p className="text-xs text-gray-500">{size === "Small" ? "< 5kg" : size === "Medium" ? "5-15kg" : "15-30kg"}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Address</label>
            <input type="text" placeholder="Enter pickup address" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
            <input type="text" placeholder="Enter delivery address" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Receiver Name</label>
              <input type="text" placeholder="Full name" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Receiver Phone</label>
              <input type="tel" placeholder="Phone number" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="text-2xl font-bold text-teal-600">30-45 min</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Delivery Fee</p>
              <p className="text-2xl font-bold text-teal-600">₹65</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg">
          Book Package Delivery
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-4 border-2 border-orange-300">
          <Zap className="w-8 h-8 text-orange-600 mb-2" />
          <h3 className="font-bold text-gray-900">Express</h3>
          <p className="text-sm text-gray-600">15-20 min delivery</p>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 border-2 border-blue-300">
          <Shield className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold text-gray-900">Insured</h3>
          <p className="text-sm text-gray-600">Up to ₹10,000</p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 border-2 border-green-300">
          <MapPin className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="font-bold text-gray-900">Track Live</h3>
          <p className="text-sm text-gray-600">Real-time tracking</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">


      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RideMitra</h1>
                <p className="text-xs text-gray-500">Your Trusted Ride Partner</p>
              </div>
            </div>

      

            <div className="flex items-center space-x-2">
                     {/* Back Button */}
      {onBack && (
        <div className="p-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            ← Back
          </button>
        </div>
      )}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Welcome Back!</h2>
              <p className="text-blue-100 text-sm">Choose your service and get moving</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-blue-100">Total Rides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-blue-100">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex flex-wrap gap-2">
          {[
            { id: "book", icon: Car, label: "Book Ride" },
            { id: "rides", icon: History, label: "My Rides" },
            { id: "schedule", icon: Calendar, label: "Schedule" },
            { id: "package", icon: Package, label: "Delivery" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === "book" && renderBooking()}
        {activeTab === "rides" && renderRides()}
        {activeTab === "schedule" && renderSchedule()}
        {activeTab === "package" && renderPackage()}
      </main>
    </div>
  );
}