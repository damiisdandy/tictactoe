import { io } from "socket.io-client";
import { apiURL } from "../config";

const socket = io(apiURL);

export default socket;