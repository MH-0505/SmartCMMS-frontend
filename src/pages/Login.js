import logo from '../images/logo.svg';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./Login.css";
import "../App.css"


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

        // TRYB MOCK
    if (process.env.REACT_APP_MOCK_MODE === "true") {
      mockUser(username, setUser)
      navigate("/dashboard");
      return;
    }

        // PRODUKCJA
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setError("Błędne dane logowania");
    } else {
      const data = await response.json();
      localStorage.setItem("token", data.access);

      const meResponse = await fetch("http://localhost:8000/api/me/", {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      if (meResponse.ok) {
        const userData = await meResponse.json();
        setUser(userData);
      }
      navigate("/Dashboard");
    }
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

function mockUser(username, setUser){
  const fakeUser1 = {
    id: 1,
    username: "andrzej.dev",
    first_name: "Andrzej",
    last_name: "Tester",
    role: "TECHNIK",
    email: "andrzej.tester@example.com",
  };
  const fakeUser2 = {
    id: 2,
    username: "bogdan.dev",
    first_name: "Bogdan",
    last_name: "Tester",
    role: "MANAGER",
    email: "bogdan.tester@example.com",
  };
  const fakeUser3 = {
    id: 3,
    username: "janek.dev",
    first_name: "Jan",
    last_name: "Tester",
    role: "ADMIN",
    email: "jan.tester@example.com",
  };
  localStorage.setItem("token", "mocked_token_123");

  if(username.toLowerCase() === "technik"){
    setUser(fakeUser1);
  }else if(username.toLowerCase() === "manager"){
    setUser(fakeUser2);
  }else if(username.toLowerCase() === "admin"){
    setUser(fakeUser3);
  }else{
    setUser(fakeUser1)
  }
}

