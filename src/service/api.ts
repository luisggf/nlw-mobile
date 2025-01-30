import axios from "axios"
import { getLocalIPv4Address } from "./getCurrentIpv4"

export const api = axios.create({
    baseURL: "http://192.168.1.108:3333",
    timeout: 700
});