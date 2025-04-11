import {useState} from "react";
import "../Dashboard.css";
import "../../App.css";
import NewTaskForm from "../../components/NewTaskForm";

export default function TaskPanel(){
    const [activeForm, setActiveForm] = useState(null);
    function handleFormOpen(formType) {
        setActiveForm(formType);
    }

    function handleFormClose(){
        setActiveForm(null);
    }

    return (
        <div className="task-panel">
            <h2>Zadania</h2>
            <button onClick={() => handleFormOpen("FailureReport")}>
                Nowe zadanie
            </button>

            {activeForm && (
                <div className="Overlay">
                    <div className="Form-container">
                        {activeForm === "FailureReport" ? (
                            <NewTaskForm onClose={handleFormClose} />
                        ) : null}
                    </div>
                </div>
            )}
        </div>

    );
}