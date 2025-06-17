import FormTopBar from "../components/FormTopBar";
import "../pages/Dashboard.css";
import "../App.css";

export default function NewTaskProtocolForm({ onClose, taskId}) {
    function submitTaskProtocol(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const request_url = 'http://localhost:8000/api/task-reports/create/';

        const reportData = {
            work_description: formData.get("workDescription"),
            arrival_date_time: `${formData.get("arrivalDate")}T${formData.get("arrivalTime")}`,
            completion_date_time: `${formData.get("completionDate")}T${formData.get("completionTime")}`,
            materials_and_parts_used: formData.get("materialsAndPartsUsed"),
            additional_notes: formData.get("additionalNotes"),
            task: taskId
        };

        fetch(request_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(reportData)
        })
        .then(res => {
            if (res.ok) {
                alert("Protokół został zapisany.");
                onClose();
            } else {
                return res.json().then(data => {
                    console.error("Błąd zapisu:", data);
                    alert("Nie udało się zapisać protokołu.");
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
            <FormTopBar heading="Protokół zadania" onCancelButtonClick={onClose} />

            <form onSubmit={submitTaskProtocol}>
                <div className="Form-gridbox">
                    <label htmlFor={"workDescription"}>Opis działań:</label>
                    <textarea name={"workDescription"} id={"workDescription"} rows={5} style={{resize: "vertical"}}/>

                    <label htmlFor={"arrivalDate"}>Data przybycia:</label>
                    <div>
                        <input type={"date"} name={"arrivalDate"} id={"arrivalDate"}
                               style={{minWidth: "fit-content", width: "120px", height: "100%"}}/>
                        <label style={{marginLeft: "10px"}}>
                            Godzina:
                            <input type={"time"} name={"arrivalTime"}
                                   style={{marginLeft: "10px"}}/>
                        </label>
                    </div>

                    <label htmlFor={"completionDate"}>Data usunięcia:</label>
                    <div>
                        <input type={"date"} name={"completionDate"} id={"completionDate"}
                               style={{minWidth: "fit-content", width: "120px", height: "100%"}}/>
                        <label style={{marginLeft: "10px"}}>
                            Godzina:
                            <input type={"time"} name={"completionTime"}
                                   style={{marginLeft: "10px"}}/>
                        </label>
                    </div>

                    <label htmlFor={"materialsAndPartsUsed"}>Zastosowane materiały / części:</label>
                    <textarea name={"materialsAndPartsUsed"} id={"materialsAndPartsUsed"} rows={5} style={{resize: "vertical"}}/>

                    <label htmlFor={"additionalNotes"}>Dodatkowe uwagi:</label>
                    <textarea name={"additionalNotes"} id={"additionalNotes"} rows={5} style={{resize: "vertical"}}/>
                </div>

                <button type="submit" className="Apply-button" style={{marginTop: "auto", alignSelf: "end"}}>
                    Zatwierdź protokół
                </button>
            </form>
        </>
    );
}