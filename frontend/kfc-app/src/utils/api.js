const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:8080";

export { API_BASE_URL };

export const apiUrl = (path) => {
    return `${API_BASE_URL}/${String(path).replace(/^\/+/, "")}`;
};