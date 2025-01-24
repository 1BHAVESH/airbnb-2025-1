import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const BookingCards = ({booking}) => {
  return (
    <div className="max-w-3xl space-x-2 my-4 gap-6">
      <Card className="md:w-[321px] border gap-4 border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden mb-4">
        <div className='h-[300px] overflow-hidden'>
          <img className='h-[290px] w-[100%] md:w-[321px] md:h-[302px] object-cover' src={booking?.mainImg} alt="Property" />
        </div>
        <CardContent className="p-4">
          <h1 className="text-xl font-semibold hover:underline truncate">{booking.title}</h1>
          <p className="text-gray-600">{booking.totalAmout} rs</p>
          <div className="mt-2 text-sm text-gray-500">
            <p><span className="font-medium">Check-in:</span> {booking.checkIn}</p>
            <p><span className="font-medium">Check-out:</span> {booking.checkOut}</p>
            <p><span className="font-medium">Guests:</span> {booking.totalGuest}</p>
            <p><span className="font-medium">Address:</span> {booking.address}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCards;
