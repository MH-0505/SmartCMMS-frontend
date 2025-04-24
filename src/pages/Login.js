import logo from '../images/logo.svg';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Login.css";
import "../App.css"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    navigate("/Dashboard");     // TODO - Usunąć i odkomentować resztę gdy będzie backend

    /*
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setError("Błędne dane logowania");
    } else {
      const data = await response.json();
      console.log("Zalogowano! Token:", data.token);
      navigate("/Dashboard");
    }

     */
  };

  return (
    <div className="Login-page">
      <header className="App-header">
        <div className="Header-bar">
          <h1 className="App-title">SiteFlow</h1>
        </div>
        <img src={logo} className="Ars-logo" alt="ARS system logo"/>
        <form className="Login-form" onSubmit={handleSubmit}>
          <input
              className="Form-element"
              type="text"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
          />
          <input
              className="Form-element"
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button className="Form-element" type="submit">Zaloguj</button>
        </form>
        {error && <p className="error-message">{error}</p>}

      </header>
    </div>
  );
}


