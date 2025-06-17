import "../App.css";
import "./SearchTopBar.css";
import { useState } from "react";

export default function SearchTopBar({ onSearch, children, buttonText, onButtonClick}) {
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="Search-top-bar">
            {/*//TODO wyszukiwanie*/}
            <div className="search-header">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Szukaj..."
                    value={query}
                    onChange={handleChange}
                />
                <button
                    className="filters-toggle-btn"
                    onClick={() => setFiltersVisible(!filtersVisible)}
                >
                    Filtry {filtersVisible ? "▲" : "▼"}
                </button>
                <button
                    className={"Standard-btn"}
                    style={{borderRadius: "4px", minWidth: "15%", marginRight: "0px"}}
                    onClick={onButtonClick}
                >
                    {buttonText || "Nowy element"}
                </button>
            </div>

            {filtersVisible && (
                <div className="filters-content">
                    {children}
                </div>
            )}
        </div>
    );
}
