import React, {useState} from 'react';
import './App.css';
import { ToDoItem } from './Components/ToDoItem';

// Commented vers //
// This version of the code has comments for those learning from it //


// Icons
import ExitIcon from './Graphics/Interactives/Buttons/ExitIcon.png';
import MinimiseIcon from './Graphics/Interactives/Buttons/MinimiseIcon.png';
import AddIcon from './Graphics/Interactives/Buttons/AddIcon.png';

// Hua Animations Import
import HuaAnimation from './Components/HuaAnimation';

export default function App() {
  const[items, setItems] = useState([]); // Empty array to store to-do list items
  const [nextId, setNextId] = useState(1); // To assign and update ID

  const [chatOpen, setChatOpen] = useState(false);
  // const [demonArrived, setDemonArrived] = useState(false);

  // Window Controls
  const handleExit = () => {
    if (window.electronAPI) {
      window.electronAPI.exit();
    }
  };

  const handleMinimise = () => {
    if (window.electronAPI) {
      window.electronAPI.minimise();
    }
  };

  // For beginners: this spreads existing items and then adds a new item to the array, text is '' but editing is true because when adding, the input field should be visible and no text should be assigned yet
  const handleAdd = () => {
    setItems([...items, {id: nextId, text: '', checked: false, editing: true}]);
    setNextId(nextId + 1); // Post-increment after adding new to-do list item
  };

  // Takes the id of the selected record to edit and the new input text for that list item ID
  const handleUpdate = (id, newText) => {
    // Maps through all the items until it finds the item with a matching ID, it then updates the text and sets editing to false again
    // Returns items without matching ID with no changes
    setItems(items.map(item => item.id === id ? { ...item, text: newText, editing: false } : item));
  };

  // Takes an id and sets it to edit mode so that the input textbox appears (pressing 'Enter' key then triggers handleUpdate)
  const handleEdit = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, editing: true } : item));
  };

  // Takes the id of the item to delete and filters out any items with a matching id from the array
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Takes the id of the item that's been clicked and reverts the check status (if you click unchecked, becomes checked & vice versa)
  const handleToggle = (id) => {
    setItems(items.map(item => item.id === id ? {...item, checked: !item.checked } : item));
  };


  // GUI - shows 'add item' button to trigger handleAdd
  //     - maps through all items and renders a ToDoItem component for each
  //     - passes all necessary props to each ToDoItem:
  //           - key: unique identifier for react's rendering optimisation
  //           - item: the to-do item data 
  //           - event handlers for updating, editing, deleting, and toggling
  return (
    <div className="App">
      <div className='app-container'>
        <div className='window-bar'>
          <div className='window-controls-container'>
            <div className='window-controls'>
            <img src={ExitIcon} onClick={handleExit} alt="Exit" />
            <img src={MinimiseIcon} onClick={handleMinimise} alt="Minimise" />
            </div>
          </div>
          <div className='title'>
            <h1>Daily Cultivation</h1>
          </div>
        </div>

      <div className="background-frame"> 
        <div className={chatOpen ? 'todo-less' : 'todo-more'}> 
          {items.map(item => (
            <ToDoItem 
            // might be an issue with the position of the div here
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        
          <img src={AddIcon} onClick={handleAdd} alt="add item" className="add-button" /> 

          <HuaAnimation chatOpen={chatOpen} setChatOpen={setChatOpen}/>
        </div>
      </div>
      </div>
    </div>
  );
}
