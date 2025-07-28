import React, { useState, useEffect } from 'react';

// Import Hua Animations
import HuaIdle from './Graphics/Hua-Animations/Idle.gif';
import HuaSitting from './Graphics/Hua-Animations/Sitting.gif'

const huaAnimations = [HuaIdle, HuaSitting];

export default function HuaAnimation() {
  const [currentAnimation, setCurrentAnimation] = useState(HuaIdle);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * huaAnimations.length);
      setCurrentAnimation(huaAnimations[randomIndex]);
    }, 20000 + Math.random() * 5000); // random 20–25 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <img src={currentAnimation} alt="Hua" className="HuaAnimations" />
  );
}