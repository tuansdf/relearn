import { Outlet } from "@tanstack/react-location";

import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-4 lg:py-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
