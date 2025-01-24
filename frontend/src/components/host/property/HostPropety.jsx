import Cardss from '@/components/card/Card'
import { useHostPrortiesQuery } from '@/features/api/hostApi'
import { da } from 'date-fns/locale'
import React from 'react'

const HostPropety = () => {
    const {data, isLoading} = useHostPrortiesQuery()
    if(isLoading) return <h1>Please wait...</h1>
    console.log(data)
  return (
    <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-semibold text-center'>This is Your Property You ca edit it </h1>
         <div className='max-w-[85rem] mx-auto p-4 md:p-2'>
     <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
            data?.host?.proptiesId.map((pro) => <Cardss propertyInfo={pro}  title={pro.title} price={pro.price} img={pro?.mainImage} key={pro._id} /> )
        }
    </div>
   </div>
    </div>
  )
}

export default HostPropety