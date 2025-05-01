import FormTopBar from "../components/FormTopBar";
import "../pages/Dashboard.css";
import "../App.css";

export default function NewTaskProtocolForm({ onClose }) {
    function submitTaskProtocol() {
        // TODO
    }

    return (
        <>
            <FormTopBar heading="Protokół zadania" onCancelButtonClick={onClose} />

            <form action={submitTaskProtocol}>
                <div className="Form-gridbox">
                    <label htmlFor={"receivingPerson"}>Osoba przyjmująca:</label>
                    <input name={"receivingPerson"} id={"receivingPerson"} style={{width: "100%"}}/>

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