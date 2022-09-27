import axios from "axios";
class AuthService {
  async login(email, password) {
    return axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        if (res.data.AccessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      })
      .catch((error) => {
        return false;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
