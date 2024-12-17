import {
  CHECK_SIGNUPS,
  EDIT_CLASS,
  MANAGE_CLASSES,
  MANAGE_INSTRUCTORS,
  MY_CLASSES,
  SIGNIN,
  SIGNUP,
  USER_TO_MANAGER,
} from "./paths";
import {
  Classes,
  ForgotPassword,
  MyClasses,
  ResetLinkSent,
  ResetPassword,
  SignIn,
  SignUp,
} from "./pages";
import { Route, Routes } from "react-router-dom";
import { CLASSES, LEARNMORE, ACTIVATE } from "./paths";
import { ClassDetails } from "./pages";
import { ADMIN } from "./paths";
import { Admin } from "./pages";
import {
  CREATE_CLASS,
  FORGOT_PASSWORD,
  RESET_LINK_SENT,
  RESET_PASSWORD,
} from "./paths";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateClass,
  Dashboard,
  EditClass,
  ManageClasses,
  ManageInstructor,
  SwitchToAdmin,
  Activate,
  CheckSignups,
} from "./components";
import { setMyProfile } from "./Redux/userSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();

  const confirmAuthStatus = () => {
    // Implement authentication logic here and return true or false based on authentication status
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      const decoded_accessToken = jwtDecode(accessToken);
      const expirationDate = decoded_accessToken.exp * 1000;
      const currentTime = Date.now();

      console.log({ decoded_accessToken });

      // Check if access token is expired
      if (expirationDate >= currentTime) {
        console.log("Access token active!", expirationDate >= new Date());
        dispatch(setMyProfile(decoded_accessToken));
      } else {
        console.log("Access token expired!", expirationDate < new Date());
      }
    }
  };

  useEffect(() => {
    confirmAuthStatus();
  }, []);

  return (
    <Routes>
      <Route index path={CLASSES} element={<Classes />} />
      <Route path={SIGNIN} element={<SignIn />} />
      <Route path={SIGNUP} element={<SignUp />} />
      <Route path={LEARNMORE} element={<ClassDetails />} />
      <Route path={RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={RESET_LINK_SENT} element={<ResetLinkSent />} />
      <Route path={ACTIVATE} element={<Activate />} />
      <Route path={MY_CLASSES} element={<MyClasses />} />
      <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ADMIN} element={<Admin />}>
        <Route path={ADMIN} element={<Dashboard />} />
        <Route path={`${CHECK_SIGNUPS}/:id`} element={<CheckSignups />} />
        <Route path={CREATE_CLASS} element={<CreateClass />} />
        <Route path={USER_TO_MANAGER} element={<SwitchToAdmin />} />
        <Route path={`${EDIT_CLASS}/:id`} element={<EditClass />} />
        <Route path={MANAGE_INSTRUCTORS} element={<ManageInstructor />} />
        <Route path={MANAGE_CLASSES} element={<ManageClasses />} />
      </Route>
    </Routes>
  );
}

export default App;
