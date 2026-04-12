import { useNavigate } from "react-router";
import { ArrowLeft, Gift } from "lucide-react";

export function RewardsScreen() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-6 shadow-sm flex items-center gap-3 text-white h-32">
                <button onClick={() => navigate("/profile")} className="p-1 mb-8">
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>
            
            <div className="px-4 -mt-12 relative z-10">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <h1 className="text-xl font-bold text-gray-800">QuickBite Rewards</h1>
                    <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                        <Gift className="w-8 h-8 text-orange-600" />
                        <span className="text-5xl font-bold text-orange-600">250</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Available Points</p>
                </div>

                <div className="mt-6 space-y-4">
                    <h2 className="font-semibold text-lg">Rewards Catalog</h2>
                    
                    {[
                        { id: 1, title: "RM5 Off Delivery", points: 100, desc: "Save RM5 on your next delivery fee." },
                        { id: 2, title: "Free Coke", points: 150, desc: "Redeem a free can of Coke with any meal." },
                        { id: 3, title: "RM10 Off Voucher", points: 300, desc: "RM10 off your entire order." },
                    ].map(reward => (
                        <div key={reward.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold">{reward.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{reward.desc}</p>
                            </div>
                            <div className="ml-4 flex flex-col items-end gap-2">
                                <span className="font-bold text-orange-600">{reward.points} pts</span>
                                <button
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                                        250 >= reward.points 
                                            ? "bg-orange-100 text-orange-700 hover:bg-orange-200" 
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Redeem
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
