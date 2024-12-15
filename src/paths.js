export const CLASSES = "/classes";
export const ABOUT = "/about";
export const SIGNIN = "/signin";
export const SIGNUP = "/signup";
export const FORGOT_PASSWORD = "/forgot-password";
export const CONTACT = "/contact";
export const LEARNMORE = "/class-details";
export const ADMIN = "/admin";
export const MANAGE_INSTRUCTORS = "/admin/manage-instructors";
export const MANAGE_CLASSES = "/admin/manage-classes";
export const CREATE_CLASS = "/admin/manage-classes/create";
export const USER_TO_MANAGER = "/admin/manage-instructors/create";
export const EDIT_CLASS = "/admin/manage-classes/edit";
export const DEL_CLASS = "/admin/manage-classes/del";
export const ACTIVATE = "/confirm_email_address/:token";
export const RESET_LINK_SENT = "/resetlinksent/:email";
export const RESET_PASSWORD = "/resetpassword/:token";

// Backend paths
export const BASE_URL = "http://localhost:5000/";
export const ALLOWED_ORIGIN = "*";
export const BACK_SIGNIN = "user/signin";
export const GET_NEW_TOKEN = "user/get_access";
export const BACK_SIGNUP = "user/signup";
export const GET_USERS = "user/get_users";
export const BACK_ACTIVATE = "user/activate";
export const BACK_FORGOT = "user/forgot_password";
export const BACK_RESET_PASSWORD = "user/reset_password";
export const GET_CLASSES = "classes/get_classes";
export const GET_CLASSES_ADMIN = "classes/get_classes_admin";
export const JOIN_CLASS = "classes/join_class";
export const AUTHORIZE = "user/grant_user_permission";

// CONSTANTS
export const ADMIN_ROLE = "admin";
export const INSTRUCTOR_ROLE = "instructor";
export const USER_ROLE = "user";
