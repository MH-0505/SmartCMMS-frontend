import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./ClientList.css";
import ListTopBar from "./ListTopBar";
import NewClientForm from "./NewClientForm";

// Lista klientów
export default function ClientList() {
    const [clients, setClients] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    function handleNewClient(){
        setSelectedClient(null)
        setActiveForm(true)
    }

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

    // pojedynczy klient
    function ClientListItem({ client }) {
        const [isExpanded, setIsExpanded] = useState(false);

        const handleClick = () => {
            setIsExpanded(!isExpanded);
        };

        function handleEditButton() {
            setSelectedClient(client)
            setActiveForm(true)
        }

        function handleDeleteButton() {

        }

        return (
            <div className={`Client-wrapper ${isExpanded ? "active" : ""}`}>
                <div className="Client" onClick={handleClick}>
                    <p>{client.first_name} {client.last_name}</p>
                    <p>{client.job_position}</p>
                    <p>{client.department}</p>
                </div>

                {isExpanded && (
                    <div className="Client-details">
                        <p><strong>ID klienta:</strong></p> <p> {client.id}</p>
                        <p><strong>Email:</strong></p>      <p> {client.email_address}</p>
                        <p><strong>Telefon:</strong></p>    <p> +{client.phone_number}</p>
                        <p><strong>Stanowisko:</strong></p> <p> {client.job_position}</p>
                        <p><strong>Dział:</strong></p>      <p> {client.department}</p>

                        <div className="List-item-bottom-bar" style={{gridColumn: "span 2"}}>
                            <button className="Standard-btn Red-btn" onClick={handleDeleteButton} style={{marginLeft: "auto"}}>
                                Usuń klienta
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

    return (
        <div className="Client-panel">
        <div className="Client-panel-container">
                <div className="Client-list">
                    <ListTopBar
                        headingText="Lista klientów"
                        buttonText={"Nowy klient"}
                        onButtonClick={handleNewClient}
                    >
                        {/* TODO: Filtry */}
                    </ListTopBar>

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
            {activeForm && (
                <div className="Overlay">
                    <div className="Form-container">
                        <NewClientForm onClose={() => setActiveForm(false)} selectedClient={selectedClient}/>
                    </div>
                </div>
            )}
        </div>
    );
}


