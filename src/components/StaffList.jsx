import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./StaffList.css";
import ListTopBar from "./ListTopBar";

//import {useEmployeeContext} from "../contexts/EmployeeContext"; //zakomentować po zapopulowaniu bazy

// Lista pracowników
export default function StaffList() {

    const [employees, setEmployees] = useState([]);


    //pobieranie danych
    useEffect(() => {
        // TRYB MOCK
            //TODO
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



    //const { employees } = useEmployeeContext();

    //tabela
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
                            <p><strong>Rola</strong></p>
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
            {/*ZWERYFIKOWAĆ DANE*/}
            {/*+ustalić czy prawidłowy format bez rozwinięcia/z rozwinięciem*/}

            <div className="Employee" onClick={handleClick}>

                <p>{employee.first_name} {employee.last_name} </p>
                <p>{employee.role.toLowerCase()}</p>
                <p>{employee.tasks_new}</p>
                <p>{employee.tasks_in_progress}</p>
                <p>{employee.tasks_done}</p>
                <p>{employee.tasks_done + employee.tasks_in_progress + employee.tasks_new}</p>
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
