import {useEffect, useState} from "react";
import "../Dashboard.css";
import "../../App.css";
import "./TaskPanel.css";
import NewTaskForm from "../../components/NewTaskForm";
import NewTaskProtocolForm from "../../components/NewTaskProtocolForm";
import ListTopBar from "../../components/ListTopBar";

export default function TaskPanel(){
    const [activeForm, setActiveForm] = useState(null);
    const [tasks, setTasks] = useState([]);

    function handleFormOpen(formType) {
        setActiveForm(formType);
    }

    function handleFormClose(){
        setActiveForm(null);
    }

    useEffect(() => {

            // TRYB MOCK
        if (process.env.REACT_APP_MOCK_MODE === "true") {
            mockTasks(setTasks)
            return;
        }

            // PRODUKCJA
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/tasks/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error("Błąd pobierania zadań");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="Task-panel">
            <div className="Task-panel-container">
                <div className="Task-list">
                    <ListTopBar
                        headingText="Lista zadań"
                        buttonText={"Nowe zadanie"}
                        onButtonClick={() => handleFormOpen("FailureReport")}
                    >
                        <Filters/>
                    </ListTopBar>

                    <div className="Task-list-items">
                        <div className="Task-list-header">
                            <p><strong>Nazwa i miejsce</strong></p>
                            <p><strong>Kategoria</strong></p>
                            <p><strong>Priorytet</strong></p>
                            <p><strong>Termin oddania</strong></p>
                        </div>
                        {tasks?.map(task => {
                            //console.log(task)
                            return (
                                <div key={task.id} className="Task-item">
                                    <ListItem
                                        key={task.id}
                                        task_data={task}
                                        protocolOnClick={handleFormOpen}
                                    />
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
                        ) : activeForm === "TaskProtocol" ? (
                            <NewTaskProtocolForm onClose={handleFormClose}/>
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

export function ListItem({task_data, protocolOnClick}){
    const [isExtended, setIsExtended] = useState(false);

    function taskOnClick(){
        setIsExtended(!isExtended);

    }
    return(

        <div className={`Task-wrapper ${isExtended ? "active" : ""}`}>
            <div className="Task" onClick={taskOnClick}>
                <div>
                    <h3>{task_data.name}</h3>
                    <p> {task_data.location?.name} – {task_data.location?.address}</p>
                </div>
                <p>{task_data.category}</p>
                {task_data.priority === 'wysoki' ?
                    <p style={{color:'red'}}><strong>{task_data.priority}</strong></p>
                    :
                    <p>{task_data.priority}</p>
                }
                <p>{task_data.deadline_date}, {task_data.deadline_time}</p>
            </div>
            {isExtended ?
                <>
                    <div className={"Task-details"}>
                        <div>
                            <p><strong>Data awarii:</strong></p>
                            <p>{task_data.failure_date}, {task_data.failure_time}</p>
                        </div>
                        <div>
                            <p><strong>Data przyjęcia zadania:</strong></p>
                            <p>{task_data.raport_date}, {task_data.raport_time}</p>
                        </div>
                        <div>
                            <p><strong>Klient:</strong></p>
                            <p>{task_data.client?.first_name} {task_data.client?.last_name}, {task_data.client?.position}</p>
                            <p>Tel. +{task_data.client?.phone_number}</p>
                            <p>E-mail: {task_data.client?.email_address}</p>
                        </div>
                        <div>
                            <p><strong>Technicy:</strong></p>
                            <p>{task_data.technician?.first_name} {task_data.technician.last_name}</p>
                        </div>
                        <div style={{gridColumn: "span 2"}}>
                            <p><strong>Opis sytuacji:</strong></p>
                            <p>{task_data.description}</p>
                        </div>
                    </div>
                    <div className={"Task-details-footer"}>
                        <button className={"Standard-btn"}>Edytuj zgłoszenie</button>
                        <button className={"Standard-btn"} onClick={() => protocolOnClick("TaskProtocol")}>
                            Dodaj protokół
                        </button>
                    </div>
                </>
                :
                <></>
            }
        </div>
    );
}

function mockTasks(setTasks){
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

    const enrichedTasks = tasks.map(task => {
        const client = clients.find(c => c.id === task.clientId);
        const technician = technicians.find(t => t.id === task.technicianId);
        const location = locations.find(l => l.id === task.locationId);

        return {
            id: task.id,
            name: task.name,
            priority: task.priority.toLowerCase(),
            category: task.category,
            description: task.description,
            deadline_date: task.endDate,
            deadline_time: task.endTime,
            failure_date: task.failureDate,
            failure_time: task.failureTime,
            raport_date: task.startDate,
            raport_time: task.startTime,
            client: {
                first_name: client?.firstName,
                last_name: client?.lastName,
                position: client?.positionOrDepartment,
                phone_number: client?.phoneNumber,
                email_address: client?.emailAddress,
            },
            technician: {
                first_name: technician?.firstName,
                last_name: technician?.lastName
            },
            location: {
                name: location?.name,
                address: location?.address
            }
        };
    });

    setTasks(enrichedTasks);
}


