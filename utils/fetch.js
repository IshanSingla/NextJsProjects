export const fetchUser = () => {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
  
    return userInfo;
  };
  
  export const userAccessToken = () => {
    const accessToken =
      localStorage.getItem("accessToken") !== "undefined"
        ? JSON.parse(localStorage.getItem("accessToken"))
        : localStorage.clear();
  
    return accessToken;
  };