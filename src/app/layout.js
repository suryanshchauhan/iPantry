import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/welcome/Navbar";
import { AuthUserProvider } from "../../firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iPantry",
  description: "iPantry - A Pantry Inventory Tracking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthUserProvider>
          <ToastContainer />
          <Navbar />
          {children}
        </AuthUserProvider>
      </body>
    </html>
  );
}
