import React, { useState, useEffect } from 'react';

// Import Hua Animations
import HuaIdle from '../Graphics/Hua-Animations/Idle.gif';
import HuaSitting from '../Graphics/Hua-Animations/Sitting.gif'

// Buttons
import ThinkingIcon from '../Graphics/Interactives/LoadingStates/ThinkingIcon.gif';
import ChatIcon from '../Graphics/Interactives/Buttons/ChatIconFrame.png';

const huaAnimations = [HuaIdle, HuaSitting];


export default function HuaAnimation({chatOpen, setChatOpen}) {
  const[currentAnimation, setCurrentAnimation] = useState(HuaIdle);
  
  const [hovered, setHovered] = useState(false);
  const[userMessage, setUserMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const[reply, setReply] = useState("");
  const [messages, setMessages] = useState([]);

  const[playFlute, setPlayFlute] = useState(false);


  // Cycle the chill animations (not specific animations)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * huaAnimations.length);
      setCurrentAnimation(huaAnimations[randomIndex]);
    }, 20000 + Math.random() * 5000); // random 20–25 seconds

    return () => clearInterval(interval);
  }, []);


  // Send Message to Gemini
  const sendMessage = async () => {
    if(!userMessage.trim()) return;
    setIsThinking(true);
    setReply(""); // KEEP THIS.

    // updatedMessages = {role : content } array
    const updatedMessages = [...messages, {role: "user", content: userMessage }];
    setMessages(updatedMessages);

    try {
      // updatedMessages passed to ipcMain.handle as argument (conversation)
      const response = await window.electronAPI.askLLM(updatedMessages);
    
      const newMessages = [...updatedMessages, {role:"assistant", content: response}];
      setMessages(newMessages);

      setIsThinking(false);
      setReply(response);
      setUserMessage("");
    } catch (err) {
      setIsThinking(false);
      setReply("Sorry! I'm daydreaming right now. We can chat later! <3");
    }
  };

  // Close chat-related visuals
  const exitChat = () => {
    setChatOpen(false);
    setReply("");
    setIsThinking(false);
  };


  
  return (
    <div className="hua-container">
      <div className="chat-start-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img className="HuaAnimations" src={currentAnimation} alt="Hua"/>
        
        {hovered && !chatOpen && 
          (<img className="hua-chat-button" src={ChatIcon} alt="Icon for chat" 
          onClick={() => setChatOpen(true)} />)
        }
    </div>

    {isThinking && 
      (<img className="hua-thinking" src={ThinkingIcon} alt="thinking"/>)
    }

    {reply &&
      (<div className="hua-reply"> {reply} </div> )
    }

    {chatOpen && 
    (<div className="hua-chatbox"> 
    <input
      type="text"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      placeholder="Chat..." 
    />
    <button className="send-button" onClick={sendMessage}>Send</button>
    <button className="exit-button" onClick={exitChat}>Bye!</button>
    </div>
    )}
    </div>
  );
}