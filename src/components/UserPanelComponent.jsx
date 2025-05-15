import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import profilePicture from "../images/blank-profile-picture.png";
import "./UserPanel.css";

export default function UserPanel() {
    const { user } = useContext(UserContext);

    if (!user) return <p>Ładowanie danych użytkownika...</p>;

    return (
        <div className="user-panel-container">
            <div className="user-card">
                <img src={profilePicture} alt="Avatar" className="user-avatar" />
                <div className="user-name">{user.first_name}</div>
                <div className="user-email">{user.email_address}</div>
            </div>

            <div className="user-info-form">
                <h2>Dane użytkownika</h2>
                <form>
                    <label>Imię</label>
                    <input type="text" defaultValue={user.first_name} readOnly/>

                    <label>Nazwisko</label>
                    <input type="text" defaultValue={user.last_name} readOnly/>

                    <label>Login</label>
                    <input type="text" defaultValue={user.username} readOnly/>

                    <label>Rola</label>
                    <input type="text" defaultValue={user.role} readOnly/>

                    <label>Email</label>
                    <input type="email" defaultValue={user.email_address} readOnly/>
                </form>
            </div>
        </div>
    );
}
