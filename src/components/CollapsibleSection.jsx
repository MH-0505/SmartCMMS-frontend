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

    useEffect(() => {
        if (!isOpen || !contentRef.current) return;
        const observer = new window.ResizeObserver(() => {
            setHeight(`${contentRef.current.scrollHeight}px`);
        });
        observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, [isOpen]);

    return (
        <div className="collapsible-section">
            <div className="collapsible-header" onClick={toggleSection}>
                <h3>{title}</h3>
                <span>{isOpen ? "▲" : "▼"}</span>
            </div>
            <div
                className="collapsible-content-wrapper" //wrapper do animacji
                style={{ maxHeight: height }}
            >
                <div className="collapsible-content" ref={contentRef}>{children}</div>
            </div>
        </div>
    );
}
