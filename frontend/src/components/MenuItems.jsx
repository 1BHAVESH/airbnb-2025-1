import { Bed, Castle, ChevronLeft, ChevronRight, GroupIcon, Landmark, Snowflake, Trees, Umbrella } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'apartment', icon: <Umbrella size={24} className="text-black" /> },
  { label: 'house', icon: <Landmark size={24} className="text-gray-500" /> },
  { label: 'villa', icon: <Trees size={24} className="text-gray-500" /> },
  { label: 'cabin', icon: <GroupIcon size={24} className="text-gray-500" /> },
  { label: 'bungalow', icon: <Snowflake size={24} className="text-gray-500" /> },
  { label: 'island', icon: <Umbrella size={24} className="text-black" /> },
  { label: 'icons', icon: <Landmark size={24} className="text-gray-500" /> },
  { label: 'countryside', icon: <Trees size={24} className="text-gray-500" /> },
  { label: 'camping', icon: <GroupIcon size={24} className="text-gray-500" /> },
  { label: 'arctic', icon: <Snowflake size={24} className="text-gray-500" /> },
  { label: 'beaches', icon: <Umbrella size={24} className="text-black" /> },
  { label: 'historical', icon: <Landmark size={24} className="text-gray-500" /> },
  { label: 'forest', icon: <Trees size={24} className="text-gray-500" /> },
  { label: 'rooms', icon: <Bed size={24} className="text-gray-500" /> },
  { label: 'castles', icon: <Castle size={24} className="text-gray-500" /> },
];

const TopTabMenu = () => {
  const navigate = useNavigate()
  const [leftArrow, setLeftArrow] = useState(false);
  const scrollContainer = useRef(null);

  console.log(scrollContainer)

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
      setLeftArrow(true);
    }
  };

  

  return (
    <div className="flex items-center">
      {leftArrow && (
        <div className="hidden md:block border-[0.5px] border-[rgba(0,0,0,0.3)] rounded-full">
          <Button className="w-[32px] h-[32px]" onClick={scrollLeft} variant="link">
            <ChevronLeft />
          </Button>
        </div>
      )}
      <div
        ref={scrollContainer}
        className="bg-white py-2 px-4 w-full max-w-[380px] md:max-w-[780px] flex overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {menuItems.map((item, index) => (
          <div key={index} onClick={() => navigate(`/properties/${item.label}`)}   className="flex cursor-pointer flex-col items-center justify-center text-center mr-6 min-w-[50px]">
            {item.icon}
            <span  className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="hidden ml-1 md:block border-[0.5px] border-[rgba(0,0,0,0.3)] hover:bg-gray-200 rounded-full">
        <Button className="w-[32px] h-[32px]" onClick={scrollRight} variant="link">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default TopTabMenu;
