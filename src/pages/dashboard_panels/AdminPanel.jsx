import {EmployeeProvider} from "../../contexts/EmployeeContext";
import StaffList from "../../components/StaffList";
import ClientList from "../../components/ClientList";
import FacilitiesList from "../../components/FacilitiesList";
import {ClientsProvider} from "../../contexts/ClientContext";

export default function AdminPanel() {
    return (
        <div>
            <h2>Panel administratora</h2>


             {/*lista klientów*/}
             <ClientList/>

             {/*lista pracowników*/}
             <StaffList/>

             {/*lista obiektów*/}
             <FacilitiesList/>


        </div>

    )
}