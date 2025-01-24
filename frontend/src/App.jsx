import { Button } from "@/components/ui/button"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Login from "./components/user/Login"
import Cards from "./components/card/Cards"
import HotelHeroSection from "./components/user/HotelDetail/HeroSection"
import Listing from "./components/host/property/Listing"
import Application from "./components/host/Application"
import HostDetails from "./components/host/HostDetails"
import Bookings from "./components/user/Bookings"
import HostDashboard from "./components/host/HostDashboard"
import HostPropety from "./components/host/property/HostPropety"
import CategoryProperty from "./components/card/CategoryProperty"

export default function APP() {

  const appRouter = createBrowserRouter([ 
   {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: 
        <>
        <HeroSection />
        <Cards />
        </>,
      },
      {
        path:"/:pyid/hotel-detail",
        element:<HotelHeroSection />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/application",
        element: <Application />
      },
      {
        path: "/host-details",
        element: <HostDetails />
      },
      {
        path: "/property-listing",
        element: <Listing />
      },
      {
        path: "/bookings",
        element: <Bookings />
      },
      {
        path: "/profile",
        element: <HostDashboard />
      },
      {
        path:"/host-property",
        element: <HostPropety />
      },
      {
        path: "/:id/property-listing-info",
        element: <Listing />
      },
      {
        path: "/properties/:category",
        element: <>
        <HeroSection />
        <CategoryProperty />
        </>
      }
    ]
   }
  ])

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}
