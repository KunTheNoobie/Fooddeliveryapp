import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./context/cart-context";
import { OrderProvider } from "./context/order-context";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </OrderProvider>
    </CartProvider>
  );
}