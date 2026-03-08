import { Header } from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/components/context/CartContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
}