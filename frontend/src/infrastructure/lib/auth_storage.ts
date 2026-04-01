export const saveAuthHeaders = (headers: any) => {
  localStorage.setItem("access-token", headers["access-token"]);
  localStorage.setItem("client", headers["client"]);
  localStorage.setItem("uid", headers["uid"]);
};

export const getAuthHeaders = () => ({
  "access-token": localStorage.getItem("access-token"),
  client: localStorage.getItem("client"),
  uid: localStorage.getItem("uid"),
});
