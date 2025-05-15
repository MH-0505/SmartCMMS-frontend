import {EmployeeProvider} from "../../contexts/EmployeeContext";
import StaffList from "../../components/StaffList";

export default function AdminPanel() {
    return (
        <EmployeeProvider>
            <h2>Panel administratora</h2>

            <br/>
            <br/>
            <h3>Pracownicy: </h3>
            <StaffList/>
        </EmployeeProvider>

    )
}