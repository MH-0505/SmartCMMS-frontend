import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./ClientList.css";
import SearchTopBar from "./SearchTopBar";

// Lista klientów
export default function ClientList() {
    const [clients, setClients] = useState([]);

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
                } else {
                    console.error("Błąd pobierania klientów");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchClients();
    }, []);

    return (
        <div className="Client-panel">
            <div className="Client-panel-container">
                <div className="Client-list">
                    <SearchTopBar headingText="Lista klientów">
                        {/* TODO: Filtry */}
                    </SearchTopBar>

                    <div className="Client-list-items">
                        <div className="Client-list-header">
                            <p><strong>Imię i nazwisko</strong></p>
                            <p><strong>Stanowisko</strong></p>
                            <p><strong>Dział</strong></p>
                        </div>
                        {clients?.map((client) => (
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
