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
                        <div className="Task-list-header">
                            <p><strong>Nazwa i miejsce</strong></p>
                            <p><strong>Kategoria</strong></p>
                            <p><strong>Priorytet</strong></p>
                            <p><strong>Termin oddania</strong></p>
                        </div>
                        {taskList.map(task => {
                            const technician = getTechnicianById(task.technicianId);
                            const client = getClientById(task.clientId);
                            const location = getLocationById(task.locationId);

                            return (
                                <div key={task.id} className="Task-item">
                                    {ListItem(task, technician, client, location)}
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

export function ListItem(task, technician, client, location){
    const [isExtended, setIsExtended] = useState(false);

    function taskOnClick(){
        setIsExtended(!isExtended);

    }
    return(
        <div className={`Task-wrapper ${isExtended ? "active" : ""}`}>
            <div className="Task" onClick={taskOnClick}>
                <div>
                    <h3>{task.name}</h3>
                    <p> {location?.name} – {location?.address} - {location?.roomsOrFloors[task?.locationRoomId]}</p>
                </div>
                <p>{task.category}</p>
                {task.priority === 'Wysoki' ?
                    <p style={{color:'red'}}><strong>{task.priority}</strong></p>
                    :
                    <p>{task.priority}</p>
                }
                <p>{task.endDate}, {task.endTime}</p>
            </div>
            {isExtended ?
                <>
                    <div className={"Task-details"}>
                        <div>
                            <p><strong>Data awarii:</strong></p>
                            <p>{task.failureDate}, {task.failureTime}</p>
                        </div>
                        <div>
                            <p><strong>Data przyjęcia zadania:</strong></p>
                            <p>{task.startDate}, {task.startTime}</p>
                        </div>
                        <div>
                            <p><strong>Klient:</strong></p>
                            <p>{client?.firstName} {client?.lastName}, {client?.positionOrDepartment}</p>
                            <p>Tel. +{client?.phoneNumber}</p>
                            <p>E-mail: {client?.emailAddress}</p>
                        </div>
                        <div>
                            <p><strong>Technicy:</strong></p>
                            <p>{technician?.firstName} {technician.lastName}</p>
                        </div>
                        <div style={{gridColumn: "span 2"}}>
                            <p><strong>Opis sytuacji:</strong></p>
                            <p>{task.description}</p>
                        </div>
                    </div>
                    <div className={"Task-details-footer"}>
                        <button className={"Standard-btn"}>Edytuj zgłoszenie</button>
                        <button className={"Standard-btn"}>Dodaj protokół</button>
                    </div>
                </>
                :
                <></>

            }
        </div>
    );
}

// mock data
const tasks = [
    {
        id: 0,
        name: 'Awaria 1',
        clientId: 0,
        locationId: 3,
        locationRoomId: 2,
        technicianId: 1,
        failureDate: '25-04-2025',
        failureTime: '12:33',
        priority: 'Wysoki',
        category: 'Instalacja HVAC',
        description: 'przykładowy opis',
        startDate: '25-04-2025',
        startTime: '14:00',
        endDate: '26-04-2025',
        endTime: '14:00',
    },

    {
        id: 1,
        name: 'Awaria 2',
        clientId: 1,
        locationId: 1,
        locationRoomId: 1,
        technicianId: 0,
        failureDate: '23-04-2025',
        failureTime: '10:44',
        priority: 'Niski',
        category: 'Usterka budowlana',
        description: 'przykładowy opis 2',
        startDate: '24-04-2025',
        startTime: '14:00',
        endDate: '29-04-2025',
        endTime: '14:00'
    },
];

const technicians = [
    {id: 0, firstName: 'Jan', lastName: 'Kowalski'},
    {id: 1, firstName: 'Andrzej', lastName: 'Górecki'},
    {id: 2, firstName: 'Adam', lastName: 'Nowak'},
]

const clients = [
    {
        id: 0,
        firstName: 'Marek',
        lastName: 'Mazur',
        positionOrDepartment: 'Mechanik',
        phoneNumber: '48 880 701 510',
        emailAddress: 'marekmazur@example.com'},
    {id:1, firstName: 'Tomasz', lastName: 'Konieczny', positionOrDepartment: 'Manager', phoneNumber: '48 811 201 340', emailAddress: 'tomaszkonieczny@example.com'}
]

const locations = [
    {id:0, name:'Biuro 1', address:'Ul. Fabryczna 14', roomsOrFloors: ['poziom -1', 'poziom 0', 'poziom 1', 'poziom 2', 'poziom 3']},
    {id:1, name:'Fabryka 1', address:'Ul. Kwiatowa 54', roomsOrFloors: ['poziom -1', 'poziom 0', 'poziom 1', 'poziom 2']},
    {id:2, name:'Biuro 2', address:'Ul. Słoneczna 66', roomsOrFloors: ['poziom -1', 'poziom 0', 'poziom 1', 'poziom 2', 'poziom 3']},
    {id:3, name:'Szkoła', address:'Ul. Prosta 23', roomsOrFloors: ['poziom -1', 'poziom 0', 'poziom 1', 'poziom 2']}
]

