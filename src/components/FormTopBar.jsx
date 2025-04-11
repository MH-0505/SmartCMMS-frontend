import "../pages/Dashboard.css";
import "../App.css";

export default function FormTopBar({heading, onCancelButtonClick}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>
                <h2>{heading}</h2>
            </div>
            <button className="Cancel-button" onClick={onCancelButtonClick}>Anuluj</button>
        </div>
    );
}