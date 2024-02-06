import axios from "axios";

export const API = axios.create({
    baseURL: "https://nc-news-egcd.onrender.com/api"
});