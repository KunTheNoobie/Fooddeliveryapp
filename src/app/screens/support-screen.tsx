import { useNavigate } from "react-router";
import { ArrowLeft, MessageCircle, Phone, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export function SupportScreen() {
    const navigate = useNavigate();

    const faqs = [
        "How to track my order?",
        "Can I cancel my order?",
        "How to use promo codes?",
        "What are QuickBite Rewards?"
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
                <button onClick={() => navigate("/profile")} className="p-1">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-semibold">Help & Support</h1>
            </div>

            <div className="px-4 py-6 space-y-6">
                {/* Contact Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 bg-white">
                        <MessageCircle className="w-6 h-6 text-orange-600" />
                        <span>Live Chat</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 bg-white">
                        <Phone className="w-6 h-6 text-orange-600" />
                        <span>Call Us</span>
                    </Button>
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-orange-600" />
                        Frequently Asked Questions
                    </h3>
                    <div className="divide-y">
                        {faqs.map((faq, index) => (
                            <button key={index} className="w-full text-left py-3 text-gray-700 hover:text-orange-600">
                                {faq}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
