import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ChatModal } from "../components/chat-modal";
import { RatingModal } from "../components/rating-modal";
import { ArrowLeft, MessageCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useOrder } from "../context/order-context";

export function TrackingScreen() {
  const navigate = useNavigate();
  const { activeOrder, updateOrderRating } = useOrder();
  const [eta, setEta] = useState(12);
  const [showChat, setShowChat] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [riderPosition, setRiderPosition] = useState({ x: 200, y: 150 });
  const riderName = activeOrder?.riderName || "Ahmad Rizal";
  const restaurantName = activeOrder?.restaurantName || "QuickBite";

  // Simulate rider movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setRiderPosition(prev => ({
        x: Math.min(prev.x + 5, 290),
        y: Math.max(prev.y - 4, 75)
      }));

      setEta(prev => {
        if (prev <= 1) {
          clearInterval(moveInterval);
          setTimeout(() => setShowRating(true), 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 3000);

    return () => clearInterval(moveInterval);
  }, []);

  const handleRatingSubmit = (foodRating: number, riderRating: number, comment: string) => {
    if (activeOrder) {
      updateOrderRating(activeOrder.id, { foodRating, riderRating, comment });
    }
    toast.success("Thank you for your feedback!");
    setTimeout(() => navigate("/home"), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
        <button
          onClick={() => navigate("/home")}
          className="p-1"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Track Delivery</h1>
      </div>

      {/* Map Section */}
      <div className="relative h-80 bg-gradient-to-b from-orange-100 to-orange-50">
        {/* Simplified Map Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 320"
            className="absolute inset-0"
          >
            {/* Route line */}
            <path
              d="M 100 250 Q 200 150, 300 70"
              stroke="#F97316"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
            />

            {/* Restaurant marker */}
            <circle cx="100" cy="250" r="10" fill="#F97316" />
            <circle cx="100" cy="250" r="6" fill="white" />
            <text x="100" y="275" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">
              {restaurantName.length > 15 ? restaurantName.substring(0, 15) + "..." : restaurantName}
            </text>

            {/* Destination marker */}
            <circle cx="300" cy="70" r="10" fill="#10B981" />
            <circle cx="300" cy="70" r="6" fill="white" />
            <text x="300" y="95" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">
              Tower B
            </text>

            {/* Rider icon (animated position) */}
            <g transform={`translate(${riderPosition.x}, ${riderPosition.y})`}>
              <circle r="14" fill="#EF4444" />
              <text textAnchor="middle" dy="6" fontSize="18" fill="white">
                🏍️
              </text>
            </g>
          </svg>
        </div>

        {/* Status overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-medium">
            {eta > 0 ? "En route to Tower B" : "Arrived at Tower B"}
          </span>
        </div>
      </div>

      {/* Status Section */}
      <div className="px-4 py-6">
        {/* ETA Card */}
        <div className={`${eta > 0 ? "bg-orange-600" : "bg-green-600"} text-white rounded-lg p-6 text-center mb-4 shadow-md`}>
          <p className="text-sm opacity-90 mb-1">
            {eta > 0 ? "Estimated Arrival" : "Order Delivered!"}
          </p>
          <h2 className="text-4xl font-bold">
            {eta > 0 ? `${eta} Mins` : "Enjoy!"}
          </h2>
          <p className="text-sm opacity-90 mt-2">
            {eta > 0 ? "Your food is on the way!" : "Your order has been delivered"}
          </p>
        </div>

        {/* Rider Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Your Rider</h3>

          <div className="flex items-center gap-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1771575519871-685aace1e53a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHJpZGVyJTIwbW90b3JjeWNsZSUyMGhlbG1ldHxlbnwxfHx8fDE3NzIzNTExOTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Rider"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium">{riderName}</h4>
              <p className="text-sm text-gray-500">VBC 1234</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm">4.9</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => setShowChat(true)}
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>
          </div>
        </div>

        {/* Delivery Instructions */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-sm">
          <h3 className="font-semibold mb-2">Delivery Instructions</h3>
          <p className="text-sm text-gray-600">Drop off at Guardhouse</p>
          <p className="text-xs text-gray-500 mt-1">
            Please call upon arrival
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-sm">
          <h3 className="font-semibold mb-3">Order Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 w-1/3">Order Number</span>
              <span className="font-medium text-right">{activeOrder?.id || "#QB2026030901"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 w-1/3">From</span>
              <span className="font-medium text-right line-clamp-1">{restaurantName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 w-1/3">Items</span>
              <span className="font-medium text-right">
                {activeOrder?.items.map(item => \`\${item.quantity}x \${item.name}\`).join(", ") || "1x Nasi Lemak"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {eta === 0 && (
            <Button
              className="w-full h-12 bg-orange-600 hover:bg-orange-700"
              onClick={() => setShowRating(true)}
            >
              Rate Your Experience
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        riderName={riderName}
      />

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        onSubmit={handleRatingSubmit}
        restaurantName={restaurantName}
        riderName={riderName}
      />
    </div>
  );
}