import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Plus, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export function SavedAddressesScreen() {
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([
        { id: 1, label: "Home", address: "Tower B, KL", isDefault: true },
        { id: 2, label: "Work", address: "KL Sentral, Block A", isDefault: false },
        { id: 3, label: "Parents", address: "Subang Jaya, SS15", isDefault: false },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newLabel, setNewLabel] = useState("Custom");
    const [newAddress, setNewAddress] = useState("");

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLabel || !newAddress) return;

        setAddresses([
            ...addresses,
            {
                id: addresses.length + 1,
                label: newLabel,
                address: newAddress,
                isDefault: addresses.length === 0,
            }
        ]);
        setNewLabel("Custom");
        setNewAddress("");
        setShowForm(false);
        toast.success("Address added successfully!");
    };

    const handleSetDefault = (id: number) => {
        setAddresses(addresses.map(a => ({
            ...a,
            isDefault: a.id === id
        })));
        toast.success("Default address updated");
    };

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
                <Button variant="ghost" size="icon" className="text-orange-600" onClick={() => setShowForm(!showForm)}>
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            <div className="px-4 py-6 space-y-4">
                {showForm && (
                    <form onSubmit={handleAddAddress} className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                        <h3 className="font-semibold mb-3">Add New Address</h3>
                        <div className="space-y-3">
                            <div>
                                <Input
                                    placeholder="Label (e.g., Gym, Friend)"
                                    value={newLabel}
                                    onChange={(e) => setNewLabel(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Full Address"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    required
                                />
                            </div>
                            
                            {/* Map Coordinates Visual Placeholder */}
                            <div className="w-full h-32 bg-gray-100 rounded-md border border-gray-200 overflow-hidden relative flex items-center justify-center mt-2">
                                <div className="absolute inset-0 opacity-10 bg-orange-200" style={{ backgroundImage: "linear-gradient(#f9731633 1px, transparent 1px), linear-gradient(90deg, #f9731633 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                                <div className="z-10 flex flex-col items-center">
                                    <MapPin className="w-8 h-8 text-orange-600 mb-1" />
                                    <span className="text-xs text-gray-600 font-medium bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-200">Pin Accurate Coordinates</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">Save Address</Button>
                                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                            </div>
                        </div>
                    </form>
                )}
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
                        {!addr.isDefault && (
                            <Button variant="ghost" size="sm" onClick={() => handleSetDefault(addr.id)} className="text-gray-400 hover:text-orange-600">
                                <Check className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
