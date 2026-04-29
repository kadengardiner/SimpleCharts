import { useState } from "react";


export default function AccessibilityOptions() {
    function increaseFontSize () {
        const root = document.firstElementChild;
        let size = root.style.fontSize;
        if(size == "")
            size = "16px"
        root.style.fontSize = (parseFloat(size) + 5) + "px"
    }
    function decreaseFontSize () {        
        const root = document.firstElementChild;
        let size = root.style.fontSize;
        if(size == "")
            size = "16px"
        if (parseFloat(size) > 10)
            root.style.fontSize = (parseFloat(size) - 5) + "px"
    }
    function resetFontSize () {
        const root = document.firstElementChild;
        root.style.fontSize = "16px"
    }
    return (
        <div className="accessibility">
        <h1>Accessibility Settings</h1>
        <br/>
        <h2>Adjust Text Size</h2>
        <br/>
        <p>example text</p>
        <br/>
        <div>
        <button className="size-button" type="button" onClick={increaseFontSize}>Bigger +</button>
        <button className="size-button" type="button" onClick={decreaseFontSize}>Smaller -</button>
        </div>
        <button className="size-button" type="button" onClick={resetFontSize}>Reset Font Size</button>
        </div>
    )
}