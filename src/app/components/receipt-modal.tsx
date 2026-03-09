import { Button } from "./ui/button";
import { Check, Download, X } from "lucide-react";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  onViewTracking: () => void;
}

export function ReceiptModal({
  isOpen,
  onClose,
  orderNumber,
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  paymentMethod,
  onViewTracking,
}: ReceiptModalProps) {
  if (!isOpen) return null;

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      tng: "TNG eWallet",
      grabpay: "GrabPay",
      maybank: "Maybank2u",
      card: "Credit Card",
    };
    return methods[method] || method;
  };

  const handleDownload = () => {
    const receiptContent = `
QuickBite Order Receipt
=======================
Order Number: ${orderNumber}
Date: ${new Date().toLocaleString("en-MY")}
Payment Method: ${getPaymentMethodName(paymentMethod)}

Items:
${items.map(i => `${i.quantity}x ${i.name} - RM ${(i.price * i.quantity).toFixed(2)}`).join("\n")}

Subtotal: RM ${subtotal.toFixed(2)}
Delivery Fee: RM ${deliveryFee.toFixed(2)}
Discount: -RM ${discount.toFixed(2)}
-----------------------
Total Paid: RM ${total.toFixed(2)}
=======================
Thank you for ordering with QuickBite!
    `.trim();

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `QuickBite_Receipt_${orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Success Header */}
        <div className="bg-green-600 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-green-700 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Payment Successful!</h2>
          <p className="text-sm opacity-90 mt-2">Your order has been confirmed</p>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold">QuickBite</h3>
            <p className="text-sm text-gray-600">Order Receipt</p>
          </div>

          {/* Order Info */}
          <div className="border-b pb-4 mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium">
                {new Date().toLocaleString("en-MY", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">{getPaymentMethodName(paymentMethod)}</span>
            </div>
          </div>

          {/* Items */}
          <div className="border-b pb-4 mb-4">
            <h4 className="font-semibold mb-3">Order Items</h4>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-2">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>RM {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>RM {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>RM {deliveryFee.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600">-RM {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total Paid</span>
              <span className="text-orange-600">RM {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={onViewTracking}
              className="w-full h-12 bg-orange-600 hover:bg-orange-700"
            >
              Track Your Order
            </Button>
            <Button variant="outline" className="w-full h-12 gap-2" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            Thank you for ordering with QuickBite!
          </p>
        </div>
      </div>
    </div>
  );
}
