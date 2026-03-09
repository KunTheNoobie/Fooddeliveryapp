import { useNavigate } from "react-router";
import { ArrowLeft, Bell } from "lucide-react";

export function NotificationsScreen() {
    const navigate = useNavigate();

    const notifications = [
        { id: 1, title: "Order Delivered!", message: "Your food from Warung Pak Hassan has arrived.", time: "2m ago", unread: true },
        { id: 2, title: "Promo Alert 🎉", message: "Get RM5 off your next order with code QUICK5.", time: "1 day ago", unread: false },
        { id: 3, title: "System Update", message: "We've updated our terms of service.", time: "3 days ago", unread: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-sm flex items-center gap-3">
                <button onClick={() => navigate("/profile")} className="p-1">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-semibold">Notifications</h1>
            </div>

            <div className="px-4 py-6 space-y-4">
                {notifications.map((note) => (
                    <div key={note.id} className={`bg-white p-4 rounded-lg shadow-sm flex gap-4 ${note.unread ? 'border-l-4 border-orange-600' : ''}`}>
                        <div className="mt-1 bg-orange-100 p-2 rounded-full text-orange-600 h-fit">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-semibold ${note.unread ? 'text-gray-900' : 'text-gray-700'}`}>{note.title}</h3>
                                <span className="text-xs text-gray-500">{note.time}</span>
                            </div>
                            <p className="text-sm text-gray-600">{note.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
