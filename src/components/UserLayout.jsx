import { Outlet } from "react-router-dom";
import HeaderUser from "./HeaderUser";
import FooterUser from "./FooterUser";


export default function UserLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <HeaderUser />
      
      {/* Main Content */}
      <div id="main-content" className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Footer */}
      <FooterUser />
    </div>
  );
}

 