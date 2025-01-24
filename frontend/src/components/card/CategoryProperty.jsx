import { useGetPropteryByCategoryQuery } from '@/features/api/listingApi'
import React from 'react'
import { useParams } from 'react-router-dom'
import Cardss from './Card'

const CategoryProperty = () => {

    const params = useParams()
    const category = params.category
    const {getPropteryByCategory, data, isLoading} = useGetPropteryByCategoryQuery({category})
   
    if(isLoading) return <p>Loading...</p>

    console.log(data)

  return (
    <div className='max-w-[85rem] mx-auto p-4 md:p-2'>
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
       {
           data?.properties.map((pro) => <Cardss pro={pro} key={pro._id} /> )
       }
   </div>
   </div>
  )
}

export default CategoryProperty