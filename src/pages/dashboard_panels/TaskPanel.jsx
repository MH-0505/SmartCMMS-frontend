import {useState} from "react";
import "../Dashboard.css";
import "../../App.css";
import "./TaskPanel.css";
import NewTaskForm from "../../components/NewTaskForm";
import ListTopBar from "../../components/ListTopBar";

export default function TaskPanel(){
    const [activeForm, setActiveForm] = useState(null);
    const [taskList, setTaskList] = useState(tasks);

    function getTechnicianById(id) {
        return technicians.find(t => t.id === id);
    }

    function getClientById(id) {
        return clients.find(c => c.id === id);
    }

    function getLocationById(id) {
        return locations.find(l => l.id === id);
    }

    function handleFormOpen(formType) {
        setActiveForm(formType);
    }

    function handleFormClose(){
        setActiveForm(null);
    }

    return (
        <div className="Task-panel">
            <button className={"New-task-button"} onClick={() => handleFormOpen("FailureReport")}>
                Dodaj nowe zgłoszenie
            </button>

            <div className="Task-panel-container">
                <div className="Task-list">
                    <ListTopBar headingText="Lista zadań">
                        <Filters/>
                    </ListTopBar>
                    <div className="Task-list-items">
                        {taskList.map(task => {
                            const technician = getTechnicianById(task.technicianId);
                            const client = getClientById(task.clientId);
                            const location = getLocationById(task.locationId);

                            return (
                                <div key={task.id} className="Task-item">
                                    {listItem(task, technician, client, location)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {activeForm && (
                <div className="Overlay">
                    <div className="Form-container">
                        {activeForm === "FailureReport" ? (
                            <NewTaskForm onClose={handleFormClose}/>
                        ) : null}
                    </div>
                </div>
            )}
        </div>

    );
}

export function Filters() {
    return(
        <div className="Filters">
            <div>
                <label htmlFor={"priority"}>Priorytet:</label><br/>
                <select name={"priority"} id={"priority"} style={{minWidth: "fit-content", width: "120px"}}>
                    <option>Każdy</option>
                    <option>Wysoki</option>
                    <option>Średni</option>
                    <option>Niski</option>
                </select>
            </div>
            <div>
                <label htmlFor={"category"}>Kategoria:</label><br/>
                <select name={"category"} id={"category"}>
                    <option>Wszytkie</option>
                    <option>Budowlana</option>
                    <option>Elektryczna</option>
                    <option>Gazowa</option>
                    <option>Woda i kanalizacja</option>
                    <option>Inne</option>
                </select>
            </div>
            <div>
                <label htmlFor={"technician"}>Wykonawcy:</label><br/>
                <select name={"technician"} id={"technician"}>
                    <option>Wszyscy</option>
                    <option>Jan Kowalski</option>
                    <option>Adam Nowak</option>
                    <option>Andrzej Górecki</option>
                </select>
            </div>
            <div style={{gridColumn: "span 2"}}>
                <label>Przedział czasowy:</label><br/>
                <label>
                    Od:
                    <input type={"date"} name={"startDate"} id={"startDate"}
                           style={{minWidth: "fit-content", width: "120px", height: "60%", marginLeft: "10px"}}/>
                </label>
                <label style={{marginLeft: "10px"}}>
                    Do:
                    <input type={"date"} name={"endDate"} id={"endDate"}
                           style={{minWidth: "fit-content", width: "120px", height: "60%", marginLeft: "10px"}}/>
                </label>
            </div>
        </div>
    );
}

export function listItem(task, technician, client, location){
    return(
        <div className="Task">
            <h3>{task.name}</h3>
            <p><strong>Priorytet:</strong> {task.priority}</p>
            <p><strong>Kategoria:</strong> {task.category}</p>
            <p><strong>Technik:</strong> {technician?.firstName} {technician?.lastName}</p>
            <p><strong>Klient:</strong> {client?.firstName} {client?.lastName}</p>
            <p><strong>Lokalizacja:</strong> {location?.name} – {location?.address}</p>
        </div>
    )
}

// mock data
const tasks = [
    {
        id: 0, name: 'Awaria 1', clientId: 0, locationId: 3, technicianId: 1, failureDate: '25-04-2025',
        failureTime: '12:33', priority: 'Wysoki', category: 'Instalacja HVAC', description: 'przykładowy opis',
        startDate: '25-04-2025', startTime: '14:00', endDate: '26-04-2025', endTime: '14:00',
    },

    {
        id: 1, name: 'Awaria 2', clientId: 1, locationId: 1, technicianId: 0, failureDate: '23-04-2025',
        failureTime: '10:44', priority: 'Niski', category: 'Instalacja HVAC', description: 'przykładowy opis 2',
    startDate: '24-04-2025', startTime: '14:00', endDate: '29-04-2025', endTime: '14:00',},
];

const technicians = [
    {id: 0, firstName: 'Jan', lastName: 'Kowalski'},
    {id: 1, firstName: 'Andrzej', lastName: 'Górecki'},
    {id: 2, firstName: 'Adam', lastName: 'Nowak'},
]

const clients = [
    {id:0, firstName: 'Marek', lastName: 'Mazur', positionOrDepartment: 'Mechanik', phoneNumber: '48880701510', emailAddress: 'marekmazur@example.com'},
    {id:1, firstName: 'Tomasz', lastName: 'Konieczny', positionOrDepartment: 'Manager', phoneNumber: '48811201340', emailAddress: 'tomaszkonieczny@example.com'}
]

const locations = [
    {id:0, name:'Biuro 1', address:'Ul. Fabryczna 14', roomsOrFloors: ['poziom -1', 'pozion 0', 'pozion 1', 'pozion 2', 'pozion 3']},
    {id:1, name:'Fabryka 1', address:'Ul. Kwiatowa 54', roomsOrFloors: ['poziom -1', 'pozion 0', 'pozion 1', 'pozion 2']},
    {id:2, name:'Biuro 2', address:'Ul. Słoneczna 66', roomsOrFloors: ['poziom -1', 'pozion 0', 'pozion 1', 'pozion 2', 'pozion 3']},
    {id:3, name:'Szkoła', address:'Ul. Prosta 23', roomsOrFloors: ['poziom -1', 'pozion 0', 'pozion 1', 'pozion 2']}
]

