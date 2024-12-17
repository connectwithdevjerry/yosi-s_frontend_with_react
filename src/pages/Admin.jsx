import { Link, Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "../components";
import { ToastContainer } from "react-toastify";
import { ADMIN_ROLE, INSTRUCTOR_ROLE, SIGNIN } from "../paths";
import { setAuth } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import myAlert from "../alert";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Admin = () => {
  const permissions = [ADMIN_ROLE, INSTRUCTOR_ROLE];
  const accessToken = localStorage.getItem("accessToken");
  const decoded_accessToken = jwtDecode(accessToken);
  const myRole = decoded_accessToken.permissionLev

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!permissions.includes(myRole)) {
      alert(
        "You do not have permission to access this page! We'll log you out to re-login as admin/instructor!"
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      dispatch(setAuth());

      navigate(SIGNIN);
    }
  }, [myRole]);

  return (
    <div className="bg-gray-100 h-screen flex">
      <ToastContainer limit={2} />
      <SideBar perm_type={myRole} />
      <main className="flex-1 relative px-5 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
