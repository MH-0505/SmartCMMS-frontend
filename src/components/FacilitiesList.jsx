import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./FacilitiesList.css";
import ListTopBar from "./ListTopBar";
import NewLocationForm from "./NewLocationForm";


//lista obiektów
export default function FacilitiesList() {
    const [facilities, setFacilities] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    function handleNewLocation(){
        setSelectedLocation(null)
        setActiveForm(true)
    }

    //pobieranie danych
    useEffect(() => {
        // TRYB MOCK
            /*TODO*/
        const fetchFacilities = async () => {
            try {
                // sprawdzić, czy pobiera właściwe dane
                const response = await fetch("http://localhost:8000/api/locations/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFacilities(data);
                } else {
                    console.error("Błąd pobierania obiektów");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchFacilities();
    }, []);


    function FacilityListItem({ facility }) {
        const [isExpanded, setIsExpanded] = useState(false);

        const handleClick = () => {
            setIsExpanded(!isExpanded);
        };

        function handleEditButton() {
            setSelectedLocation(facility)
            setActiveForm(true)
        }

        function handleDeleteButton() {

        }

        return (
            <div className={`Facility-wrapper ${isExpanded ? "active" : ""}`}>
                <div className="Facility" onClick={handleClick}>
                    <p>{facility.name}</p>
                    <p>{facility.address}</p>
                </div>

                {isExpanded && (
                    <div className="Facility-details">
                        <p><strong>ID obiektu:</strong></p> <p> {facility.id}</p>
                        {facility.floors && (
                            <div style={{
                                display: 'grid',
                                gridColumn: '2 span',
                                gridColumnGap: '10px',
                                gridTemplateColumns: '1fr 3fr'
                            }}>
                                <p><strong>Piętra:</strong></p> <p> {facility.floors.join(', ')}</p>
                            </div>
                        )}

                        {facility.rooms && (
                            <div style={{
                                display: 'grid',
                                gridColumn: '2 span',
                                gridColumnGap: '10px',
                                gridTemplateColumns: '1fr 3fr'
                            }}>
                                <p><strong>Pomieszczenia:</strong></p>  <p> {facility.rooms.join(', ')}</p>
                            </div>
                        )}

                        <div className="List-item-bottom-bar" style={{gridColumn: "span 2"}}>
                            <button className="Standard-btn Red-btn" onClick={handleDeleteButton}
                                    style={{marginLeft: "auto"}}>
                                Usuń obiekt
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
        <div className="Facilities-panel">
            <div className="Facilities-panel-container">
                <div className="Facilities-list">
                    <ListTopBar
                        headingText="Lista obiektów"
                        buttonText={"Nowy obiekt"}
                        onButtonClick={handleNewLocation}
                    >
                        {/* TODO: Filtry */}
                    </ListTopBar>

                    <div className="Facilities-list-items">
                        <div className="Facilities-list-header">
                            <p><strong>Nazwa</strong></p>
                            <p><strong>Adres</strong></p>
                        </div>
                        {facilities?.map((facility) => (
                            <FacilityListItem key={facility.id} facility={facility} />
                        ))}
                    </div>
                </div>
            </div>
            {activeForm && (
                <div className="Overlay">
                    <div className="Form-container">
                        <NewLocationForm onClose={() => setActiveForm(false)} selectedLocation={selectedLocation}/>
                    </div>
                </div>
            )}
        </div>
    );
}


