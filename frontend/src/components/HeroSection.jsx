import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import MenuItems from '../components/MenuItems.jsx'; // Horizontal menu component
import { Link } from 'react-router-dom';
import TopTabMenu from '../components/MenuItems.jsx';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setTaxes } from '@/features/authSlice';

const HeroSection = () => {
  const dispatch = useDispatch()
  const [isAirplaneMode, setIsAirplaneMode] = useState(false);
  const handleSwitchChange = (checked) => {
    setIsAirplaneMode(checked);
    console.log("Switch Value:", checked); 
    
    if(isAirplaneMode){
      dispatch(setTaxes(checked))
      console.log(isAirplaneMode)
    }else{
      dispatch(setTaxes(checked))
      console.log(isAirplaneMode)
    }
  };
  return (
    <>
      {/* Hero Section */}
      {/* <div className="relative  py-16 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-2xl text-white font-semibold">
            Explore Your Manpasand Hotels And Destinations
          </h1>
        </div>
        <form className="max-w-xl mx-auto my-4 flex rounded-full shadow-lg overflow-hidden items-center">
          <Input
            className="bg-white flex-grow rounded-l-full border-none px-6 focus-visible:ring-0"
            placeholder="Search your destination..."
          />
          <Button className="px-6 py-3 rounded-r-full">
            <Search />
          </Button>
        </form>
       <Link>
       <Button className="hover:text-blue-600 bg-red-400" variant="link">Go to Lacture Page</Button>
       </Link>
      </div> */}

      {/* Horizontal Menu */}
      <div className="mt-2 flex justify-between md:mt-6 md:ml-16 md:mr-5 max-w-7xl">
        <TopTabMenu /> {/* Horizontal scrolling menu */}
        <div className="hidden md:block flex justify-center  border-2  w-[230px] rounded-md border-black items-center space-x-2">
       <div className='flex mt-5 space-x-2 flex-row items-center justify-center'>
       <Label htmlFor="airplane-mode">Display Total Before Taxes</Label>
      <Switch id="airplane-mode"
      checked={isAirplaneMode} // Controlled state
      onCheckedChange={handleSwitchChange} // State update handler
       />
       </div>
      
    </div>
      </div>
    </>
  );
};

export default HeroSection;
