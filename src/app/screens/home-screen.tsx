import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapPin, Search, Home, ShoppingBag, User, Star, Clock, ChevronDown } from "lucide-react";
import { restaurants, foodItems } from "../data/food-data";

export function HomeScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Office Tower B, KL");

  // Filter restaurants and food based on selected filter and search
  const getFilteredItems = () => {
    let items = [...foodItems];

    // Apply filter
    if (selectedFilter === "halal") {
      items = items.filter(item => item.isHalal);
    } else if (selectedFilter === "budget") {
      items = items.filter(item => item.price < 15);
    } else if (selectedFilter === "fastest") {
      items = items.filter(item => parseInt(item.prepTime) <= 15);
    } else if (selectedFilter === "vegetarian") {
      items = items.filter(item => item.isVegetarian);
    } else if (selectedFilter === "spicy") {
      items = items.filter(item => item.isSpicy);
    } else if (selectedFilter === "popular") {
      items = items.filter(item => item.isPopular);
    }

    // Apply search
    if (searchQuery.trim()) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  const filterOptions = [
    { id: "halal", label: "Halal" },
    { id: "budget", label: "< RM15" },
    { id: "fastest", label: "Fastest" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "spicy", label: "Spicy" },
    { id: "popular", label: "Popular" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <button 
          className="flex items-center gap-2 mb-4 hover:bg-gray-50 p-2 rounded-lg -ml-2"
          onClick={() => setShowLocationModal(true)}
        >
          <MapPin className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-medium flex-1 text-left">{currentLocation}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="What are you craving?"
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <Badge
              key={filter.id}
              variant="outline"
              className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer ${
                selectedFilter === filter.id
                  ? "bg-orange-600 text-white border-orange-600"
                  : "border-orange-600 text-orange-600"
              }`}
              onClick={() => setSelectedFilter(selectedFilter === filter.id ? null : filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quick Reorder */}
      {!searchQuery && (
        <div className="px-4 mt-6">
          <h2 className="text-lg font-semibold mb-3">Quick Reorder</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
            <ImageWithFallback
              src={foodItems[0].image}
              alt={foodItems[0].name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{foodItems[0].name}</h3>
              <p className="text-sm text-gray-500">{foodItems[0].restaurantName}</p>
              <p className="text-orange-600 font-semibold mt-1">RM {foodItems[0].price.toFixed(2)}</p>
            </div>
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => navigate("/item/1")}
            >
              Order
            </Button>
          </div>
        </div>
      )}

      {/* Food List */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">
          {searchQuery ? `Search Results (${filteredItems.length})` : (
            selectedFilter === "halal" ? "Halal Food" :
            selectedFilter === "budget" ? "Under RM15" :
            selectedFilter === "fastest" ? "Quick Bites" :
            selectedFilter === "vegetarian" ? "Vegetarian Options" :
            selectedFilter === "spicy" ? "Spicy Dishes" :
            selectedFilter === "popular" ? "Popular Choices" :
            "Popular Dishes"
          )}
        </h2>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.restaurantName}</p>
                    </div>
                    <div className="flex gap-1">
                      {item.isHalal && (
                        <Badge variant="outline" className="text-xs border-green-600 text-green-600">
                          Halal
                        </Badge>
                      )}
                      {item.isSpicy && (
                        <Badge variant="outline" className="text-xs border-red-600 text-red-600">
                          🌶️
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-orange-600 font-semibold">RM {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "home" ? "text-orange-600" : "text-gray-400"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("orders");
            navigate("/orders");
          }}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "orders" ? "text-orange-600" : "text-gray-400"
          }`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs">Orders</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("profile");
            navigate("/profile");
          }}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "profile" ? "text-orange-600" : "text-gray-400"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Select Location</h3>
            <div className="space-y-2">
              {["Office Tower B, KL", "Home - Petaling Jaya", "KLCC Convention Centre", "Bangsar Shopping Centre"].map((location) => (
                <button
                  key={location}
                  className={`w-full text-left p-3 rounded-lg border hover:bg-gray-50 ${
                    currentLocation === location ? "border-orange-600 bg-orange-50" : ""
                  }`}
                  onClick={() => {
                    setCurrentLocation(location);
                    setShowLocationModal(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>{location}</span>
                  </div>
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowLocationModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}