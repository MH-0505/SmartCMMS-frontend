import { useState, useRef, useEffect } from "react";
import "./CollapsibleSection.css";

export default function CollapsibleSection({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);//stan sekcji
    const [height, setHeight] = useState("0px");//bieżąca wysokość
    const contentRef = useRef(null);//referencja zawartości rozwijanej sekcji

    //rozwijanie/zwijanie
    const toggleSection = () => {
        setIsOpen((prev) => !prev);
    };

    //zmiana wysokości
    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen]);

    return (
        <div className="collapsible-section">
            <div className="collapsible-header" onClick={toggleSection}>
                <h3>{title}</h3>
                <span>{isOpen ? "▲" : "▼"}</span>
            </div>
            <div
                ref={contentRef}
                className="collapsible-content-wrapper" //wrapper do animacji
                style={{ maxHeight: height }}
            >
                <div className="collapsible-content">{children}</div>
            </div>
        </div>
    );
}
