// let BASE_URL = "http://localhost:3001/api/v1";
let BASE_URL;
if (process.env.REACT_APP_ENV === "development") {
  BASE_URL = "http://localhost:3001/api/v1";
}
if (process.env.REACT_APP_ENV === "production") {
  BASE_URL = "http://apitodo.naikvaibhav.online/api/v1";
}

export { BASE_URL };
