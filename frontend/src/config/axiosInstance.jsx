
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:1972/"
});
export default axiosInstance;