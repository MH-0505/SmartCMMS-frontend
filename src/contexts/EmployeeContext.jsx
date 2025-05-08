import React, { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error("useEmployeeContext must be used within an EmployeeProvider");
    }
    return context;
};

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            firstName: "Jan",
            lastName: "Kowalski",
            tickets: {
                total: 10,
                new: 3,
                inProgress: 4,
                completed: 3,
            },
        },
        {
            id: 2,
            firstName: "Anna",
            lastName: "Nowak",
            tickets: {
                total: 7,
                new: 1,
                inProgress: 2,
                completed: 4,
            },
        },
    ]);

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees }}>
            {children}
        </EmployeeContext.Provider>
    );
};
