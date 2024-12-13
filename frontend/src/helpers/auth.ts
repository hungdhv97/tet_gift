export const setAccessToken = (token: string | null) => {
    localStorage.setItem("access_token", token || "");
    document.cookie = `access_token=${token}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

export const getAccessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("access_token");
    }
    return null;
};

export const removeAccessToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
};
