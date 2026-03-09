import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MessageCircle, Phone, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function SupportScreen() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        { q: "How to track my order?", a: "Go to your 'Orders' tab and click on the active order to see real-time tracking." },
        { q: "Can I cancel my order?", a: "Yes, but only before the restaurant starts preparing it. Go to the order details to cancel." },
        { q: "How to use promo codes?", a: "Enter the promo code during the checkout process before payment." },
        { q: "What are QuickBite Rewards?", a: "Earn points for every order, which can be redeemed for discounts on future meals." }
    ];

    const handleChat = () => {
        toast.info("Connecting you to a live chat agent...");
    };

    const handleCall = () => {
        toast.info("Initiating call to Support Center (+60 3-1234 5678)");
    };

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
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 bg-white hover:border-orange-600 hover:text-orange-600" onClick={handleChat}>
                        <MessageCircle className="w-6 h-6 text-orange-600" />
                        <span>Live Chat</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 bg-white hover:border-orange-600 hover:text-orange-600" onClick={handleCall}>
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
                            <div key={index} className="py-3">
                                <button
                                    className="w-full text-left text-gray-700 hover:text-orange-600 flex justify-between items-center outline-none"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-medium">{faq.q}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="w-4 h-4 text-orange-600" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        {faq.a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
