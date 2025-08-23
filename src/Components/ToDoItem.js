import React, { useState, useRef, useEffect } from 'react';
// useRef: accessing DOM elements
// useEffect: for side effects (like focusing an input)


// Icons
import EditIcon from '../Graphics/Interactives/Buttons/EditIcon.png';
import DeleteIcon from '../Graphics/Interactives/Buttons/DeleteIcon.png';
import CheckedIcon from '../Graphics/Interactives/Checkbox/Checkbox-Ticked.png';
import UncheckedIcon from '../Graphics/Interactives/Checkbox/Checkbox-Empty.png';

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
            if(tempText.trim() !== "") {
                onUpdate(item.id, tempText.trim());
            } else {
                onDelete(item.id);
            }
        }
    };

    // GUI - adds a checkbox input with state switching for when an item is clicked
    return(
        <div className='todo-item'
            onMouseEnter={() => setHovered(true)} // When mouse is on an item, setHovered(true)
            onMouseLeave={() => setHovered(false)} // When mouse is not on an item, setHovered(false)
        >
            <div className='todo-item-content'>
                <img src={item.checked ? CheckedIcon : UncheckedIcon}
                    alt={item.checked ? "Checked" : "Unchecked"}
                    onClick={() => onToggle(item.id)}
                    className="checkbox-icon"
                />
            

                {item.editing ? ( // Conditional rendering, if editing: show text input, if not: show text (with strike if checked - but this will change to icon switch)
                    <div className="todolist-textbox">
                    <input 
                        className='textbox'
                        ref={inputRef} 
                        type="text" 
                        value={tempText} 
                        onChange={(e) => setTempText(e.target.value)} 
                        onKeyDown={handleKeyPress} 
                    />
                    </div>
                ) : (
                    <span className={`item-text ${item.checked ? 'checked' : ''}`}>
                        {item.text}
                    </span>
                )}

                {hovered && !item.editing && ( // Shows edit/delete buttons only when hovering and not editing
                    <div className="item-actions">
                        <img src={EditIcon} onClick={() => onEdit(item.id)} alt="edit" />
                        <img src={DeleteIcon} onClick={() => onDelete(item.id)} alt="delete" />
                    </div>
                )}
            </div>
        </div>
    );
}