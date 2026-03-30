import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CreditCard } from "lucide-react";

interface CreditCardFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function CreditCardForm({ onSubmit, onCancel }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\//g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Luhn algorithm check for validation
    const isValidLuhn = (num: string) => {
      const arr = num.split('').reverse().map(x => parseInt(x));
      const lastDigit = arr.shift();
      if (lastDigit === undefined) return false;
      const sum = arr.reduce((acc, val, i) =>
        acc + (i % 2 === 0 ? (val * 2 > 9 ? val * 2 - 9 : val * 2) : val), 0);
      return (sum + lastDigit) % 10 === 0;
    };

    const cleanCard = cardNumber.replace(/\s/g, "");

    // Validate card length and Luhn
    if (cardNumber.length !== 19 || !isValidLuhn(cleanCard)) {
      setError("Invalid Card Number: Must pass Luhn validation check.");
      return;
    }

    // Validate expiry date
    if (expiryDate.length !== 5) {
      setError("Please enter a valid expiry date (MM/YY)");
      return;
    }
    const [month, year] = expiryDate.split("/");
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (monthNum < 1 || monthNum > 12) {
      setError("Invalid month in expiry date");
      return;
    }
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      setError("Card has expired");
      return;
    }

    // Validate CVV
    if (cvv.length !== 3) {
      setError("Please enter a valid 3-digit CVV");
      return;
    }

    setError("");
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl font-bold">Enter Card Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber" className={error.includes("Card Number") ? "text-red-500" : ""}>Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                setCardNumber(formatCardNumber(e.target.value));
                if (error.includes("Card Number")) setError("");
              }}
              maxLength={19}
              required
              className={error.includes("Card Number") ? "border-red-500 focus-visible:ring-red-500 text-red-500" : ""}
            />
          </div>

          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="JOHN DOE"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength={5}
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                maxLength={3}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              Pay Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
