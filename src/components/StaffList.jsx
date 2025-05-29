import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./StaffList.css";
import ListTopBar from "./ListTopBar";

// Lista pracowników
export default function StaffList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // sprawdzić, czy pobiera właściwe dane
                const response = await fetch("http://localhost:8000/api/employees/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                } else {
                    console.error("Błąd pobierania pracowników");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="Staff-panel">
            <div className="Staff-panel-container">
                <div className="Staff-list">
                    <ListTopBar headingText="Lista pracowników">
                        {/* TODO: Filtry */}
                    </ListTopBar>

                    <div className="Staff-list-items">
                        <div className="Staff-list-header">
                            <p><strong>Imię i nazwisko</strong></p>
                            <p><strong>Nowe</strong></p>
                            <p><strong>W trakcie</strong></p>
                            <p><strong>Wykonane</strong></p>
                            <p><strong>Razem</strong></p>
                        </div>
                        {employees?.map((employee) => (
                            <StaffListItem key={employee.id} employee={employee} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// pojedynczy pracownik
function StaffListItem({ employee }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`Staff-wrapper ${isExpanded ? "active" : ""}`}>
            <div className="Employee" onClick={handleClick}>
                <p>{employee.firstName} {employee.lastName}</p>
                <p>{employee.tickets.new}</p>
                <p>{employee.tickets.inProgress}</p>
                <p>{employee.tickets.completed}</p>
                <p>{employee.tickets.total}</p>
            </div>

            {isExpanded && (
                <div className="Staff-details">
                    <div style={{ gridColumn: "span 2" }}>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Telefon:</strong> {employee.phone}</p>
                        <p><strong>Stanowisko:</strong> {employee.position}</p>
                        <p><strong>ID pracownika:</strong> {employee.id}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
