import { useNavigate } from "react-router";
import { ArrowLeft, Star, Gift, Zap, Coffee, Utensils, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";

const rewardItems = [
  {
    id: 1,
    icon: Coffee,
    title: "Free Teh Tarik",
    description: "Redeem a complimentary Teh Tarik with your next order.",
    points: 100,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    id: 2,
    icon: Utensils,
    title: "RM 5 Off Your Order",
    description: "Get RM5 discount on any order above RM20.",
    points: 200,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: "Free Delivery",
    description: "Enjoy free delivery on your next order, any distance.",
    points: 150,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: 4,
    icon: Zap,
    title: "Priority Delivery",
    description: "Jump the queue! Your next order gets priority dispatch.",
    points: 300,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    id: 5,
    icon: Gift,
    title: "RM 15 Off Your Order",
    description: "Big savings — RM15 off any order above RM40.",
    points: 500,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
];

const userPoints = 250;

export function RewardsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 pt-4 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="p-1 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-white">QuickBite Rewards</h1>
        </div>

        {/* Points Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-sm font-medium opacity-90">Your Balance</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-bold">{userPoints}</span>
            <span className="text-lg opacity-90">pts</span>
          </div>
          <p className="text-sm opacity-80">Earn 10 points for every RM1 spent</p>

          {/* Progress to next reward */}
          <div className="mt-4">
            <div className="flex justify-between text-xs opacity-80 mb-1">
              <span>{userPoints} pts</span>
              <span>300 pts for next reward</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${Math.min((userPoints / 300) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Rewards Catalog</h2>
          <p className="text-sm text-gray-500">Tap a reward to redeem with your points</p>
        </div>

        <div className="space-y-3">
          {rewardItems.map((reward) => {
            const canRedeem = userPoints >= reward.points;
            return (
              <div
                key={reward.id}
                className={`bg-white rounded-xl p-4 shadow-sm border ${reward.border} flex items-center gap-4`}
              >
                <div className={`w-12 h-12 rounded-xl ${reward.bg} flex items-center justify-center flex-shrink-0`}>
                  <reward.icon className={`w-6 h-6 ${reward.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{reward.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{reward.description}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    <span className={`text-xs font-bold ${canRedeem ? "text-orange-600" : "text-gray-400"}`}>
                      {reward.points} pts
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={!canRedeem}
                  className={`flex-shrink-0 text-xs h-8 px-3 ${
                    canRedeem
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {canRedeem ? "Redeem" : "Need more"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* How to earn */}
        <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
          <h3 className="font-semibold text-gray-800 mb-3">How to Earn Points</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>Earn 10 pts per RM1 spent on orders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>+50 pts bonus for rating your order</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>+100 pts for referring a friend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
