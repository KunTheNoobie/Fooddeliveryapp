import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "./cart-context";

export interface OrderRating {
    foodRating?: number;
    riderRating?: number;
    comment?: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    paymentMethod: string;
    restaurantName: string;
    riderName: string;
    date: string;
    rating?: OrderRating;
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderRating: (orderId: string, rating: OrderRating) => void;
    activeOrder: Order | null;
    setActiveOrder: (order: Order | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeOrder, setActiveOrder] = useState<Order | null>(null);

    const addOrder = (order: Order) => {
        setOrders([order, ...orders]);
    };

    const updateOrderRating = (orderId: string, rating: OrderRating) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId ? { ...order, rating } : order
            )
        );
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                updateOrderRating,
                activeOrder,
                setActiveOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
}
