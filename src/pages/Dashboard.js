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
                    <div className="Form">
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
    return (
        <>
            <FormTopBar heading="Nowe zgłoszenie awarii" onCancelButtonClick={onClose} />
            <p>Formularz zgłoszenia awarii (TODO)</p>
        </>
    );
}