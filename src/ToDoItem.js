import React, { useState, useRef, useEffect } from 'react';
// useRef: accessing DOM elements
// useEffect: for side effects (like focusing an input)

// Received props from parent (App.js) component
export function ToDoItem({ item, onUpdate, onEdit, onDelete, onToggle}) {
    const [tempText, setTempText] = useState(item.text); // Initialises tempText with the text being edited.
    const inputRef = useRef(null); // Reference to the input element for focusing
    const [hovered, setHovered] = useState(false); // Sets hovered as a boolean value initialised as false (tracks if the mouse is over the item)

    // Focuses the input field when editing starts (runs whenever item.editing changes)
    useEffect(() => {
        if (item.editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [item.editing]);

    // When e = 'Enter' key, it saves changes (saves text as the new value)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onUpdate(item.id, tempText.trim());
        }
    };

    // GUI - adds a checkbox input with state switching for when an item is clicked
    return(
        <div
            style={{
                border: '1px solid gray',
                margin: '10px auto',
                padding: '10px',
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
            }}
            onMouseEnter={() => setHovered(true)} // When mouse is on an item, setHovered(true)
            onMouseLeave={() => setHovered(false)} // When mouse is not on an item, setHovered(false)
        >
            <input type="checkbox" checked={item.checked} onChange={() => onToggle(item.id)} /> 
            
            {item.editing ? ( // Conditional rendering, if editing: show text input, if not: show text (with strike if checked - but this will change to icon switch)
                <input 
                    ref={inputRef} 
                    type="text" 
                    value={tempText} 
                    onChange={(e) => setTempText(e.target.value)} 
                    onKeyDown={handleKeyPress} 
                    style={{ flex: 1, marginLeft: '10px', marginRight: '10px'}} 
                />
            ) : (
                <span style={{ flex: 1, marginLeft: '10px', marginRight: '10px', textDecoration: item.checked ? 'line-through' : 'none', }}>
                    {item.text}
                </span>
            )}

            {hovered && !item.editing && ( // Shows edit/delete buttons only when hovering and not editing
                <>
                <button onClick={() => onEdit(item.id)}>Edit</button>
                <button onClick={() => onDelete(item.id)}>Delete</button>
                </>
            )}
        </div>
    );
}