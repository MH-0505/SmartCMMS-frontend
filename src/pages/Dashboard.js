import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useContext } from "react";
import TaskPanel from "./dashboard_panels/TaskPanel";
import MaintenancePanel from "./dashboard_panels/MaintenancePanel";
import EnergyPanel from "./dashboard_panels/EnergyPanel";
import BMSPanel from "./dashboard_panels/BMSPanel";
import AdminPanel from "./dashboard_panels/AdminPanel";
import UserPanel from "./dashboard_panels/UserPanel";

import { UserContext } from "../contexts/UserContext";

import default_pfp from "../images/blank-profile-picture.png"
import "./Dashboard.css";
import "../App.css";


export default function Dashboard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState(null);

    const panelComponents = {
        TaskPanel: <TaskPanel />,
        MaintenancePanel: <MaintenancePanel />,
        EnergyPanel: <EnergyPanel />,
        BMSPanel: <BMSPanel />,
        AdminPanel: <AdminPanel />,
        UserPanel: <UserPanel />
    };


    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <div>
            <header className="Header-bar">
                <div>
                    <h1 className="App-title">SiteFlow</h1>
                </div>

                <div className="User-info-bar">
                    <img className="profile-picture"
                         src={user?.profile_picture || default_pfp}
                         alt="Zdjęcie profilowe"
                    />
                    <div>
                        <h3>{user?.first_name} {user?.last_name}</h3>
                        <p>{user?.role}</p>
                    </div>
                    <div>
                        <button className="Header-button" onClick={handleLogout}>Wyloguj</button>
                    </div>
                </div>
            </header>

            <div className="Navigation-bar">
                <button className={`Navigation-button ${activePanel === "MaintenancePanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("MaintenancePanel")}>
                    Przeglądy okresowe
                </button>
                <button className={`Navigation-button ${activePanel === "TaskPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("TaskPanel")}>
                    Awarie i zadania
                </button>
                <button className={`Navigation-button ${activePanel === "EnergyPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("EnergyPanel")}>
                    SmartEnergy
                </button>
                <button className={`Navigation-button ${activePanel === "BMSPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("BMSPanel")}>
                    SmartBMS
                </button>
                <div style={{marginLeft: 'auto', marginRight: '5vw'}}>
                    <button className={`Navigation-button ${activePanel === "UserPanel" ? "active" : ""}`}
                        onClick={() => setActivePanel("UserPanel")}>
                        Panel użytkownika
                    </button>
                    {user?.role !== "TECHNIK" ? (
                        <button className={`Navigation-button ${activePanel === "AdminPanel" ? "active" : ""}`}
                                onClick={() => setActivePanel("AdminPanel")}>
                            Panel administratora
                        </button>
                    ): null
                    }
                </div>


            </div>

            {activePanel ? (    // Wyświetla wybrany panel
                    <div style={{padding: '15px'}}>
                        {panelComponents[activePanel]}
                    </div>
                )
                :               // lub stronę startową jeśli zaraz po zalogowaniu
                (
                    <div className="Dashboard-container">
                        <h2>Witaj, {user?.first_name}.</h2>
                    </div>
                )
            }
        </div>
    );
}



