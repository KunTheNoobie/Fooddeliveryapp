import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/cart-context";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function CartScreen() {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart, getCartTotal, noCutlery, setNoCutlery } = useCart();

  const subtotal = getCartTotal();
  const deliveryFee = 5.00;
  const discount = 3.00;
  const total = subtotal + deliveryFee - discount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add items to get started</p>
        <Button
          onClick={() => navigate("/home")}
          className="bg-orange-600 hover:bg-orange-700"
        >
          Browse Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
        <button
          onClick={() => navigate("/home")}
          className="p-1"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Your Cart</h1>
      </div>

      <div className="px-4 py-4">
        {/* Restaurant Name */}
        {cart.length > 0 && (
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="font-semibold text-gray-900">
              Your Cart from {cart[0].restaurantName}
            </h2>
          </div>
        )}

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {cart.map((item) => (
            <div key={item.id} className="p-4 flex gap-4">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                {item.customizations.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    ({item.customizations.join(", ")})
                  </p>
                )}
                <p className="text-orange-600 font-semibold mt-2">
                  RM {item.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  toast("Item removed", {
                    description: item.name,
                    action: {
                      label: "Undo",
                      onClick: () => addToCart(item)
                    }
                  });
                }}
                className="p-1 h-fit"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Go Green Toggle */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="no-cutlery" className="font-medium cursor-pointer">
                No Cutlery (Go Green)
              </Label>
              <p className="text-sm text-gray-500">Help reduce waste</p>
            </div>
            <Switch
              id="no-cutlery"
              checked={noCutlery}
              onCheckedChange={setNoCutlery}
            />
          </div>
        </div>

        {/* Apply Voucher */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-sm">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter Promo Code" 
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <Button className="bg-orange-600 hover:bg-orange-700 whitespace-nowrap">
              Apply Voucher
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-sm space-y-3">
          <h3 className="font-semibold mb-3">Order Summary</h3>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>RM {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span>RM {deliveryFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="text-green-600">-RM {discount.toFixed(2)}</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-orange-600">RM {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 p-4">
        <Button
          onClick={() => navigate("/payment")}
          className="w-full h-12 bg-orange-600 hover:bg-orange-700"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
