import axios from "axios";

const akdmikApi = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
})

export default akdmikApi;
