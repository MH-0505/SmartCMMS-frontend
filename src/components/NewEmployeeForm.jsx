import FormTopBar from "./FormTopBar";
import {useEffect, useState} from "react";

export default function NewEmployeeForm({onClose, selectedEmployee}) {
    const [roles, setRoles] = useState([]);
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let request_url = 'http://localhost:8000/api/employees/';

        const employeeData = {
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            username: formData.get("username"),
            phone_number: formData.get("phoneNumber"),
            position: formData.get("position"),
            email: formData.get("emailAddress"),
            role: formData.get("role"),
        };

        if(selectedEmployee) {
            request_url += selectedEmployee.id + '/update/';
        }else{
            request_url += 'create-new/';
            employeeData.password = formData.get("password");
        }
        console.log(employeeData);

        fetch(request_url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(employeeData)
        })
            .then(res => {
                if (res.ok) {
                    if(selectedEmployee) {
                        alert("Zaktualizowano dane pracownika");
                    } else{
                        alert("Dodano nowego pracownika");
                    }
                    onClose();
                } else {
                    return res.json().then(data => {
                        console.error("Błąd zapisu:", data);
                        alert("Nie udało się zapisać danych.");
                    });
                }
            })
            .catch(error => {
                console.error("Błąd sieci:", error);
                alert("Błąd połączenia z serwerem.");
            });
    }

    useEffect(() => {
        const fetchRoles = async () => {
            try{
                const response = await fetch("http://localhost:8000/api/employees/roles/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRoles(data.roles);

                } else {
                    console.error("Błąd pobierania ról");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        }
        fetchRoles();
    }, []);

    return (
        <>
            <FormTopBar heading={selectedEmployee ? "Edytuj dane pracownika" : "Nowy pracownik"} onCancelButtonClick={onClose} />

            <form onSubmit={handleSubmit}>
                <div className={"Scroll-panel"}>
                    <div className="Form-gridbox">
                        <label htmlFor={"firstName"}>Imię:</label>
                        <input name="firstName" id="firstName" defaultValue={selectedEmployee ? selectedEmployee.first_name : null} />

                        <label htmlFor={"lastName"}>Nazwisko:</label>
                        <input name="lastName" id="lastName" defaultValue={selectedEmployee ? selectedEmployee.last_name : null}/>

                        <label htmlFor={"username"}>Login:</label>
                        <input name="username" id="username" defaultValue={selectedEmployee ? selectedEmployee.username : null}/>

                        {!selectedEmployee ? (
                            <div style={{gridColumn: "span 2", display: "grid", rowGap: "13px", gridTemplateColumns: "1fr 3fr"}}>
                                <label htmlFor={"password"}>Hasło:</label>
                                <input name="password" id="password"/>
                            </div>
                        ) : null}

                        <label htmlFor={"role"}>Rola:</label>
                        <select name="role" id="role" defaultValue={selectedEmployee ? selectedEmployee.role : null}>
                            {roles.map((role) => (
                                <option key={role.label} value={role.value}>{role.value}</option>
                            ))}
                        </select>

                        <label htmlFor={"position"}>Stanowisko:</label>
                        <input name="position" id="position" defaultValue={selectedEmployee ? selectedEmployee.position : null}/>

                        <label htmlFor={"phoneNumber"}>Telefon kontaktowy:</label>
                        <input name="phoneNumber" id="phoneNumber" defaultValue={selectedEmployee ? selectedEmployee.phone_number : null}/>

                        <label htmlFor={"emailAddress"}>Adres e-mail:</label>
                        <input name="emailAddress" id="emailAddress" defaultValue={selectedEmployee ? selectedEmployee.email : null}/>

                    </div>
                </div>

                <button type="submit" className="Apply-button" style={{marginTop: "auto", alignSelf: "end"}}>
                    Zatwierdź
                </button>
            </form>
        </>
    );
}