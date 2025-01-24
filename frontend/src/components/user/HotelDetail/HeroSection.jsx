import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Calendar } from "@/components/ui/calendar";
import { addDays, format, isWithinInterval } from "date-fns"
import { ArrowDown, ArrowUp, ArrowUp01Icon, Calendar as CalendarIcon, ChevronDown, ChevronUp, LucideSquareArrowDown, MinusCircle, MoveDown, PlusCircle } from "lucide-react"
// import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { Separator } from "@/components/ui/separator";
import { 
  CarFront,
  DoorOpen,
  Flower,
  LampDesk,
  LucideLampDesk,
  Mountain,
  SoupIcon,
  Table,
  Tv,
  WindArrowDown,
} from "lucide-react";
import React, { Children, useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Default styles
import "react-date-range/dist/theme/default.css"; // Default theme
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { useGetPropetyDetailQuery } from "@/features/api/listingApi";
import MapComponent from "@/components/MapComponet";
import { da } from "date-fns/locale";
import MapboxMap from "@/components/MapComponet";
import { useDispatch, useSelector } from "react-redux";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { data } from "autoprefixer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useBookingMutation } from "@/features/api/bookApi";
import { Textarea } from "@/components/ui/textarea";
import ReactStars from "react-rating-stars-component";

const HotelHeroSection = () => {
  const [commonDate, setCommonDate] = useState({
    checkIn: "",
    checkOut: "",
  });
  const params = useParams()

 const id = params.pyid

//  console.log(id)

 const {data, isLoading, isSuccess, isError} = useGetPropetyDetailQuery({id})
//  console.log(data)
 
 if(isLoading) return <h1>please wait...</h1>
 const {proprty} = data

 console.log(data)

 let mobImg = [proprty.mainImage]

 proprty.images.map((src, index) => (
  mobImg.push(src)
 ))

 const ratingChanged = (newRating) => {
  console.log(newRating);
};

  return (
    <div className="max-w-7xl md:px-[40px] mx-auto mt-5">
      <h1 className="hidden md:block md:text-3xl md:font-semibold">
       {proprty.title}
      </h1>
      <div className="md:flex  mt-4 space-x-2">
        <div className="hidden md:block">
          <img
            className="w-[555px] h-[373px] sm:w-screen sm:h-[373px] md:w-[554px] md:h-[373px] md:rounded-l-xl object-cover"
            src={proprty.mainImage}
            alt="Main view of Darling D&D's House"
          />
        </div>
        <div className="md:hidden">
          <MobileImages images={mobImg} />
          {/* <img
            className="w-[555px] h-[373px] sm:w-screen sm:h-[373px] md:w-[554px] md:h-[373px] md:rounded-l-xl object-cover"
            src={proprty.mainImage}
            alt="Main view of Darling D&D's House"
          /> */}
        </div>
        <div className="hidden md:grid md:grid-cols-2 md:gap-2">
          {proprty.images.map((src, index) => (
            <img
              key={index}
              className="w-[279px] h-[180px] object-cover "
              src={src}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 ml-2 md:ml-0 max-w-[40rem] mx-auto space-y-3 md:space-y-0">
        <h1 className="md:hidden text-3xl font-semibold">
          Darling D&D's House
        </h1>
        <h1 className="text-2xl text-gray-900 font-semibold">
          {proprty.address}
        </h1>
        <p>2 guests1 bedroom1 bed1 bathroom</p>
        <p className="text-[#222222] font-medium">5 star</p>
      </div>
      <Separator className="text-2xl mt-3 md:w-[40rem]" />
      {/* //kkk */}
     <div className="md:flex md:justify-between">
      <div>
      <div className="flex mt-4 gap-4 ml-2 md:ml-0">
      
      <Avatar className="mt-2">
         <AvatarImage src="https://github.com/shadcn.png" />
       </Avatar>

       <div className="">
         <h1 className="font-semibold">Hosted by Moinho</h1>
         <p>Superhost10 years hosting</p>
       </div>
      
      
     </div>
     <Separator className="text-2xl mt-3 md:w-[40rem]" />
     <div className="flex mt-4 gap-4 ml-2 md:ml-0">
       <LucideLampDesk size={30} />

       <div className="ml-2">
         <h1 className="font-semibold">Dedicated workspace</h1>
         <p>A room with wifi that's well suited for working.</p>
       </div>
     </div>
     <div className="flex mt-4 gap-4 ml-2 md:ml-0">
       <DoorOpen size={30} />
       <div className="ml-2">
         <h1 className="font-semibold">Self check-in</h1>
         <p>Superhost10 years hosting</p>
       </div>
     </div>

     <Separator className="text-3xl my-8 md:w-[40rem]" />

     <div className="p-4 md:p-0 md:max-w-2xl my-5">
       <p dangerouslySetInnerHTML={{__html: proprty?.description}} />
        
     </div>
     <Separator className="text-7xl my-8 md:w-[40rem]" />
     <div className="grid grid-cols-2 p-4 md:max-w-xl">
       <div className="space-y-5 max-w-3xl">
         <h1 className="text-2xl font-semibold">What this place offers</h1>
         <div className="flex gap-5">
           <Flower size={30} className="" />
           <span className="">Garden View</span>
         </div>
         <div className="flex gap-5">
           <SoupIcon size={30} className="" />
           <span className="">Kitchen</span>
         </div>
         <div className="flex gap-5">
           <CarFront size={30} className="" />
           <span className="">Free parking on premises</span>
         </div>
         <div className="flex gap-5">
           <Tv size={30} className="" />
           <span className="">HDTV with Roku</span>
         </div>
         <div className="flex gap-5">
           <WindArrowDown size={30} className="" />
           <span className="">Private patio or balcony</span>
         </div>
       </div>

       <div className="space-y-5 mt-12 md:block hidden">
         <div className="flex gap-5">
           <Flower size={30} className="" />
           <span className="">Garden View</span>
         </div>
         <div className="flex gap-5">
           <SoupIcon size={30} className="" />
           <span className="">Kitchen</span>
         </div>
         <div className="flex gap-5">
           <CarFront size={30} className="" />
           <span className="">Free parking on premises</span>
         </div>
         <div className="flex gap-5">
           <Tv size={30} className="" />
           <span className="">HDTV with Roku</span>
         </div>
         <div className="flex gap-5">
           <WindArrowDown size={30} className="" />
           <span className="">Private patio or balcony</span>
         </div>
       </div>
     </div>
     <Separator className="text-7xl my-8 md:w-[40rem]" />
      <div className="max-w-[30rem] hidden md:block">
        <DatePickerWithRange bookingDateInfo={proprty.bookingDate} commonDate={commonDate} setCommonDate={setCommonDate}/>
      </div>
      </div>
      <div className="md:relative">
<div className="md:sticky md:top-16">
  <BookingCard mainImg={proprty.mainImage} bookingDateInfo={proprty.bookingDate} commonDate={commonDate} hostId= {proprty.host} propertyId={proprty._id} setCommonDate={setCommonDate} price={proprty.price} title={proprty.title} address={proprty.address} />
</div>
</div>
     </div>
      {/* kK */}
      
      <div className="hidden md:block">
        <Reviews />
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold">Please leave here your reviews about our property</h1>
        <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      activeColor="#ffd700"
    />
          <Textarea className="border-black" />
        </div>
      </div>
      <div className="md:hidden">
        <CarouselDemo />
      </div>
      <div className="my-5 mb-10">
        <MapboxMap coordinates={data?.proprty?.location?.coordinates} />
      </div>
    </div>
  );
};

export default HotelHeroSection;

const Reviews = ({ reviews }) => {
  const reviewss = ["hi", "hello", "how are you", "i am fine", "hi", "hello", "how are you", "i am fine"];
  const isTwoColumnLayout = reviewss.length > 3;

  return (
    <div className={`grid ${isTwoColumnLayout ? 'grid-cols-2' : 'grid-cols-1'} gap-5 my-5 md:max-w-7xl`}>
      {reviewss.slice(0, 6).map((review, idx) => (
        <div className="my-5" key={idx}>
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={review.avatarUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>{review.initials || "CN"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold">{review.name || "Bhavesh"}</h1>
              <p>{review.text || "Review text goes here..."}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MobileReview = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 p-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="max-w-sm w-full p-4 border rounded-lg shadow-md">
          <div className="space-y-4">
            <p>
              Jennifer's place was lovely. It had all the comforts of home. The
              bed was very comfortable, and the location was so peaceful. We had a
              fire in the fire pit and loved seeing the ponies nearby. Plus, we
              didn't have far to drive to get to Glacier National Park from there.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <p>bhavesh</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



const CarouselDemo = () => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="w-full sm:w-[400px]"> {/* sm:w-[400px] width added for small screens */}
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <p>
                    Jennifer's place was lovely. It had all the comforts of home. The
                    bed was very comfortable, and the location was so peaceful. We had a
                    fire in the fire pit and loved seeing the ponies nearby. Plus, we
                    didn't have far to drive to get to Glacier National Park from there.
                  </p>
                </CardContent>
                <CardFooter className="flex items-center space-x-2">
                  {/* ShadCN Avatar */}
                  <Avatar>
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/women/44.jpg" // Sample Avatar URL
                      alt="Avatar"
                    />
                    <AvatarFallback>Bhavesh</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold">Bhavesh</p>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

function BookingDateRange() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
    console.log(range);
    console.log(range[0].endDate);
  };

  // Calculate nights difference
  const nights = Math.ceil(
    (range[0].endDate - range[0].startDate) / (1000 * 60 * 60 * 24)
  );

  // Check if screen is mobile
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {range[0].endDate ? `${nights} night${nights > 1 ? "s" : ""} in Pharog` : "Select your dates"}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {range[0].startDate.toLocaleDateString("en-GB")} -{" "}
          {range[0].endDate.toLocaleDateString("en-GB")}
        </p>

        {/* Calendar */}
        <div className="inline-block border-b">
          <DateRangePicker
            ranges={range}
            onChange={handleSelect}
            minDate={new Date()}
            months={isMobile ? 1 : 2} // 1 month for mobile, 2 for desktop
            direction={isMobile ? "vertical" : "horizontal"} // Vertical for mobile
            rangeColors={["#000"]}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            staticRanges={[]}
            inputRanges={[]}
            className="w-[20rem] md:max-w-[25rem] border-b-2"
          />
        </div>

        {/* Clear Dates */}
        <div className="">
          <Button
            className="md:mr-[20rem]"
            variant="link"
            onClick={() =>
              setRange([
                {
                  startDate: new Date(),
                  endDate: new Date(),
                  key: "selection",
                },
              ])
            }
          >
            Clear Data
          </Button>
        </div>
      </div>
    </div>
  );
}

const MobileImages = ({images}) => {
  return (
    <Carousel className="w-full">
    <CarouselContent>
      {images.map((img, index) => (
        <CarouselItem key={index}>
          <div className="w-screen h-[290px]">
            <img
              className="w-[95vw] h-[290px] object-contain md:w-[554px] md:h-[373px] md:rounded-l-xl"
              src={img}
              alt="Main view of Darling D&D's House"
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
  
  );
};









function DatePickerWithRange({ className, bookingDateInfo, commonDate, setCommonDate}) {
  const dispatch = useDispatch();

  let bookingCheckin;
  let formatedDateCheckin;
  let bookingCheckout;
  let formatedDateCheckout;
 if(bookingDateInfo){
   bookingCheckin = new Date(bookingDateInfo.checkIn)

   formatedDateCheckin = format(bookingCheckin, "dd/MM/yyyy")

   bookingCheckout = new Date(bookingDateInfo.checkOut)

   formatedDateCheckout = format(bookingCheckout, "dd/MM/yyyy")

 
 
 }

 function isDateDisabled(date) {
  return isWithinInterval(date, { start: bookingCheckin, end: bookingCheckout });
}

 console.log(formatedDateCheckin)
 console.log(formatedDateCheckout)

  // Date state
  const [date, setDate] = useState({
    from: commonDate?.checkIn ? new Date(commonDate.checkIn) : new Date(),
    to: commonDate?.checkOut ? new Date(commonDate.checkOut) : addDays(new Date(), 20),
  });

  useEffect(() => {
    if(commonDate.checkIn && commonDate.checkOut){
      setDate({
        from:  new Date(commonDate.checkIn),
        to: new Date(commonDate.checkOut)
      })
    }
  }, [commonDate])

  // CommonDate state for formatted dates
  

  // Update commonDate whenever `date` changes
  const handleDateSelection = (selectedDate) => {
if(selectedDate === undefined){
  console.log("hiiii")

  bookingCheckout.setDate(bookingCheckout.getDate() + 1)
 console.log(bookingCheckout)

  console.log(selectedDate)
  const checkkkkOut = bookingCheckout
  checkkkkOut.setDate(checkkkkOut.getDate() + 3)
  console.log(checkkkkOut)
  setDate({ from: bookingCheckout, to: checkkkkOut});
}
    if (selectedDate?.from && selectedDate?.to) {
      // Update local state
      setDate({
        from: selectedDate.from,
        to: selectedDate.to,
      });

      // Update global state
      setCommonDate({
        checkIn: format(selectedDate.from, "MM/dd/yyyy"),
        checkOut: format(selectedDate.to, "MM/dd/yyyy"),
      });
    }
  };

  // console.log(date)
  

  

  return (
    <div className={className}>
      <p className="font-semibold text-2xl">
        {Math.ceil((date?.to - date?.from) / (1000 * 60 * 60 * 24))} nights
      </p>
      <p>{formatedDateCheckin && formatedDateCheckout ? (`These property is bookked ${formatedDateCheckin} - ${formatedDateCheckout}`) : ("")}</p>

      <p>
        {commonDate.checkIn}{" - "}{commonDate.checkOut}
      </p>
      <Calendar
  initialFocus
  mode="range"
  defaultMonth={date?.from}
  selected={date}
  onSelect={handleDateSelection}
  modifiers={{
    disabled: (date) => isDateDisabled(date),
  }}
  modifiersClassNames={{
    disabled: "opacity-50 cursor-not-allowed", // Add a disabled style
  }}
  numberOfMonths={2}
/>
    </div>
  );
}





const BookingCard = ({mainImg, commonDate, setCommonDate, bookingDateInfo, price, title, address, propertyId, hostId}) => {

  const[booking] = useBookingMutation()
  const [triggerBooking, setTriggerBooking] = useState(false);

  // console.log(commonDate)

  const[bookingInfo, setBookingInfo] = useState({
    checkIn:"",
    checkOut:"",
    totalguest:"",
    totalPrice: "",
    title,
    address,
    propertyId,
    mainImg
  })
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [guest, setGuest] = useState({
    adult:1,
    children:0
  })

  const cleaningFee = 689

  const airbnbFee = 300

  const guestHandle = (number, type) => {
    // console.log(type)
    // console.log(number)
    if(type === "adult"){
      setGuest((prevGuest) => ({
        ...prevGuest,
        adult: prevGuest.adult + number, // Use the latest value of 'adult'
      }));
    }if(type === "children"){
      setGuest((prevGuest) => ({
        ...prevGuest,
        children: prevGuest.children + number, // Use the latest value of 'adult' removeAdult
      })); 
    }if(type === "removeAdult"){  
      setGuest((prevGuest) => ({
        ...prevGuest,
        adult: prevGuest.adult - number, // Use the latest value of 'adult'
      }));
    }if(type === "removeChildren"){  
      setGuest((prevGuest) => ({
        ...prevGuest,
        children: prevGuest.children - number, // Use the latest value of 'adult'
      }));
    }
  }

  

  const totalGuest = guest.adult + guest.children

 const [totalAmount, setTotalAmount] = useState()

 const bookingHandler = () => {
  setBookingInfo((previos) => ({
    ...previos,
    totalguest: totalGuest,
    totalPrice: airbnbFee + cleaningFee + (price * totalAmount),
    checkIn: commonDate.checkIn,
    checkOut: commonDate.checkOut,
    hostId,
    
  }));

  setTriggerBooking(true)

 
};

// Use useEffect to log updated state after it's changed
useEffect(() => {
  // console.log("Updated Booking Info:", bookingInfo);

  if(triggerBooking){
    booking({bookingInfo})
  }

  setTriggerBooking(false) 
 
}, [bookingInfo, triggerBooking]);  // This will run whenever bookingInfo updates


//  console.log("ppppppppppppp", totalAmount)
 
  
  return (
    <div className="w-[373px] mx-auto border sticky border-gray-300 rounded-lg p-4 shadow-md">
      <h1 className="text-2xl font-semibold mb-2">₹{price} <span className="text-sm font-normal">night</span></h1>
      
      {/* Check-in/Check-out Section */}
      <div >
       <BookingDateCard commonDate={commonDate} setCommonDate={setCommonDate} totalAmount={totalAmount} setTotalAmount={setTotalAmount}/>
      </div> 

      {/* Guest Selection */}
      <div className="border border-gray-300 rounded-md mb-4 px-3 py-2">
     <Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
      <PopoverTrigger  asChild>
        <div className="cursor-pointer flex justify-between items-center">
         <div>
         <p>Guests</p>
         <p>{totalGuest} guest</p>
         </div>
         <div>
         {
          isPopoverOpen ? (<ChevronDown className="cursor-pointer"/>) : ( <ChevronUp className="cursor-pointer"/>)
         }
         </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[22rem]">
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Adults</p>
              <p>Age 13+</p>
            </div>
            <div className="flex items-center space-x-5">
              {guest.adult >= 2 ? (<MinusCircle onClick={() => guestHandle(1, "removeAdult")}/>) : ""}
              <p >{guest.adult}</p> 
              <PlusCircle
    onClick={guest.adult < 3 ? () => guestHandle(1, "adult") : null}
    className={`cursor-pointer ${guest.adult >= 3 ? "text-gray-400 cursor-not-allowed" : "text-black"}`}
  />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
            

              <p className="font-semibold">Childrens</p>
              <p>2 - 12</p>
            </div>
            <div className="flex items-center space-x-5">
            {guest.children >= 1 ? (<MinusCircle onClick={() => guestHandle(1, "removeChildren")}/>) : ""}
              <p>{guest.children}</p> 
              <PlusCircle  onClick={guest.children < 3 ? () => guestHandle(1, "children") : null} className={`cursor-pointer ${guest.children >= 3 ? "text-gray-400 cursor-not-allowed" : "text-black"}`}/>
            </div>
          </div>
        </div>
      </PopoverContent>
     </Popover>
      </div>
 
      {/* Reserve Button */}
      <button onClick={bookingHandler} className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg font-semibold mb-4">
        Reserve
      </button>
      <p className="text-sm text-gray-500 text-center mb-4">You won't be charged yet</p>

      {/* Price Breakdown */}
      <div className="text-md">
        <div className="flex justify-between mb-2">
          <span>₹{`${price} X ${totalAmount} `}nights</span>
          <span>₹{price * totalAmount}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Cleaning fee</span>
          <span>₹{cleaningFee}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Airbnb service fee</span>
          <span>₹{airbnbFee}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total before taxes</span>
          <span>₹{cleaningFee + airbnbFee + (price * totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

function BookingDateCard({ className, commonDate, setCommonDate, totalAmount, setTotalAmount }) {
  // console.log("Initial commonDate:", commonDate);

  const [date, setDate] = useState({
    from: commonDate?.checkIn ? new Date(commonDate.checkIn) : new Date(),
    to: commonDate?.checkOut ? new Date(commonDate.checkOut) : addDays(new Date(), 20),
  });

  useEffect(() => {
    if (commonDate?.checkIn && commonDate?.checkOut) {
      setDate({
        from: new Date(commonDate.checkIn),
        to: new Date(commonDate.checkOut),
      });
    }
  }, [commonDate]);

  const isValidDate = (date) => date instanceof Date && !isNaN(date);

  const formattedCheckIn = isValidDate(date.from)
    ? format(date.from, "MM/dd/yyyy")
    : "Invalid Date";
  const formattedCheckOut = isValidDate(date.to)
    ? format(date.to, "MM/dd/yyyy")
    : "Invalid Date";

  useEffect(() => {
    setCommonDate({
      checkIn: isValidDate(date.from) ? formattedCheckIn : null,
      checkOut: isValidDate(date.to) ? formattedCheckOut : null,
    });
  }, [formattedCheckIn, formattedCheckOut]);

  // console.log("Date state:", date);
  // console.log("Formatted Check-In:", formattedCheckIn);
  // console.log("Formatted Check-Out:", formattedCheckOut);

 totalAmount = Math.ceil((new Date(formattedCheckOut) - new Date(formattedCheckIn)) / (1000 * 60 * 60 * 24))

 setTotalAmount(totalAmount)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex justify-between items-center border border-gray-300 rounded-md mb-3">
            <div className="w-1/2 border-r cursor-pointer px-3 py-2">
              <label className="text-xs text-gray-500 block">CHECK-IN</label>
              <p className="text-sm font-medium">
                {isValidDate(date.from) ? format(date.from, "MM/dd/yyyy") : "Invalid Date"}
              </p>
            </div>
            <div className="w-1/2 px-3 cursor-pointer py-2">
              <label className="text-xs text-gray-500 block">CHECKOUT</label>
              <p className="text-sm font-medium">
                {isValidDate(date.to) ? format(date.to, "MM/dd/yyyy") : "Invalid Date"}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={isValidDate(date.from) ? date.from : new Date()}
            selected={date}
            onSelect={(range) => {
              setDate(range || { from: null, to: null });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}



 






// const MobileReview = () => {
//   return (
//     <div className="space-y-5 flex">
//     { Array.from({length:5}).map((_, idx) => (<Card key={idx} className=" gap-10 mx-auto shadow-md">
//         <CardContent>
//           <p>
//             Jennifer's place was lovely. It had all the comforts of home. The
//             bed was very comfortable, and the location was so peaceful. We had a
//             fire in the fire pit and loved seeing the ponies nearby. Plus, we
//             didn't have far to drive to get to Glacier National Park from there.
//           </p>
//         </CardContent>
//         <CardFooter>
//           <p>bhavrsh</p>
//         </CardFooter>
//       </Card>)) }
//     </div>
//   );
// };


