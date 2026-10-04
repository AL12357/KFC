import axios from "axios";
import { apiUrl } from "./api";

export const getdata = async (url) => {
    const requestUrl = /^https?:\/\//i.test(url)
        ? url
        : apiUrl(url);

    const res = await axios.get(requestUrl);

    return res.data;
};