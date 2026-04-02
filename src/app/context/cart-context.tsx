import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  customizations: string[];
  quantity: number;
  restaurantName: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  noCutlery: boolean;
  setNoCutlery: (value: boolean) => void;
  discount: number;
  voucherCode: string;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [noCutlery, setNoCutlery] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setVoucherCode("");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyVoucher = (code: string) => {
    const validCode = code.trim().toUpperCase();
    if (validCode === "SAVE5") {
      setDiscount(5.0);
      setVoucherCode(validCode);
      return true;
    } else if (validCode === "FREEDEL") {
      setDiscount(5.0);
      setVoucherCode(validCode);
      return true;
    } else if (validCode === "DISCOUNT10") {
      setDiscount(10.0);
      setVoucherCode(validCode);
      return true;
    }
    return false;
  };

  const removeVoucher = () => {
    setDiscount(0);
    setVoucherCode("");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        noCutlery,
        setNoCutlery,
        discount,
        voucherCode,
        applyVoucher,
        removeVoucher,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
