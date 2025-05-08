import React from "react";
import StaffList from "../../components/StaffList";
import { EmployeeProvider } from "../../contexts/EmployeeContext";

export default function StaffPanel() {
    return (
        <EmployeeProvider>
            <div>
                <h2>Pracownicy</h2>
                <StaffList />
            </div>
        </EmployeeProvider>
    );
}
