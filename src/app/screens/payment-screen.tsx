import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { ArrowLeft, CreditCard, Wallet, Loader2, QrCode } from "lucide-react";
import { CreditCardForm } from "../components/credit-card-form";
import { ReceiptModal } from "../components/receipt-modal";
import { useCart } from "../context/cart-context";
import { useOrder, type Order } from "../context/order-context";

const WALLET_METHODS = new Set(["tng", "grabpay", "maybank"]);

function walletLabel(method: string) {
  if (method === "tng") return "TNG eWallet";
  if (method === "grabpay") return "GrabPay";
  if (method === "maybank") return "Maybank2u";
  return method;
}

export function PaymentScreen() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, discount } = useCart();
  const { addOrder, setActiveOrder } = useOrder();

  const [paymentMethod, setPaymentMethod] = useState("tng");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [step, setStep] = useState<"checkout" | "qr">("checkout");

  const subtotal = getCartTotal();
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee - discount;

  const finalizeOrder = useCallback(() => {
    const orderNumber = `#QB${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
    const newOrder: Order = {
      id: orderNumber,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod,
      restaurantName: cart.length > 0 ? cart[0].restaurantName : "QuickBite",
      riderName: "Ahmad Rizal",
      date: new Date().toISOString(),
      deliveryAddress: "Tower B, KL",
    };

    setCompletedOrder(newOrder);
    addOrder(newOrder);
    setActiveOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    setShowReceipt(true);
  }, [cart, subtotal, deliveryFee, discount, total, paymentMethod, addOrder, setActiveOrder, clearCart]);

  // After QR scan step, show authenticating overlay (handled by isProcessing effect below).
  useEffect(() => {
    if (step !== "qr" || showReceipt) return;
    if (!WALLET_METHODS.has(paymentMethod)) return;
    if (cart.length === 0) return;
    const t = window.setTimeout(() => {
      setStep("checkout");
      setIsProcessing(true);
    }, 4000);
    return () => window.clearTimeout(t);
  }, [step, showReceipt, paymentMethod, cart.length]);

  useEffect(() => {
    if (!isProcessing) return;
    const t = window.setTimeout(() => {
      finalizeOrder();
    }, 3000);
    return () => window.clearTimeout(t);
  }, [isProcessing, finalizeOrder]);

  const handlePayment = () => {
    if (paymentMethod === "card") {
      setShowCardForm(true);
    } else if (WALLET_METHODS.has(paymentMethod)) {
      setStep("qr");
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

  const handleReceiptClose = () => {
    setShowReceipt(false);
    navigate("/payment", { replace: true });
  };

  if (step === "qr" && !showReceipt && WALLET_METHODS.has(paymentMethod)) {
    const qrPayload = `QuickBite|${paymentMethod.toUpperCase()}|RM${total.toFixed(2)}|${Date.now()}`;
    const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrPayload)}&size=280&margin=2`;

    return (
      <div className="min-h-screen bg-gray-50 pb-6">
        <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
          <button type="button" onClick={() => setStep("checkout")} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Payment — {walletLabel(paymentMethod)}</h1>
        </div>

        <div className="px-4 py-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">Scan to pay</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Open {walletLabel(paymentMethod)} and scan this QR code. Next you&apos;ll see the payment authentication screen.
            </p>
            <div className="flex justify-center mb-6">
              <div className="relative p-4 bg-gray-50 rounded-lg border border-gray-200">
                <img
                  src={qrUrl}
                  alt={`${paymentMethod} payment QR`}
                  className="w-56 h-56 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement?.querySelector(".fallback-qr")?.classList.remove("hidden");
                  }}
                />
                <QrCode className="fallback-qr hidden w-56 h-56 text-gray-800" strokeWidth={1} />
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Total Payment</span>
              <span className="text-orange-600">RM {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
        <button type="button" onClick={() => navigate("/cart")} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Checkout</h1>
      </div>

      <div className="px-4 py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-3">Payment Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-900">RM {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-gray-900">RM {deliveryFee.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600">-RM {discount.toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="border-t border-dashed mt-4 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-orange-600">RM {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold mb-4 text-gray-800">Select Payment Method</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              {/* TNG eWallet */}
              <div className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'tng' ? 'border-orange-500 bg-orange-50/10 text-orange-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="tng" id="tng" className={paymentMethod === 'tng' ? 'border-orange-500 text-orange-500' : ''} />
                <div className="flex items-center text-blue-600 gap-1">
                   <QrCode className="w-5 h-5" />
                </div>
                <Label htmlFor="tng" className="flex-1 text-sm font-medium cursor-pointer text-gray-800">
                  TNG eWallet
                </Label>
              </div>

              {/* GrabPay */}
              <div className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'grabpay' ? 'border-orange-500 bg-orange-50/10 text-orange-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="grabpay" id="grabpay" className={paymentMethod === 'grabpay' ? 'border-orange-500 text-orange-500' : ''} />
                <div className="flex items-center text-green-600 gap-1">
                   <QrCode className="w-5 h-5" />
                </div>
                <Label htmlFor="grabpay" className="flex-1 text-sm font-medium cursor-pointer text-gray-800">
                  GrabPay
                </Label>
              </div>

              {/* Maybank2u */}
              <div className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'maybank' ? 'border-orange-500 bg-orange-50/10 text-orange-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="maybank" id="maybank" className={paymentMethod === 'maybank' ? 'border-orange-500 text-orange-500' : ''} />
                <div className="flex items-center text-yellow-500 gap-1">
                   <QrCode className="w-5 h-5" />
                </div>
                <Label htmlFor="maybank" className="flex-1 text-sm font-medium cursor-pointer text-gray-800">
                  MAE / Maybank2u
                </Label>
              </div>

              {/* Credit Card */}
              <div className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/10 text-orange-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="card" id="card" className={paymentMethod === 'card' ? 'border-orange-500 text-orange-500' : ''} />
                <CreditCard className="w-5 h-5 text-gray-600" />
                <Label htmlFor="card" className="flex-1 text-sm font-medium cursor-pointer text-gray-800">
                  Credit / Debit Card
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-[430px] bg-white border-t border-gray-200 p-4 z-10">
        <Button
          onClick={handlePayment}
          disabled={isProcessing || cart.length === 0}
          className="w-full h-12 bg-orange-600 hover:bg-orange-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm payment"
          )}
        </Button>
      </div>

      {/* Credit Card Form */}
      {showCardForm && (
        <CreditCardForm onSubmit={handleCardSubmit} onCancel={() => setShowCardForm(false)} />
      )}

      {/* Processing / Authenticating Payment */}
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
      {completedOrder && (
        <ReceiptModal
          isOpen={showReceipt}
          onClose={handleReceiptClose}
          orderNumber={completedOrder.id}
          items={completedOrder.items}
          subtotal={completedOrder.subtotal}
          deliveryFee={completedOrder.deliveryFee}
          discount={completedOrder.discount}
          total={completedOrder.total}
          paymentMethod={completedOrder.paymentMethod}
          onViewTracking={handleViewTracking}
        />
      )}
    </div>
  );
}
