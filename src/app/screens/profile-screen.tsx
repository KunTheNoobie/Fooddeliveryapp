import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ShoppingBag, User, ChevronRight, MapPin, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";

export function ProfileScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const profileOptions = [
    { icon: MapPin, label: "Saved Addresses", count: "3 locations", route: "/profile/addresses" },
    { icon: CreditCard, label: "Payment Methods", count: "2 cards", route: "/profile/payment-methods" },
    { icon: Bell, label: "Notifications", count: null, route: "/profile/notifications" },
    { icon: HelpCircle, label: "Help & Support", count: null, route: "/profile/support" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-orange-600 px-4 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-orange-600">
            JD
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm opacity-90">john.doe@email.com</p>
            <p className="text-sm opacity-90">+60 12-345 6789</p>
          </div>
        </div>
      </div>

      {/* Profile Options */}
      <div className="px-4 py-6 space-y-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {profileOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => navigate(option.route)}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 ${index !== profileOptions.length - 1 ? "border-b" : ""
                }`}
            >
              <div className="flex items-center gap-3">
                <option.icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{option.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {option.count && (
                  <span className="text-sm text-gray-500">{option.count}</span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Rewards Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">QuickBite Rewards</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold">250</span>
            <span className="text-sm opacity-90">points</span>
          </div>
          <p className="text-sm opacity-90">
            Earn 10 points for every RM1 spent. Redeem for discounts!
          </p>
        </div>

        {/* Logout Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-12 gap-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90%] rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will need to enter your phone number and verify your account to log back in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => navigate("/")} className="bg-red-600 hover:bg-red-700 text-white">Log Out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 px-6 py-3 flex justify-around">
        <button
          onClick={() => {
            setActiveTab("home");
            navigate("/home");
          }}
          className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-orange-600" : "text-gray-400"
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
          className={`flex flex-col items-center gap-1 ${activeTab === "orders" ? "text-orange-600" : "text-gray-400"
            }`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs">Orders</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 ${activeTab === "profile" ? "text-orange-600" : "text-gray-400"
            }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
