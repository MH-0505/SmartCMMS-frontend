import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./StaffList.css";
import ListTopBar from "./ListTopBar";
import SearchTopBar from "./SearchTopBar";
import NewEmployeeForm from "./NewEmployeeForm";

//import {useEmployeeContext} from "../contexts/EmployeeContext"; //zakomentować po zapopulowaniu bazy

// Lista pracowników
export default function StaffList() {
    const [activeForm, setActiveForm] = useState(null)
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    function handleNewEmployee(){
        setSelectedEmployee(null)
        setActiveForm(true)
    }

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
                    setFilteredEmployees(data);
                } else {
                    console.error("Błąd pobierania pracowników");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        setFilteredEmployees(
            employees.filter((employee) => {
                const matchesText =
                    `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(lowerQuery) ||
                    (employee.role && employee.role.toLowerCase().includes(lowerQuery));
                const matchesRole = roleFilter ? employee.role === roleFilter : true;
                return matchesText && matchesRole;
            })
        );
    }, [employees, searchQuery, roleFilter]);

    function StaffListItem({ employee }) {
        const [isExpanded, setIsExpanded] = useState(false);

        const handleClick = () => {
            setIsExpanded(!isExpanded);
        };

        function handleEditButton() {
            setSelectedEmployee(employee)
            setActiveForm(true)

        }

        function handleDeleteButton() {

        }


        return (
            <div className={`Staff-wrapper ${isExpanded ? "active" : ""}`}>
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
                        <p><strong>Email:</strong></p>          <p> {employee.email}</p>
                        <p><strong>Telefon:</strong></p>        <p> +{employee.phone_number}</p>
                        <p><strong>Stanowisko:</strong></p>     <p> {employee.position}</p>
                        <p><strong>ID pracownika:</strong></p>  <p> {employee.id}</p>

                        <div className="List-item-bottom-bar" style={{gridColumn: "span 2"}}>
                            <button className="Standard-btn Red-btn" onClick={handleDeleteButton}
                                    style={{marginLeft: "auto"}}>
                                Usuń pracownika
                            </button>
                            <button className="Standard-btn" onClick={handleEditButton}>
                                Edytuj dane
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const handleRoleChange = (e) => {
        setRoleFilter(e.target.value);
    };

    const handleSearch = (query) => setSearchQuery(query);

    const roles = Array.from(new Set(employees.map(employee => employee.role).filter(Boolean)));

    //tabela
    return (
        <div className="Staff-panel">
            <div className="Staff-panel-container">
                <div className="Staff-list">
                    <SearchTopBar headingText="Lista pracowników"
                                  onSearch={handleSearch}
                                  buttonText={"Nowy pracownik"}
                                  onButtonClick={handleNewEmployee}
                    >
                        <div className="filters-row">
                            <label>
                                Rola:
                                <select value={roleFilter} onChange={handleRoleChange}>
                                <option value="">Wszystkie</option>
                                {roles.map(pos => (
                                    <option key={pos} value={pos}>{pos}</option>
                                ))}
                                </select>
                            </label>
                        </div>
                    </SearchTopBar>

                    <div className="Staff-list-items">
                        <div className="Staff-list-header">
                            <p><strong>Imię i nazwisko</strong></p>
                            <p><strong>Rola</strong></p>
                            <p><strong>Nowe</strong></p>
                            <p><strong>W trakcie</strong></p>
                            <p><strong>Wykonane</strong></p>
                            <p><strong>Razem</strong></p>
                        </div>
                        {filteredEmployees?.map((employee) => (
                            <StaffListItem key={employee.id} employee={employee} />
                        ))}
                    </div>
                </div>
            </div>
            {activeForm && (
                <div className="Overlay">
                    <div className="Form-container">
                        <NewEmployeeForm onClose={() => setActiveForm(false)} selectedEmployee={selectedEmployee}/>
                    </div>
                </div>
            )}
        </div>
    );
}
