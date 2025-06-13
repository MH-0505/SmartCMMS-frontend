import {EmployeeProvider} from "../../contexts/EmployeeContext";
import StaffList from "../../components/StaffList";
import ClientList from "../../components/ClientList";
import FacilitiesList from "../../components/FacilitiesList";
import {ClientsProvider} from "../../contexts/ClientContext";
import CollapsibleSection from "../../components/CollapsibleSection";

export default function AdminPanel() {
    return (
        <div>
            <h2>Panel administratora</h2>


             {/*lista klientów*/}
        <CollapsibleSection title="Lista klientów">
             <ClientList/>
        </CollapsibleSection>

             {/*lista pracowników*/}
        <CollapsibleSection title="Lista pracowników">
             <StaffList/>
        </CollapsibleSection>

             {/*lista obiektów*/}
        <CollapsibleSection title="Lista obiektów">
             <FacilitiesList/>
        </CollapsibleSection>


        </div>

    )
}