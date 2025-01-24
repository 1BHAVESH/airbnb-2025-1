import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { af } from 'date-fns/locale'
import Listing from '../host/property/Listing'

const Cardss = ({pro, booking, title, price, img, propertyInfo}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {taxes} = useSelector((store) => store.auth)
  let afterTax = taxes ? ((pro.price * 18) / 100) : ""
  afterTax = afterTax + pro?.price
  const navigate = useNavigate()

  const cardHandler = async(type) => {
    setLoading(true)
    setError(null)
    try {
      if(type === "user"){
        navigate(`/${pro._id}/hotel-detail`)
      } else {
        navigate(`/${propertyInfo._id}/property-listing-info`)
      }
    } catch (err) {
      setError('Failed to navigate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-2 cursor-pointer' onClick={() => pro ? cardHandler("user") : cardHandler("host") }>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      <Card className="md:w-[321px] border-none hover:shadow-lg transition-shadow duration-300">
        <div className='h-[300px]'>
          <img className='h-[290px] w-[100%] md:w-[321px] md:h-[302px] rounded-md object-cover' src={pro?.mainImage || img} alt="Property" />
        </div>
        <CardContent className="my-2 p-2 border-none">
          <h1 className="pt-0 font-semibold hover:underline truncate">{pro?.title || title}</h1>
          {pro ? (
            <>
              <p className='text-muted-foreground'>221km away</p>
              <p className='text-muted-foreground'>8-14 jan</p>
            </>
          ) : ("")}
          <p>{pro ? taxes ? afterTax : pro?.price : price} rs</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Cardss