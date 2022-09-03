import { Outlet } from "@tanstack/react-location";

import Footer from "/src/components/layouts/footer";
import Header from "/src/components/layouts/header";

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
