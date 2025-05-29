import {EmployeeProvider} from "../../contexts/EmployeeContext";
import StaffList from "../../components/StaffList";
import ClientList from "../../components/ClientList";
import FacilitiesList from "../../components/FacilitiesList";

export default function AdminPanel() {
    return (
        <div>
            <h2>Panel administratora</h2>

            {/* usunąć </EmployeeProvider> po zapopulowaniu bazy*/}
            <EmployeeProvider>
             {/*lista klientów*/}
            <ClientList/>

             {/*lista pracowników*/}
             <StaffList/>

             {/*lista obiektów*/}
             <FacilitiesList/>

            </EmployeeProvider>

        </div>

    )
}