import { useState } from "react";


export default function AccessibilityOptions() {
    function increaseFontSize () {
        const root = document.firstElementChild;
        let size = root.style.fontSize;
        size = (Number(size) + 5) + "px"
    }
    function decreaseFontSize () {
        const root = document.firstElementChild;
        let size = root.style.fontSize;
        if (Number(size) > 10)
            size = (Number(size) - 5) + "px"
    }
    return (
        <div>
        <h3>Adjust Text Size</h3>
        <p>example text</p>
        <div>
        <button type="button" onClick={increaseFontSize()}>Bigger</button>
        <button type="button" onClick={decreaseFontSize()}>Smaller</button>
        </div>
        </div>
    )
}