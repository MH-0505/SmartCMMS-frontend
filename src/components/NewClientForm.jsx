import FormTopBar from "./FormTopBar";
import {useState} from "react";

export default function NewClientForm({onClose, selectedClient}) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const clientData = {
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            job_position: formData.get("position"),
            department: formData.get("department"),
            email_address: formData.get("emailAddress"),
            phone_number: formData.get("phoneNumber"),

        };
        console.log(clientData);

        fetch(`http://localhost:8000/api/clients/${selectedClient ? selectedClient.id + "/": ""}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(clientData)
        })
            .then(res => {
                if (res.ok) {
                    if(selectedClient) {
                        alert("Zaktualizowano dane klienta");
                    } else{
                        alert("Dodano nowego klienta");
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
            <FormTopBar heading={selectedClient ? "Edytuj dane klienta" : "Nowy Klient"} onCancelButtonClick={onClose} />

            <form onSubmit={handleSubmit}>
                <div className={"Scroll-panel"}>
                    <div className="Form-gridbox">
                        <label htmlFor={"firstName"}>Imię:</label>
                        <input name="firstName" id="firstName" defaultValue={selectedClient ? selectedClient.first_name : null} />

                        <label htmlFor={"lastName"}>Nazwisko:</label>
                        <input name="lastName" id="lastName" defaultValue={selectedClient ? selectedClient.last_name : null}/>

                        <label htmlFor={"position"}>Stanowisko:</label>
                        <input name="position" id="position" defaultValue={selectedClient ? selectedClient.job_position : null}/>

                        <label htmlFor={"department"}>Dział:</label>
                        <input name="department" id="department" defaultValue={selectedClient ? selectedClient.department : null}/>

                        <label htmlFor={"phoneNumber"}>Telefon kontaktowy:</label>
                        <input name="phoneNumber" id="phoneNumber" defaultValue={selectedClient ? selectedClient.phone_number : null}/>

                        <label htmlFor={"emailAddress"}>Adres e-mail:</label>
                        <input name="emailAddress" id="emailAddress" defaultValue={selectedClient ? selectedClient.email_address : null}/>

                    </div>
                </div>

                <button type="submit" className="Apply-button" style={{marginTop: "auto", alignSelf: "end"}}>
                    Zatwierdź
                </button>
            </form>
        </>
    );
}