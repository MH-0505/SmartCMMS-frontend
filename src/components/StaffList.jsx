import React from "react";
import { useEmployeeContext } from "../contexts/EmployeeContext";
import "./StaffList.css";

const StaffList = () => {
    const { employees } = useEmployeeContext();

    return (
        <div>
            <table className="staff-list">
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Nowe</th>
                    <th>W trakcie</th>
                    <th>Wykonane</th>
                    <th>Razem</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.tickets.new}</td>
                        <td>{employee.tickets.inProgress}</td>
                        <td>{employee.tickets.completed}</td>
                        <td>{employee.tickets.total}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffList;
