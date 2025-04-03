import { useNavigate } from "react-router-dom"
import { useState } from "react";
import "./Dashboard.css";
import "../App.css";


export default function Dashboard() {
    const navigate = useNavigate();
    const [activeForm, setActiveForm] = useState(null);

    function handleFormOpen(formType) {
        setActiveForm(formType);
    }

    function handleFormClose(){
        setActiveForm(null);
    }

    function handleLogout() {
        //localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <div>
            <header className="Header-bar">
                <div>
                    <h1 className="App-title">SmartCMMS</h1>
                </div>
                <div style={{height: 'auto', marginLeft: '5vw'}}>
                    <button className="Header-button" onClick={() => handleFormOpen("NewMaintenance")}>
                        Przeglądy okresowe
                    </button>
                    <button className="Header-button" onClick={() => handleFormOpen("FailureReport")}>
                        Zgłoszenie awarii
                    </button>
                </div>
                <div style={{marginLeft: 'auto'}}>
                    <button className="Header-button" onClick={handleLogout}>Wyloguj</button>
                </div>
            </header>

            {activeForm && (
                <div className="Overlay">
                    <div className="Form-container">
                        {activeForm === "NewMaintenance" ? (
                            <NewMaintenanceForm onClose={handleFormClose} />
                        ) : activeForm === "FailureReport" ? (
                            <NewFailureReportForm onClose={handleFormClose} />
                        ) : null}
                    </div>
                </div>
            )}

            <div className="Dashboard-container">
                {/* TODO */}
            </div>
        </div>
    );
}

function FormTopBar({heading, onCancelButtonClick}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>
                <h2>{heading}</h2>
            </div>
            <button className="Cancel-button" onClick={onCancelButtonClick}>Anuluj</button>
        </div>
    );
}

function NewMaintenanceForm({ onClose }) {
    return (
        <>
            <FormTopBar heading="Nowy przegląd okresowy" onCancelButtonClick={onClose} />
            <p>Formularz przeglądu (TODO)</p>
        </>

    );
}

function NewFailureReportForm({ onClose }) {
    const [startTime, setStartTime] = useState("--:--");
    const [endTime, setEndTime] = useState("--:--");
    const [startWholeDay, setStartWholeDay] = useState(false);
    const [endWholeDay, setEndWholeDay] = useState(false);

    function handleStartTimeCheckbox(checked){
        setStartWholeDay(checked)
        setStartTime("--:--");
    }

    function handleEndTimeCheckbox(checked){
        setEndWholeDay(checked)
        setEndTime("--:--");
    }

    function submitFailureReport() {
        // TODO
    }

    return (
        <>
            <FormTopBar heading="Nowe zgłoszenie awarii" onCancelButtonClick={onClose} />

            <form action={submitFailureReport}>
                <label style={{width:"100%"}}>
                    Nazwa:<br/>
                    <input name={"name"} style={{width:"100%"}}/>
                </label>

                <div className="Form-gridbox">
                    <label htmlFor={"category"}>Kategoria:</label>
                    <select name={"category"} id={"category"}>
                        <option>Budowlana</option>
                        <option>Elektryczna</option>
                        <option>Gazowa</option>
                        <option>Woda i kanalizacja</option>
                        <option>Inne</option>
                    </select>

                    <label htmlFor={"technician"}>Wykonawcy:</label>
                    <select name={"technician"} id={"technician"}>
                        <option>Jan Kowalski</option>
                        <option>Adam Nowak</option>
                        <option>Andrzej Górecki</option>
                    </select>

                    <label htmlFor={"description"}>Opis:</label>
                    <textarea name={"description"} id={"description"} rows={8} style={{resize: "vertical"}}/>

                    <label htmlFor={"startDate"}>Planowany termin rozpoczęcia:</label>
                    <div>
                        <input type={"date"} name={"startDate"} id={"startDate"}
                               style={{ minWidth: "fit-content", width: "120px", height: "100%"}}/>
                        <label style={{ marginLeft: "10px"}}>
                            Godzina:
                            <input type={"time"} name={"startTime"} value={startTime} disabled={startWholeDay}
                                   onChange={e => setStartTime(e.target.value)}
                                   style={{ marginLeft: "10px"}}/>
                        </label>
                        <label style={{ marginLeft: "10px"}}>
                            Cały dzień -
                            <input type={"checkbox"} name={"startWholeDay"} checked={startWholeDay}
                                   onChange={e => handleStartTimeCheckbox(e.target.checked)}
                                   style={{marginLeft: "5px"}}/>
                        </label>
                    </div>

                    <label htmlFor={"endDate"}>Planowany termin zakończenia:</label>
                    <div>
                        <input type={"date"} name={"endDate"} id={"endDate"}
                               style={{minWidth: "fit-content", width: "120px", height: "100%"}}/>
                        <label style={{marginLeft: "10px"}}>
                            Godzina:
                            <input type={"time"} name={"endTime"} value={endTime} disabled={endWholeDay}
                                   onChange={e => setEndTime(e.target.value)}
                                   style={{marginLeft: "10px"}}/>
                        </label>
                        <label style={{marginLeft: "10px"}}>
                            Cały dzień -
                            <input type={"checkbox"} name={"endWholeDay"} checked={endWholeDay}
                                   onChange={e => handleEndTimeCheckbox(e.target.checked)}
                                   style={{marginLeft: "5px"}}/>
                        </label>
                    </div>

                    <label htmlFor={"priority"}>Priorytet:</label>
                    <select name={"priority"} id={"priority"} style={{minWidth: "fit-content", width: "120px"}}>
                        <option>Bardzo wysoki</option>
                        <option>Wysoki</option>
                        <option>Normalny</option>
                        <option>Niski</option>
                        <option>Bardzo niski</option>
                    </select>
                </div>

                <button type="submit" className="Apply-button" style={{marginTop:"auto", alignSelf:"end"}}>Zatwierdź zgłoszenie</button>
            </form>
        </>
    );
}