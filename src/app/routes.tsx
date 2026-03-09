import { createBrowserRouter } from "react-router";
import { AuthScreen } from "./screens/auth-screen";
import { HomeScreen } from "./screens/home-screen";
import { ItemScreen } from "./screens/item-screen";
import { CartScreen } from "./screens/cart-screen";
import { PaymentScreen } from "./screens/payment-screen";
import { TrackingScreen } from "./screens/tracking-screen";
import { OrdersScreen } from "./screens/orders-screen";
import { ProfileScreen } from "./screens/profile-screen";
import { SavedAddressesScreen } from "./screens/saved-addresses-screen";
import { PaymentMethodsScreen } from "./screens/payment-methods-screen";
import { NotificationsScreen } from "./screens/notifications-screen";
import { SupportScreen } from "./screens/support-screen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthScreen,
  },
  {
    path: "/home",
    Component: HomeScreen,
  },
  {
    path: "/item/:id",
    Component: ItemScreen,
  },
  {
    path: "/cart",
    Component: CartScreen,
  },
  {
    path: "/payment",
    Component: PaymentScreen,
  },
  {
    path: "/tracking",
    Component: TrackingScreen,
  },
  {
    path: "/orders",
    Component: OrdersScreen,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
  },
  {
    path: "/profile/addresses",
    Component: SavedAddressesScreen,
  },
  {
    path: "/profile/payment-methods",
    Component: PaymentMethodsScreen,
  },
  {
    path: "/profile/notifications",
    Component: NotificationsScreen,
  },
  {
    path: "/profile/support",
    Component: SupportScreen,
  },
]);