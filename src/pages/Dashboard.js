import { useNavigate } from "react-router-dom"
import { useState } from "react";
import TaskPanel from "./dashboard_panels/TaskPanel";
import MaintenancePanel from "./dashboard_panels/MaintenancePanel";
import EnergyPanel from "./dashboard_panels/EnergyPanel";
import BMSPanel from "./dashboard_panels/BMSPanel";
import StaffPanel from "./dashboard_panels/StaffPanel";

import "./Dashboard.css";
import "../App.css";




export default function Dashboard() {
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState(null);

    const panelComponents = {
        TaskPanel: <TaskPanel />,
        MaintenancePanel: <MaintenancePanel />,
        EnergyPanel: <EnergyPanel />,
        BMSPanel: <BMSPanel />,
        StaffPanel: <StaffPanel />
    };


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
                <div style={{marginLeft: 'auto'}}>
                    <button className="Header-button" onClick={handleLogout}>Wyloguj</button>
                </div>
            </header>

            <div className="Navigation-bar">
                <button className={`Navigation-button ${activePanel === "MaintenancePanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("MaintenancePanel")}>
                    Przeglądy okresowe
                </button>
                <button className={`Navigation-button ${activePanel === "TaskPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("TaskPanel")}>
                    Zadania
                </button>
                <button className={`Navigation-button ${activePanel === "EnergyPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("EnergyPanel")}>
                    SmartEnergy
                </button>
                <button className={`Navigation-button ${activePanel === "BMSPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("BMSPanel")}>
                    SmartBMS
                </button>
                <button className={`Navigation-button ${activePanel === "StaffPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("StaffPanel")}>
                    Pracownicy
                </button>
            </div>

            {activePanel && (
                <div style={{padding: '15px'}}>
                    {panelComponents[activePanel]}
                </div>
            )}

            <div className="Dashboard-container">
                {/* TODO */}
            </div>
        </div>
    );
}



