import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
  getUserById(userid) {
    return axios.get("http://localhost:8080/change_user" + "/" + userid);
  }
  updateUser(user, userid) {
    return axios.put("http://localhost:8080/change_user" + "/" + userid, user);
  }
  updateUserAdmin(user, userid) {
    return axios.put("http://localhost:8080/update-user/" + userid, user);
  }
  updatePassword(username, password, userid) {
    return axios.put(
      "http://localhost:8080/change_user" + "/" + userid + "/" + password,
      username
    );
  }
  updatePassword1(userid,username,password,newpass) {
    return axios
      .put("http://localhost:8080/change_user/"+userid/+newpass, {
        username,
        password
      });
     
  }
  getUser(page) {
    return axios.get("http://localhost:8080/all-user?page=" + page);
  }

}

export default new UserService();
