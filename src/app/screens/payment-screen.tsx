import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { ArrowLeft, CreditCard, Wallet, Loader2 } from "lucide-react";
import { CreditCardForm } from "../components/credit-card-form";
import { ReceiptModal } from "../components/receipt-modal";
import { useCart } from "../context/cart-context";
import { useOrder } from "../context/order-context";

export function PaymentScreen() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { addOrder, setActiveOrder } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState("tng");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");

  const subtotal = getCartTotal();
  const deliveryFee = 5.00;
  const discount = 3.00;
  const total = subtotal + deliveryFee - discount;

  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        const orderNumber = `#QB${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        setCurrentOrderId(orderNumber);

        const newOrder = {
          id: orderNumber,
          items: [...cart], // copy current cart items
          subtotal,
          deliveryFee,
          discount,
          total,
          paymentMethod,
          restaurantName: cart.length > 0 ? cart[0].restaurantName : "QuickBite",
          riderName: "Ahmad Rizal",
          date: new Date().toISOString(),
        };

        addOrder(newOrder);
        setActiveOrder(newOrder);
        clearCart();
        setIsProcessing(false);
        setShowReceipt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, cart, subtotal, deliveryFee, discount, total, paymentMethod, addOrder, setActiveOrder, clearCart]);

  const handlePayment = () => {
    if (paymentMethod === "card") {
      setShowCardForm(true);
    } else {
      setIsProcessing(true);
    }
  };

  const handleCardSubmit = () => {
    setShowCardForm(false);
    setIsProcessing(true);
  };

  const handleViewTracking = () => {
    setShowReceipt(false);
    navigate("/tracking");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
        <button
          onClick={() => navigate("/cart")}
          className="p-1"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Payment</h1>
      </div>

      <div className="px-4 py-6">
        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-4">
              {/* TNG eWallet */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="tng" id="tng" />
                <Wallet className="w-5 h-5 text-blue-600" />
                <Label htmlFor="tng" className="flex-1 font-normal cursor-pointer">
                  TNG eWallet
                </Label>
              </div>

              {/* GrabPay */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="grabpay" id="grabpay" />
                <Wallet className="w-5 h-5 text-green-600" />
                <Label htmlFor="grabpay" className="flex-1 font-normal cursor-pointer">
                  GrabPay
                </Label>
              </div>

              {/* Maybank2u */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="maybank" id="maybank" />
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                  M
                </div>
                <Label htmlFor="maybank" className="flex-1 font-normal cursor-pointer">
                  Maybank2u
                </Label>
              </div>

              {/* Credit Card */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="w-5 h-5 text-gray-600" />
                <Label htmlFor="card" className="flex-1 font-normal cursor-pointer">
                  Credit Card
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-sm">
          <h3 className="font-semibold mb-3">Payment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>RM {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span>RM {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Discount</span>
              <span className="text-green-600">-RM {discount.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total Payment</span>
            <span className="text-orange-600">RM {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-12 bg-orange-600 hover:bg-orange-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm Payment"
          )}
        </Button>
      </div>

      {/* Credit Card Form */}
      {showCardForm && (
        <CreditCardForm
          onSubmit={handleCardSubmit}
          onCancel={() => setShowCardForm(false)}
        />
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Authenticating Payment...</h3>
            <p className="text-sm text-gray-600">
              {paymentMethod === "tng" && "Please approve the transaction in your TNG app"}
              {paymentMethod === "grabpay" && "Please approve the transaction in your Grab app"}
              {paymentMethod === "maybank" && "Redirecting to Maybank2u..."}
              {paymentMethod === "card" && "Processing your card payment..."}
            </p>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        orderNumber={currentOrderId}
        items={cart.length > 0 ? cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={discount}
        total={total}
        paymentMethod={paymentMethod}
        onViewTracking={handleViewTracking}
      />
    </div>
  );
}