import FormTopBar from "./FormTopBar";
import {useState} from "react";

export default function NewLocationForm({onClose, selectedLocation}) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);


        const LocationData = {
            name: formData.get("name"),
            address: formData.get("address"),
            floors: formData.get("floors").split(","),
            rooms: formData.get("rooms").split(","),
        };
        console.log(LocationData);

        fetch(`http://localhost:8000/api/locations/${selectedLocation ? selectedLocation.id + "/": ""}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(LocationData)
        })
            .then(res => {
                if (res.ok) {
                    if(selectedLocation) {
                        alert("Zaktualizowano dane obiektu");
                    } else{
                        alert("Dodano nowy obiekt");
                    }
                    onClose();
                } else {
                    return res.json().then(data => {
                        console.error("Błąd zapisu:", data);
                        alert("Nie udało się zapisać danych.");
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
            <FormTopBar heading={selectedLocation ? "Edytuj dane obiektu" : "Nowy obiekt"} onCancelButtonClick={onClose} />

            <form onSubmit={handleSubmit}>
                <div className={"Scroll-panel"}>
                    <div className="Form-gridbox">
                        <label htmlFor={"name"}>Nazwa:</label>
                        <input name="name" id="name" defaultValue={selectedLocation ? selectedLocation.name : null} />

                        <label htmlFor={"address"}>Adres:</label>
                        <input name="address" id="address" defaultValue={selectedLocation ? selectedLocation.address : null}/>

                        <label htmlFor={"floors"}>Piętra:</label>
                        <textarea name="floors" id="floors" rows={5} style={{resize: "vertical"}}
                                  defaultValue={selectedLocation.floors ? selectedLocation.floors.join(',') : null}/>

                        <label htmlFor={"rooms"}>Pomieszczenia:</label>
                        <textarea name="rooms" id="rooms" rows={5} style={{resize: "vertical"}}
                                  defaultValue={selectedLocation.rooms ? selectedLocation.rooms.join(',') : null}/>
                    </div>
                </div>

                <button type="submit" className="Apply-button" style={{marginTop: "auto", alignSelf: "end"}}>
                    Zatwierdź
                </button>
            </form>
        </>
    );
}