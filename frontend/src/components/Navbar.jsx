import React from 'react'
import { Input } from './ui/input'
import { Menu, Search } from 'lucide-react'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { use } from 'react'
import CIcon from '@coreui/icons-react'
import { cibAirbnb } from '@coreui/icons'

const Navbar = () => {
  const navigate = useNavigate()

  const {user} = useSelector((store) => store.auth)

  console.log(user)

  const hostHandler = () => {
    if(user.role === "guest"){
      navigate("/application")
    }else if(user.role === "host"){
      navigate("/property-listing")
    }
  }

  const MenuItmesHandler = (type) => {
    if(type === "bookings"){
      navigate("/bookings")
    }
    if(type === "profile"){
      navigate("/profile")
    }
  }


  return (
    <div className='flex items-center justify-between border-b-2 w-full md:px-4 mx-auto h-16  mt-2'>

        <div onClick={()=> navigate("/")} className='ml-3 cursor-pointer'>
        <img className='w-[118px] md:ml-14' src='/public/airbnb (1).png' />
        </div>

        
          

           
           <div className='flex mr-3 items-center gap-3'>
           <div className="hidden md:block">
            <h1 className='text-xl font-semibold cursor-pointer hover:text-red-500 text-gray-500' onClick={hostHandler}>Airbnb your home</h1>
           </div>
      {user &&   <div className='cursor-pointer '>
        <DropdownMenu className="cursor-pointer mr-7 mt-9">
  <DropdownMenuTrigger asChild>
    <Menu />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="cursor-pointer mr-7 mt-7">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="cursor-pointer" onClick={() => MenuItmesHandler("profile")}>Profile</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer" onClick={() => MenuItmesHandler("bookings")} >Booking</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem >Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </div>}

           </div>
        

    </div>
  )
}

export default Navbar


{/* <form className="flex items-center rounded-lg overflow-hidden max-w-xl  border border-gray-300">
<Input className="flex-1 border-none focus-visible:ring-0"/>
<Button className="text-blue-800 bg-slate-200">
<Search style={{ height: '30px', width: '30px' }}/>
</Button>

</form> */}