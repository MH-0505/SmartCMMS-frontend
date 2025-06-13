import FormTopBar from "../components/FormTopBar";
import "../pages/Dashboard.css";
import "../App.css";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../contexts/UserContext";

export default function NewTaskForm({ onClose }) {
    const [ employeeNames, setEmployeeNames] = useState([]);
    const { user } = useContext(UserContext);
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [selectedClient, setSelectedClient] = useState({
        position: "",
        phone_number: "",
        email_address: ""
    });
    const [locations, setLocations] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({
        address: "",
        floors: [],
        rooms: []
    });
    const [categories, setCategories] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);

    useEffect(() => {
        // TRYB MOCK
            /*TODO*/
        const fetchEmployeeNames = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/employees/names/?role=TECHNIK", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmployeeNames(data);
                } else {
                    console.error("Błąd pobierania pracowników");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchEmployeeNames();
    }, []);

    useEffect(() => {
        // TRYB MOCK
        /*TODO*/
        const fetchClients = async () => {
            try {
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

    useEffect(() => {
        // TRYB MOCK
        /*TODO*/
        const fetchLocations = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/locations/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLocations(data);
                } else {
                    console.error("Błąd pobierania lokalizacji");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        const fetchChoices = async () => {
            try{
                const response = await fetch("http://localhost:8000/api/tasks/choices/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories);
                    setTaskTypes(data.types);
                } else {
                    console.error("Błąd pobierania kategorii zadań");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        }
        fetchChoices();
    }, []);


    function submitTask(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const taskData = {
            name: formData.get("name"),
            description: formData.get("description"),
            failure_date: formData.get("failureDate"),
            failure_time: formData.get("failureTime"),
            deadline_date: formData.get("endDate"),
            deadline_time: formData.get("endTime"),
            category: formData.get("category"),
            type: "BASIC",
            priority: formData.get("priority"),
            client_id: formData.get("clientName"),
            location_id: formData.get("location"),
            technician_id: formData.get("technician") || null,
            submitter_id: user.id,
            location_floor: formData.get("floor"),
            location_room: formData.get("room"),
            location_additional_info: formData.get("additionalLocInfo")
        };
        console.log(taskData);
        fetch("http://localhost:8000/api/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(taskData)
        })
            .then(res => {
                if (res.ok) {
                    alert("Zgłoszenie zostało zapisane");
                    onClose();
                } else {
                    return res.json().then(data => {
                        console.error("Błąd zapisu:", data);
                        alert("Nie udało się zapisać zgłoszenia.");
                    });
                }
            })
            .catch(error => {
                console.error("Błąd sieci:", error);
                alert("Błąd połączenia z serwerem.");
            });
    }


    return (
        <>
            <FormTopBar heading="Nowe zgłoszenie" onCancelButtonClick={onClose} />

            <form onSubmit={submitTask}>
                <label style={{width:"100%"}}>
                    Nazwa:<br/>
                    <input name={"name"} style={{width:"100%"}}/>
                </label>

                <div className={"Scroll-panel"}>
                    <div className="Form-gridbox">
                        <h3 style={{gridColumn: "span 2"}}>Dane zgłaszającego</h3>

                        <label htmlFor={"submitterName"}>Imię i nazwisko:</label>
                        <input name={"submitterName"} id={"submitterName"} style={{width: "100%"}}
                               defaultValue={user.first_name + " " + user.last_name}/>

                        <label htmlFor={"submitterPhoneNumber"}>Telefon kontaktowy:</label>
                        <input name={"submitterPhoneNumber"} id={"submitterPhoneNumber"} style={{width: "100%"}}
                               defaultValue={user.phone_number}/>

                        <label htmlFor={"submitterEmail"}>Adres e-mail:</label>
                        <input name={"submitterEmail"} id={"submitterEmail"} style={{width: "100%"}}
                               defaultValue={user.email}/>
                    </div>

                    <div className="Form-gridbox">
                        <h3 style={{gridColumn: "span 2"}}>Dane klienta</h3>

                        <label htmlFor={"clientName"}>Imię i nazwisko:</label>
                        <select
                            name={"clientName"}
                            id={"clientName"}
                            onChange={(e) => {
                                const clientId = parseInt(e.target.value);
                                setSelectedClientId(clientId);
                                const found = clients.find(c => c.id === clientId);
                                if (found) {
                                    setSelectedClient({
                                        job_position: found.job_position || "",
                                        phone_number: found.phone_number || "",
                                        email_address: found.email_address || ""
                                    });
                                }
                            }}
                        >
                            <option value="">-- wybierz klienta --</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.first_name + " " + client.last_name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor={"clientPositionOrDepartment"}>Stanowisko / Dział:</label>
                        <input
                            name="clientPositionOrDepartment"
                            id="clientPositionOrDepartment"
                            value={selectedClient.job_position}
                            onChange={(e) =>
                                setSelectedClient({...selectedClient, job_position: e.target.value})
                            }
                        />
                        <label htmlFor={"clientPhoneNumber"}>Telefon kontaktowy:</label>
                        <input
                            name="clientPhoneNumber"
                            id="clientPhoneNumber"
                            value={selectedClient.phone_number}
                            onChange={(e) =>
                                setSelectedClient({...selectedClient, phone_number: e.target.value})
                            }
                        />
                        <label htmlFor={"clientEmail"}>Adres e-mail:</label>
                        <input
                            name="clientEmail"
                            id="clientEmail"
                            value={selectedClient.email_address}
                            onChange={(e) =>
                                setSelectedClient({...selectedClient, email_address: e.target.value})
                            }
                        />

                    </div>

                    <div className="Form-gridbox">
                        <h3 style={{gridColumn: "span 2"}}>Opis zdarzenia</h3>
                        <label htmlFor={"location"}>Obiekt / Lokalizacja:</label>
                        <select
                            name={"location"}
                            id={"location"}
                            onChange={(e) => {
                                const locationsId = parseInt(e.target.value);
                                setSelectedLocationId(locationsId);
                                const found = locations.find(c => c.id === locationsId);
                                if (found) {
                                    setSelectedLocation({
                                        address: found.address || "",
                                        floors: found.floors || "",
                                        rooms: found.rooms || ""
                                    });
                                }
                            }}
                        >
                            <option value="">-- wybierz obiekt --</option>
                            {locations.map(locations => (
                                <option key={locations.id} value={locations.id}>
                                    {locations.name + " - " + locations.address}
                                </option>
                            ))}
                        </select>

                        <label htmlFor={"address"}>Adres:</label>
                        <input name={"address"} id={"address"} style={{width: "100%"}}
                               value={selectedLocation.address}
                               onChange={(e) =>
                                   setSelectedLocation({...selectedLocation, address: e.target.value})
                               }/>

                        <label htmlFor={"floor"}>Piętro:</label>
                        <select name={"floor"} id={"floor"}>
                            <option value="">-- wybierz piętro --</option>
                            {selectedLocation.floors && selectedLocation.floors.map((floor) => (
                                <option key={floor} value={floor}>{floor}</option>
                            ))}
                        </select>

                        <label htmlFor={"room"}>Pomieszczenie:</label>
                        <select name={"room"} id={"room"}>
                            <option value="">-- wybierz pomieszczenie --</option>

                            {selectedLocation.rooms && selectedLocation.rooms.map((room) => (
                                <option key={room} value={room}>{room}</option>
                            ))}
                        </select>

                        <label htmlFor={"additionalLocInfo"} style={{paddingRight: '10px'}}>Dodatkowe informacje o lokalizacji:</label>
                        <input name={"additionalLocInfo"} id={"additionalLocInfo"} style={{width: "100%"}}></input>

                        <label htmlFor={"failureDate"}>Data awarii:</label>
                        <div>
                            <input type={"date"} name={"failureDate"} id={"failureDate"}
                                   style={{minWidth: "fit-content", width: "120px", height: "100%"}}/>
                            <label style={{marginLeft: "10px"}}>
                                Godzina:
                                <input type={"time"} name={"failureTime"} style={{marginLeft: "10px"}}/>
                            </label>
                        </div>

                        <label htmlFor={"category"}>Rodzaj awarii:</label>
                        <select name={"category"} id={"category"}>
                            {categories.map(category => (
                                <option key={category.label} value={category.value}>{category.value}</option>
                            ))}
                        </select>

                        <label htmlFor={"description"}>Opis sytuacji:</label>
                        <textarea name={"description"} id={"description"} rows={5} style={{resize: "vertical"}}/>
                    </div>

                    <div className="Form-gridbox">
                        <h3 style={{gridColumn: "span 2"}}>Serwis</h3>
                        <label htmlFor={"technician"}>Wykonawcy:</label>
                        <select name={"technician"} id={"technician"}>
                            {employeeNames.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.first_name+ ' ' +employee.last_name}</option>
                            ))}
                        </select>

                        <label htmlFor={"priority"}>Priorytet:</label>
                        <select name={"priority"} id={"priority"} style={{minWidth: "fit-content", width: "120px"}}>
                            <option key="WYSOKI" value="wysoki">Wysoki</option>
                            <option key="SREDNI" value="średni">Średni</option>
                            <option key="NISKI" value="niski">Niski</option>
                        </select>

                        <label htmlFor={"startDate"}>Data przyjęcia zgłoszenia:</label>
                        <div>
                            <input type={"date"} name={"startDate"} id={"startDate"}
                                   style={{minWidth: "fit-content", width: "120px", height: "100%"}}/>
                            <label style={{marginLeft: "10px"}}>
                                Godzina:
                                <input type={"time"} name={"startTime"} style={{marginLeft: "10px"}}/>
                            </label>
                        </div>

                        <label htmlFor={"endDate"}>Planowany termin zakończenia:</label>
                        <div>
                            <input type={"date"} name={"endDate"} id={"endDate"}
                                   style={{minWidth: "fit-content", width: "120px", height: "100%"}}/>
                            <label style={{marginLeft: "10px"}}>
                                Godzina:
                                <input type={"time"} name={"endTime"} style={{marginLeft: "10px"}}/>
                            </label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="Apply-button" style={{marginTop: "auto", alignSelf: "end"}}>
                    Zatwierdź zgłoszenie
                </button>
            </form>
        </>
    );
}