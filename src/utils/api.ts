import axios from "axios";

console.log("Env", import.meta.env);

const akdmikApi = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
})

export default akdmikApi;
