import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;


        if (process.env.REACT_APP_MOCK_MODE === "true") return;     // tryb MOCK

        fetch("http://localhost:8000/api/me/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => setUser(data))
            .catch(() => setUser(null));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};