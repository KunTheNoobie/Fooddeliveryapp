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
  const { cart, getCartTotal, clearCart } = useCart();
  const { addOrder, setActiveOrder } = useOrder();

  const [paymentMethod, setPaymentMethod] = useState("tng");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [step, setStep] = useState<"checkout" | "qr">("checkout");

  const subtotal = getCartTotal();
  const deliveryFee = 5.0;
  const discount = 3.0;
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
    setStep("checkout");
    setShowReceipt(true);
  }, [cart, subtotal, deliveryFee, discount, total, paymentMethod, addOrder, setActiveOrder, clearCart]);

  useEffect(() => {
    if (step !== "qr" || showReceipt) return;
    if (!WALLET_METHODS.has(paymentMethod)) return;
    if (cart.length === 0) return;
    const t = window.setTimeout(() => {
      finalizeOrder();
    }, 4000);
    return () => window.clearTimeout(t);
  }, [step, showReceipt, paymentMethod, cart.length, finalizeOrder]);

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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
          <button type="button" onClick={() => setStep("checkout")} className="p-1 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Pay with {walletLabel(paymentMethod)}</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center w-full max-w-sm">
            <p className="text-gray-600 text-center text-sm mb-6">
              Scan this QR code in your {walletLabel(paymentMethod)} app. This page will confirm your order shortly — no extra authentication screen.
            </p>
            <div className="relative mb-8 p-4 bg-white rounded-xl border border-gray-100 shadow-inner">
              <img
                src={qrUrl}
                alt={`${paymentMethod} payment QR`}
                className="w-64 h-64 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.querySelector(".fallback-qr")?.classList.remove("hidden");
                }}
              />
              <QrCode className="fallback-qr hidden w-64 h-64 text-gray-800" strokeWidth={1} />
            </div>
            <div className="text-center w-full mb-6">
              <span className="text-sm text-gray-500">Amount</span>
              <div className="text-3xl font-bold text-orange-600 mt-1">RM {total.toFixed(2)}</div>
            </div>
            <p className="text-sm text-center text-gray-500 border-t border-gray-100 pt-6 w-full">
              Waiting for payment confirmation…
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
        <button type="button" onClick={() => navigate("/cart")} className="p-1 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Payment</h1>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="tng" id="tng" />
                <QrCode className="w-5 h-5 text-blue-600" />
                <Label htmlFor="tng" className="flex-1 font-normal cursor-pointer">
                  TNG eWallet
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="grabpay" id="grabpay" />
                <QrCode className="w-5 h-5 text-green-600" />
                <Label htmlFor="grabpay" className="flex-1 font-normal cursor-pointer">
                  GrabPay
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="maybank" id="maybank" />
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  M
                </div>
                <Label htmlFor="maybank" className="flex-1 font-normal cursor-pointer">
                  Maybank2u
                </Label>
              </div>

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

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handlePayment}
          disabled={isProcessing || cart.length === 0 || step === "qr"}
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

      {showCardForm && (
        <CreditCardForm onSubmit={handleCardSubmit} onCancel={() => setShowCardForm(false)} />
      )}

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing payment…</h3>
            <p className="text-sm text-gray-600">
              {paymentMethod === "card" && "Processing your card payment securely with your bank."}
            </p>
          </div>
        </div>
      )}

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
