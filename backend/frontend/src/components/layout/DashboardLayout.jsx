import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ padding: "24px", background: "#F8FAFC", flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
