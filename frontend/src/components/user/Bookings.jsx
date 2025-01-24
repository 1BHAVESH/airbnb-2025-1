import React from 'react'
import BookingCards from './BookingCards'
import { useGetBookinsQuery } from '@/features/api/bookApi'
import Cardss from '../card/Card'

const Bookings = () => {
  const {getBookins, data,isSuccess,isLoading} = useGetBookinsQuery()
  if(isLoading){
    return <div>Loading...</div>
  }

  console.log(data)
  return (
    <div className='max-w-[85rem] mx-auto p-4 md:p-2'>
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
       {
           data?.bookings.map((booking) => <BookingCards booking={booking} key={booking._id} bookingCancelOrNot={true}/> )
       }
   </div>
  </div>
    // <div>
    //     < bookingData={data} bookingCancelOrNot={true}/>
    // </div>
  )
}

export default Bookings