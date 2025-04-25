import "../App.css"
import {useState} from "react";
export default function ListTopBar({headingText, children}) {
    const [filtersVisible, setFiltersVisible] = useState(false)

    return(
        <div className="List-top-bar">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h3>{headingText}</h3>
                <button
                    style={{backgroundColor: "transparent", border: "none"}}
                    onClick={() => setFiltersVisible(!filtersVisible)}
                >
                    Filtry
                    {filtersVisible ?
                        <i className="arrow up"></i>
                        :
                        <i className="arrow down"></i>
                    }
                </button>
            </div>
            <div>
                {filtersVisible ? children : null}
            </div>
        </div>

    )
}