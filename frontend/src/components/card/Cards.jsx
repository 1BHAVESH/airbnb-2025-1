import React from 'react'
import { Card } from '../ui/card'
import Cardss from './Card'
import { useGetAllPropertisQuery, useGetPropteryByCategoryQuery } from '@/features/api/listingApi'
import { useParams } from 'react-router-dom'


const Cards = () => {
  const {data, isSuccess, isError, error, isLoading, refetch} = useGetAllPropertisQuery()

  if(isLoading) return <div>Loading...</div>  
  
  console.log(data)
  return (
    <div className='max-w-[85rem] mx-auto p-4 md:p-2'>
     <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
            data?.property.map((pro) => <Cardss pro={pro} key={pro._id} /> )
        }
    </div>
   </div>
  )
}

export default Cards