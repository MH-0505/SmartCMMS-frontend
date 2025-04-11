import {useState} from "react";
import FormTopBar from "../components/FormTopBar";
import "../pages/Dashboard.css";
import "../App.css";

export default function NewMaintenanceForm({ onClose }) {
    return (
        <>
            <FormTopBar heading="Nowy przegląd okresowy" onCancelButtonClick={onClose} />
            <p>Formularz przeglądu (TODO)</p>
        </>

    );
}