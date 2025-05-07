import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import './variables.css';
import "./App.css";

export default function App() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </UserProvider>
        </Router>
    );
}