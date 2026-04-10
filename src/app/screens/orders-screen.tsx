import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ShoppingBag, User, Package, Clock, Star, RotateCcw } from "lucide-react";
import { useOrder } from "../context/order-context";
import { RatingModal } from "../components/rating-modal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/cart-context";
import { toast } from "sonner";

export function OrdersScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const { orders, updateOrderRating } = useOrder();
  const { addToCart } = useCart();

  const [showRating, setShowRating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleRateClick = (order: any) => {
    setSelectedOrder(order);
    setShowRating(true);
  };

  const handleRatingSubmit = (foodRating: number, riderRating: number, comment: string) => {
    if (selectedOrder) {
      updateOrderRating(selectedOrder.id, { foodRating, riderRating, comment });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <h1 className="text-lg font-semibold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 text-center mb-6">
            You haven't placed any orders yet. Start exploring delicious food!
          </p>
          <Button
            onClick={() => navigate("/home")}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Browse Restaurants
          </Button>
        </div>
      ) : (
        <div className="px-4 py-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex gap-3 mb-3">
                <ImageWithFallback
                  src={order.items && order.items.length > 0 ? order.items[0].image : ""}
                  alt={order.restaurantName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{order.restaurantName}</h3>
                      <div className="flex items-center text-sm text-gray-500 gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {new Date(order.date).toLocaleString("en-MY", {
                          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{order.id}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-gray-100 py-3 my-3">
                <p className="text-sm text-gray-600 mb-2">
                  {order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(", ")}
                </p>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>RM {order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600 capitalize">Delivered</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-600 text-orange-600 hover:bg-orange-50"
                    onClick={() => {
                        order.items.forEach((item: any) => addToCart(item));
                        toast.success("Items added to cart");
                        navigate("/cart");
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reorder
                  </Button>
                  <Button
                    variant={order.rating ? "outline" : "default"}
                    className={order.rating ? "" : "bg-orange-600 hover:bg-orange-700"}
                    size="sm"
                    onClick={() => handleRateClick(order)}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    {order.rating ? "View Rating" : "Rate Order"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <RatingModal
          isOpen={showRating}
          onClose={() => setShowRating(false)}
          onSubmit={handleRatingSubmit}
          restaurantName={selectedOrder.restaurantName}
          riderName={selectedOrder.riderName}
          existingRating={selectedOrder.rating}
          readonly={!!selectedOrder.rating}
        />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-[430px] bg-white border-t border-gray-200 px-6 py-3 flex justify-around">
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
          onClick={() => setActiveTab("orders")}
          className={`flex flex-col items-center gap-1 ${activeTab === "orders" ? "text-orange-600" : "text-gray-400"
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
