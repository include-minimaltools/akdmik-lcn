import axios from "axios";

const akdmikApi = axios.create({
  baseURL: "http://localhost:5025/api/",
})

export default akdmikApi;
