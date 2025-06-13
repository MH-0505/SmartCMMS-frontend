import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./ClientList.css";
import SearchTopBar from "./SearchTopBar";

// Lista klientów
export default function ClientList() {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [jobPositionFilter, setJobPositionFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); 

    //pobieranie danych
    useEffect(() => {
        // TRYB MOCK
        /*TODO*/
        const fetchClients = async () => {
            try {
                // sprawdzić, czy pobiera właściwe dane
                const response = await fetch("http://localhost:8000/api/clients/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setClients(data);
                    setFilteredClients(data);
                } else {
                    console.error("Błąd pobierania klientów");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        setFilteredClients(
            clients.filter((client) => {
                const matchesText =
                    `${client.first_name} ${client.last_name}`.toLowerCase().includes(lowerQuery) ||
                    (client.job_position && client.job_position.toLowerCase().includes(lowerQuery)) ||
                    (client.department && client.department.toLowerCase().includes(lowerQuery));
                const matchesDepartment = departmentFilter ? client.department === departmentFilter : true;
                const matchesJob = jobPositionFilter ? client.job_position === jobPositionFilter : true;
                return matchesText && matchesDepartment && matchesJob;
            })
        );
    }, [clients, searchQuery, departmentFilter, jobPositionFilter]);

    const handleDepartmentChange = (e) => {
        setDepartmentFilter(e.target.value);
    };
    const handleJobPositionChange = (e) => {
        setJobPositionFilter(e.target.value);
    };

    const handleSearch = (query) => setSearchQuery(query);

    const departments = Array.from(new Set(clients.map(client => client.department).filter(Boolean)));
    const jobPositions = Array.from(new Set(clients.map(client => client.job_position).filter(Boolean)));

    return (
        <div className="Client-panel">
            <div className="Client-panel-container">
                <div className="Client-list">
                    <SearchTopBar headingText="Lista klientów" onSearch={handleSearch}>
                        <div className="filters-row">
                            <label>
                                Stanowisko:
                                <select value={jobPositionFilter} onChange={handleJobPositionChange}>
                                <option value="">Wszystkie</option>
                                {jobPositions.map(pos => (
                                    <option key={pos} value={pos}>{pos}</option>
                                ))}
                                </select>
                            </label>
                            <label>
                                Dział:
                                <select value={departmentFilter} onChange={handleDepartmentChange}>
                                <option value="">Wszystkie</option>
                                {departments.map(dep => (
                                    <option key={dep} value={dep}>{dep}</option>
                                ))}
                                </select>
                            </label>
                        </div>
                    </SearchTopBar>

                    <div className="Client-list-items">
                        <div className="Client-list-header">
                            <p><strong>Imię i nazwisko</strong></p>
                            <p><strong>Stanowisko</strong></p>
                            <p><strong>Dział</strong></p>
                        </div>
                        {filteredClients?.map((client) => (
                            <ClientListItem key={client.id} client={client} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// pojedynczy klient
function ClientListItem({ client }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`Client-wrapper ${isExpanded ? "active" : ""}`}>
            {/*ZWERYFIKOWAĆ DANE*/}
            {/*+ustalić czy prawidłowy format bez rozwinięcia/z rozwinięciem*/}
            <div className="Client" onClick={handleClick}>
                <p>{client.first_name} {client.last_name}</p>
                <p>{client.job_position}</p>
                <p>{client.department}</p>
            </div>

            {isExpanded && (
                <div className="Client-details">
                    <div style={{ gridColumn: "span 2" }}>
                        <p><strong>ID klienta:</strong> {client.id}</p>
                        <p><strong>Email:</strong> {client.email_address}</p>
                        <p><strong>Telefon:</strong> +{client.phone_number}</p>
                        <p><strong>Stanowisko:</strong> {client.job_position}</p>
                        <p><strong>Dział:</strong> {client.department}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
