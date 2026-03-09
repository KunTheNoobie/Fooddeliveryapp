import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Bell, X, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    unread: boolean;
}

export function NotificationsScreen() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, title: "Order Delivered!", message: "Your food from Warung Pak Hassan has arrived.", time: "2m ago", unread: true },
        { id: 2, title: "Promo Alert 🎉", message: "Get RM5 off your next order with code QUICK5.", time: "1 day ago", unread: false },
        { id: 3, title: "System Update", message: "We've updated our terms of service.", time: "3 days ago", unread: false },
    ]);

    const handleDismiss = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
        toast.success("Notification dismissed");
    };

    const handleClearAll = () => {
        setNotifications([]);
        toast.success("All notifications cleared");
    };

    const handleMarkRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, unread: false } : n
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/profile")} className="p-1">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-semibold">Notifications</h1>
                </div>
                {notifications.length > 0 && (
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 gap-1" onClick={handleClearAll}>
                        <Trash2 className="w-4 h-4" />
                        Clear All
                    </Button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Bell className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Notifications</h2>
                    <p className="text-gray-600 text-center">You're all caught up! No new notifications.</p>
                </div>
            ) : (
                <div className="px-4 py-6 space-y-4">
                    {notifications.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => handleMarkRead(note.id)}
                            className={`bg-white p-4 rounded-lg shadow-sm flex gap-4 cursor-pointer ${note.unread ? 'border-l-4 border-orange-600' : ''}`}
                        >
                            <div className="mt-1 bg-orange-100 p-2 rounded-full text-orange-600 h-fit">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-semibold ${note.unread ? 'text-gray-900' : 'text-gray-700'}`}>{note.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">{note.time}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDismiss(note.id); }}
                                            className="text-gray-400 hover:text-red-500 p-0.5"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">{note.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
