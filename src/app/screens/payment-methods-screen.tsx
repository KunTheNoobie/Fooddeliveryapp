import { useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Plus, Wallet } from "lucide-react";
import { Button } from "../components/ui/button";

export function PaymentMethodsScreen() {
    const navigate = useNavigate();

    const methods = [
        { id: 1, type: "card", label: "•••• •••• •••• 1234", expiry: "12/26", isDefault: true, icon: CreditCard },
        { id: 2, type: "wallet", label: "TNG eWallet", isDefault: false, icon: Wallet },
    ];

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
                <Button variant="ghost" size="icon" className="text-orange-600">
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
                    </div>
                ))}
            </div>
        </div>
    );
}
