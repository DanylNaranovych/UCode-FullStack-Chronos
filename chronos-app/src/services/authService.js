import $api from "../http";

export default class AuthService {
  static async login(login, password) {
    return $api.post("auth/login", { login, password });
  }

  static async register(email, password, login, full_name) {
    return $api.post("auth/register", {
      email,
      password,
      login,
      full_name,
    });
  }

  static async logout() {
    return $api.post("auth/logout");
  }
}
