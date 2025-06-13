import "../App.css"
import {useState} from "react";
export default function ListTopBar({headingText, children, buttonText, onButtonClick}) {
    const [filtersVisible, setFiltersVisible] = useState(false)

    return(
        <div className="List-top-bar">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h3>{headingText}</h3>
                <button
                    style={{backgroundColor: "transparent", border: "none", marginLeft: "auto"}}
                    onClick={() => setFiltersVisible(!filtersVisible)}
                >
                    Filtry
                    {filtersVisible ?
                        <i className="arrow up"></i>
                        :
                        <i className="arrow down"></i>
                    }
                </button>
                <button
                    className={"Standard-btn"}
                    style={{borderRadius: "4px", minWidth: "15%", marginRight: "0px"}}
                    onClick={onButtonClick}
                    >
                    {buttonText || "Nowy element"}
                </button>
            </div>
            <div>
                {filtersVisible ? children : null}
            </div>
        </div>

    )
}