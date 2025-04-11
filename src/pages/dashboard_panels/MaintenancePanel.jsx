import {useState} from "react";
import "../Dashboard.css";
import "../../App.css";
import NewMaintenanceForm from "../../components/NewMaintenanceForm";

export default function MaintenancePanel() {
    const [activeForm, setActiveForm] = useState(null);
    function handleFormOpen(formType) {
        setActiveForm(formType);
    }

    function handleFormClose(){
        setActiveForm(null);
    }

    return (
        <div className="task-panel">
            <h2>Przeglądy okresowe</h2>
            <button onClick={() => handleFormOpen("Maintenance")}>
                Nowy przegląd okresowy
            </button>

            {activeForm && (
                <div className="Overlay">
                    <div className="Form-container">
                        {activeForm === "Maintenance" ? (
                            <NewMaintenanceForm onClose={handleFormClose} />
                        ) : null}
                    </div>
                </div>
            )}
        </div>

    );
}

