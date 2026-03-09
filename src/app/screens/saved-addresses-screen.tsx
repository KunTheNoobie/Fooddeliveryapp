import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import { Button } from "../components/ui/button";

export function SavedAddressesScreen() {
    const navigate = useNavigate();

    const addresses = [
        { id: 1, label: "Home", address: "Tower B, KL", isDefault: true },
        { id: 2, label: "Work", address: "KL Sentral, Block A", isDefault: false },
        { id: 3, label: "Parents", address: "Subang Jaya, SS15", isDefault: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/profile")} className="p-1">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-semibold">Saved Addresses</h1>
                </div>
                <Button variant="ghost" size="icon" className="text-orange-600">
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            <div className="px-4 py-6 space-y-4">
                {addresses.map((addr) => (
                    <div key={addr.id} className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4">
                        <div className="mt-1 bg-orange-100 p-2 rounded-full text-orange-600">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">{addr.label}</h3>
                                {addr.isDefault && (
                                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                        Default
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
