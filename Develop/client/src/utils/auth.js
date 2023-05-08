// use this to decode a token and get the user's information out of it
import { decode } from "jwt-decode";

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  getRole() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("role");
  }

  login(idToken, role) {
    localStorage.setItem("id_token", idToken);

    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.setItem("role", "user");
    }

    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("role");
    window.location.assign("/");
  }
}

const auth = new AuthService();

export default auth;
