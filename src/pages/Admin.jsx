import { Link, Outlet } from "react-router-dom";
import {
  CreateClass,
  Dashboard,
  ManageClasses,
  ManageInstructor,
  SideBar,
  SwitchToAdmin,
} from "../components";

const Admin = () => {
  return (
    <div className="bg-gray-100 h-screen flex">
      <SideBar />
      <main className="flex-1 relative px-5 overflow-y-scroll">
        <Outlet />
        {/* <CreateClass /> */}
        {/* <Dashboard /> */}
        {/* <ManageClasses /> */}
        {/* <ManageInstructor /> */}
        {/* <SwitchToAdmin /> */}
      </main>
    </div>
  );
};

export default Admin;
