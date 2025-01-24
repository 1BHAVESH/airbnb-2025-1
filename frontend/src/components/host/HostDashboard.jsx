import React, { useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { useHostDetailsQuery } from '@/features/api/hostApi';
import { da } from 'date-fns/locale';
import { Navigate, useNavigate } from 'react-router-dom';

const HostDashboard = () => {
  const navigate = useNavigate()
  const {isSuccess, isError, data, isLoading} = useHostDetailsQuery()

  if(isLoading) return <h1>Please wait...</h1>
 
console.log(data?.host)

  return (
    <div className="max-w-7xl mt-5 mx-auto px-4"> {/* Added padding for mobile */}
      {/* Total Earnings Card */}
     <div className='flex justify-between'>
     <Card className="max-w-[15rem] mx-auto sm:mx-0 sm:max-w-[20rem]"> {/* Center for mobile */}
        <CardContent className="space-y-3">
          <p className="text-2xl sm:text-3xl font-semibold">Total Earnings</p>
          <p className="text-green-500 text-lg sm:text-xl">₹ {data.totalAmount}</p>
        </CardContent>
      </Card>
      <div>
        <h1 onClick={() => {navigate("/host-property")}}  className='text-xl underline cursor-pointer hover:text-blue-600 font-semibold'>My Properties</h1>
      </div>
     </div>

      {/* Booking Details */}
      <div className="mt-5">
        <p className="text-lg sm:text-xl font-semibold text-center sm:text-left">
          This is a no. of Bookings you Have Accepted ({data.host.length})
        </p>
        <div className="space-y-5">
          {data.host && data.host.map((host) => (
            <div key={host._id} className="space-y-4 mt-5">
              {/* Property Card */}
              <Card className="flex flex-col lg:flex-row lg:h-[25rem] space-y-5 lg:w-[70rem]">
                {/* Image Section */}
                <div className="mb-4 my-5 lg:mb-0 lg:ml-3 lg:pr-10 border-b-2 lg:border-b-0 lg:border-r-2 pb-4 lg:pb-0">
                  <h1 className="text-xl lg:text-2xl font-semibold">{host.title}</h1>
                  <img
                    className="h-[15rem] w-full  lg:h-[20rem] rounded-md object-cover"
                    src={host?.mainImg || "https://a0.muscache.com/im/pictures/7a0e4e5f-ce39-485a-b8d3-cc95c2c81a7e.jpg?im_w=720&im_format=avif"}
                    alt="Property"
                  />
                </div>
                {/* Details Section */}
                <div className="lg:mt-24 lg:ml-5 px-4">
                  <p className="text-sm lg:text-lg">Guest Account's name: <span className="font-bold">Bhavesg</span></p>
                  <p className="text-sm lg:text-lg">Total Guest: <span className="font-bold">{host.totalGuest}</span></p>
                  <p className="text-sm lg:text-lg">Check-in: <span className="font-bold">{host.checkIn}</span></p>
                  <p className="text-sm lg:text-lg">Check-out: <span className="font-bold">{host.checkOut}</span></p>
                  <p className="text-sm lg:text-lg">Price: <span className="font-bold">₹ {host.totalAmout}</span></p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
