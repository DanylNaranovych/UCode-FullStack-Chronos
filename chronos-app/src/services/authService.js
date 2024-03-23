import $api from "../http";

export default class AuthService {
  static async login(login, password) {
    return $api.post("auth/login", { login, password });
  }

  static async register(email, password, passwordConfirmation, login) {
    return $api.post("auth/register", {
      email,
      password,
      passwordConfirmation,
      login,
    });
  }

  static async logout() {
    return $api.post("auth/logout");
  }
}
