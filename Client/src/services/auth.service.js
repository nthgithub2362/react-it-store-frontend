import axios from "axios";
import { Redirect } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
  logoutAdmin() {
    localStorage.removeItem("user");
    return <Redirect to={"/home"} />
  }

  register(username, email, password, address, phone) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      address,
      phone,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
