import axios from "axios";
import { apiURL } from "../config";

const instance = axios.create({
  baseURL: apiURL,
})

export default instance;