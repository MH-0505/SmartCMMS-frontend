import { createContext, useState, useEffect } from "react";

export const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;


        if (process.env.REACT_APP_MOCK_MODE === "true") return;     // tryb MOCK

        fetch("http://localhost:8000/api/clients/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => setClients(data))
            .catch(() => setClients(null));
    }, []);

    return (
        <ClientsContext.Provider value={{ clients, setClients }}>
            {children}
        </ClientsContext.Provider>
    );
};