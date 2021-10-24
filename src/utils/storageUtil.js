const storageUtil = {
  saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user") || "{}");
  },

  removeUser() {
    localStorage.removeItem("user");
  },
};
export default storageUtil;
