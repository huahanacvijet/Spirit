import React, { useState, useEffect, useRef } from 'react';

// Import Hua Animations
import HuaIdle from '../Graphics/Hua-Animations/Idle.gif';
import HuaSitting from '../Graphics/Hua-Animations/Sitting.gif'
import HuaFluteUntamed from '../Graphics/Hua-Animations/Hua-Flute-Playing-TheUntamed.gif';

// Import Audio
import UntamedAudio from '../Audio/Hua-Flute-TheUntamed.wav';

// Buttons
import ThinkingIcon from '../Graphics/Interactives/LoadingStates/ThinkingIcon.gif';
import ChatIcon from '../Graphics/Interactives/Buttons/ChatIconFrame.png';

const huaAnimations = [HuaIdle, HuaSitting];

export default function HuaAnimation({chatOpen, setChatOpen}) {
  const[currentAnimation, setCurrentAnimation] = useState(HuaIdle);
  const[playFlute, setPlayFlute] = useState(false);

  const [hovered, setHovered] = useState(false);
  const[userMessage, setUserMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const[reply, setReply] = useState("");
  const [messages, setMessages] = useState([]);

  // Flute Songs
  const theUntamedFlute = useRef(null);

  // Cycle the chill animations (not specific animations)
  useEffect(() => {
    if(playFlute) return; // Pause switching

    const switchHua = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * huaAnimations.length);
      setCurrentAnimation(huaAnimations[randomIndex]);
    }, 36000 + Math.random() * 5000); // random 36–41 seconds

    return () => clearInterval(switchHua);
  }, [playFlute]);


  // Flute override
  useEffect(() => {
    const startPeformance = setInterval(() => {
      setPlayFlute(true);
      setCurrentAnimation(HuaFluteUntamed);

      const untamed = theUntamedFlute.current;
      // can also set when to start from with audio.currentTime = 5; (5 secs)
      untamed.volume = 0.2;
      untamed.play();

      setTimeout(() => {
        untamed.pause();
        untamed.currentTime = 0; // reset
        setCurrentAnimation(HuaIdle);
        setPlayFlute(false);
      }, untamed.duration * 1000);
    }, (600000) + Math.random() * (600000)); // 10-20 mins
    return () => clearInterval(startPeformance);
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
        <audio ref={theUntamedFlute} src={UntamedAudio} preload="auto" />

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