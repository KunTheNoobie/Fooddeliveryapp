import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Plus, Wallet, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { CreditCardForm } from "../components/credit-card-form";
import { toast } from "sonner";

export function PaymentMethodsScreen() {
    const navigate = useNavigate();

    const [methods, setMethods] = useState([
        { id: 1, type: "card", label: "•••• •••• •••• 1234", expiry: "12/26", isDefault: true, icon: CreditCard },
        { id: 2, type: "wallet", label: "TNG eWallet", isDefault: false, icon: Wallet },
    ]);

    const [showCardForm, setShowCardForm] = useState(false);

    const handleAddCard = () => {
        setMethods([
            ...methods,
            {
                id: methods.length + 1,
                type: "card",
                label: "•••• •••• •••• " + Math.floor(1000 + Math.random() * 9000), // Mock 4 digits
                expiry: "12/29", // Mock expiry
                isDefault: methods.length === 0,
                icon: CreditCard,
            }
        ]);
        setShowCardForm(false);
        toast.success("Card added successfully!");
    };

    const handleSetDefault = (id: number) => {
        setMethods(methods.map(m => ({
            ...m,
            isDefault: m.id === id
        })));
        toast.success("Default payment method updated");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/profile")} className="p-1">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-semibold">Payment Methods</h1>
                </div>
                <Button variant="ghost" size="icon" className="text-orange-600" onClick={() => setShowCardForm(true)}>
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            <div className="px-4 py-6 space-y-4">
                {methods.map((method) => (
                    <div key={method.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                            <method.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">{method.label}</h3>
                                {method.isDefault && (
                                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                        Default
                                    </span>
                                )}
                            </div>
                            {method.expiry && <p className="text-sm text-gray-500 mt-1">Expires {method.expiry}</p>}
                        </div>
                        {!method.isDefault && (
                            <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)} className="text-gray-400 hover:text-orange-600">
                                <Check className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {showCardForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
                        <h2 className="text-lg font-semibold mb-4">Add Credit Card</h2>
                        <CreditCardForm onSubmit={handleAddCard} onCancel={() => setShowCardForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
