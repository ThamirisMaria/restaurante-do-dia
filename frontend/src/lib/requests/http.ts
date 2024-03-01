import axios from "axios";

interface HeadersProps {
  Authorization?: string;
}

const accessToken = localStorage.getItem("restaurant:access_token");

const headers: HeadersProps = {};

if (accessToken) {
  headers.Authorization = `Bearer ${accessToken}`;
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { ...headers },
});
