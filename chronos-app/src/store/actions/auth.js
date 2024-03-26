import AuthService from "../../services/authService.js";
import Cookies from "js-cookie";

export const login = (login, password) => async (dispatch) => {
  try {
    const response = await AuthService.login(login, password);
    Cookies.set("user", JSON.stringify(response.data), {
      expires: 7,
      path: "/",
    });
    dispatch({ type: "SET_USER", payload: response.data.user });
    dispatch({ type: "SET_AUTH_STATUS", payload: true });
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const registration =
  (email, password, login, full_name) => async (dispatch) => {
    try {
      await AuthService.register(email, password, login, full_name);
      dispatch({ type: "SET_MESSAGE", payload: "Success" });
    } catch (error) {
      dispatch({ type: "SET_MESSAGE", payload: "Error" });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_AUTH_STATUS", payload: false });
  } catch (error) {
    console.error("Logout error", error);
  }
};
