import FormTopBar from "../components/FormTopBar";
import "../pages/Dashboard.css";
import "../App.css";

export default function NewTaskForm({ onClose }) {

    function submitTask() {
        // TODO
    }

    return (
        <>
            <FormTopBar heading="Nowe zgłoszenie" onCancelButtonClick={onClose} />

            <form action={submitTask}>
                <label style={{width:"100%"}}>
                    Nazwa:<br/>
                    <input name={"name"} style={{width:"100%"}}/>
                </label>

                <div className="Form-gridbox">
                    <h3 style={{gridColumn: "span 2"}}>Dane zgłaszającego</h3>

                    <label htmlFor={"clientName"}>Imię i nazwisko:</label>
                    <select name={"clientName"} id={"clientName"}>
                        <option>Tomasz Konieczny</option>
                        <option>Marek Mazur</option>
                    </select>

                    <label htmlFor={"clientPositionOrDepartment"}>Stanowisko / Dział:</label>
                    <input name={"clientPositionOrDepartment"} id={"clientPositionOrDepartment"} style={{width: "100%"}}/>

                    <label htmlFor={"clientPhoneNumber"}>Telefon kontaktowy:</label>
                    <input name={"clientPhoneNumber"} id={"clientPhoneNumber"} style={{width: "100%"}}/>

                    <label htmlFor={"clientEmail"}>Adres e-mail:</label>
                    <input name={"clientEmail"} id={"clientEmail"} style={{width: "100%"}}/>
                </div>

                <div className="Form-gridbox">
                    <h3 style={{gridColumn: "span 2"}}>Opis zdarzenia</h3>
                    <label htmlFor={"location"}>Obiekt / Lokalizacja:</label>
                    <select name={"location"} id={"location"}>
                        <option>Fabryka 1</option>
                        <option>Szkoła</option>
                        <option>Biuro 1</option>
                        <option>Biuro 2</option>
                    </select>

                    <label htmlFor={"address"}>Adres:</label>
                    <input name={"address"} id={"address"} style={{width: "100%"}}/>

                    <label htmlFor={"roomOrFloor"}>Piętro / Pomieszczenie:</label>
                    <input name={"roomOrFloor"} id={"roomOrFloor"} style={{width: "100%"}}/>

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
                        <option>Instalacja elektryczna</option>
                        <option>Instalacja wodno-kanalizacyjna</option>
                        <option>Instalacja HVAC</option>
                        <option>System alarmowy / ppoż.</option>
                        <option>Usterka budowlana</option>
                        <option>Inne</option>
                    </select>

                    <label htmlFor={"description"}>Opis sytuacji:</label>
                    <textarea name={"description"} id={"description"} rows={5} style={{resize: "vertical"}}/>
                </div>

                <div className="Form-gridbox">
                    <h3 style={{gridColumn: "span 2"}}>Serwis</h3>
                    <label htmlFor={"technician"}>Wykonawcy:</label>
                    <select name={"technician"} id={"technician"}>
                        <option>Jan Kowalski</option>
                        <option>Adam Nowak</option>
                        <option>Andrzej Górecki</option>
                    </select>

                    <label htmlFor={"priority"}>Priorytet:</label>
                    <select name={"priority"} id={"priority"} style={{minWidth: "fit-content", width: "120px"}}>
                        <option>Wysoki</option>
                        <option>Średni</option>
                        <option>Niski</option>
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

                <button type="submit" className="Apply-button" style={{marginTop: "auto", alignSelf: "end"}}>
                    Zatwierdź zgłoszenie
                </button>
            </form>
        </>
    );
}