import { useEffect, useState } from "react";
import "../pages/Dashboard.css";
import "../App.css";
import "./FacilitiesList.css";
import ListTopBar from "./ListTopBar";

//lista obiektów
export default function FacilitiesList() {
    const [facilities, setFacilities] = useState([]);

    //pobieranie danych
    useEffect(() => {
        // TRYB MOCK
            /*TODO*/
        const fetchFacilities = async () => {
            try {
                // sprawdzić, czy pobiera właściwe dane
                const response = await fetch("http://localhost:8000/api/facilities/", {
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

    return (
        <div className="Facilities-panel">
            <div className="Facilities-panel-container">
                <div className="Facilities-list">
                    <ListTopBar headingText="Lista obiektów">
                        {/* TODO: Filtry */}
                    </ListTopBar>

                    <div className="Facilities-list-items">
                        <div className="Facilities-list-header">
                            <p><strong>Nazwa</strong></p>
                            <p><strong>Adres</strong></p>
                            <p><strong>Piętra</strong></p>
                            <p><strong>Pomieszczenia</strong></p>
                        </div>
                        {facilities?.map((facility) => (
                            <FacilityListItem key={facility.id} facility={facility} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// pojedynczy obiekt
function FacilityListItem({ facility }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`Facility-wrapper ${isExpanded ? "active" : ""}`}>
            {/*ZWERYFIKOWAĆ DANE*/}
            {/*+ustalić czy prawidłowy format bez rozwinięcia/z rozwinięciem*/}
            <div className="Facility" onClick={handleClick}>
                <p>{facility.name}</p>
                <p>{facility.address}</p>
                <p>{facility.floors}</p>
                <p>{facility.rooms}</p>
            </div>

            {isExpanded && (
                <div className="Facility-details">
                    <div style={{ gridColumn: "span 2" }}>
                        <p><strong>ID obiektu:</strong> {facility.id}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
