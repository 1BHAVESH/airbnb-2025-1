import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useHostregisterMutation } from "@/features/api/hostApi";
import { da } from "date-fns/locale";
import { toast } from "sonner";


const HostDetails = () => {
  // State for host details
  const [hostDetails, setHostDetails] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    bio: "",
  });

  const [hostregister, {data, isSuccess, isError, error, isLoading}] = useHostregisterMutation()

  useEffect(()=> {
    if(isSuccess){
      toast.success(data.message)
    }
  },[data, isSuccess, isError, error])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle submit (e.g., save or send the data to backend)
  const handleSubmit = async() => {

    const formData = new FormData();

    formData.append("name",hostDetails.name)
    formData.append("email", hostDetails.email)
    formData.append("phone", hostDetails.phone)
    formData.append("street", hostDetails.street)
    formData.append("zipCode", hostDetails.zipCode)
    formData.append("state", hostDetails.state)
    formData.append("country", hostDetails.country)
    formData.append("bio", hostDetails.bio)
    formData.append("city", hostDetails.city)

    await hostregister({formData})
    
    

    console.log("Host Details Submitted:", hostDetails);
    // You can now send the hostDetails to your backend for storage
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Enter Host Details</h2>

      {/* Input fields for Host Details */}
      <div className="mb-4">
        <Label htmlFor="name" className="block text-lg font-medium mb-1">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={hostDetails.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="email" className="block text-lg font-medium mb-1">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          value={hostDetails.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="phone" className="block text-lg font-medium mb-1">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          value={hostDetails.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="profileImage" className="block text-lg font-medium mb-1">
          Profile Image URL
        </Label>
        <Input
          id="profileImage"
          name="profileImage"
          value={hostDetails.profileImage}
          onChange={handleChange}
          placeholder="Enter profile image URL"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="street" className="block text-lg font-medium mb-1">
          Street Address
        </Label>
        <Input
          id="street"
          name="street"
          value={hostDetails.street}
          onChange={handleChange}
          placeholder="Enter street address"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="city" className="block text-lg font-medium mb-1">
          City
        </Label>
        <Input
          id="city"
          name="city"
          value={hostDetails.city}
          onChange={handleChange}
          placeholder="Enter city"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="state" className="block text-lg font-medium mb-1">
          State
        </Label>
        <Input
          id="state"
          name="state"
          value={hostDetails.state}
          onChange={handleChange}
          placeholder="Enter state"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="country" className="block text-lg font-medium mb-1">
          Country
        </Label>
        <Input
          id="country"
          name="country"
          value={hostDetails.country}
          onChange={handleChange}
          placeholder="Enter country"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="zipCode" className="block text-lg font-medium mb-1">
          Zip Code
        </Label>
        <Input
          id="zipCode"
          name="zipCode"
          value={hostDetails.zipCode}
          onChange={handleChange}
          placeholder="Enter zip code"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="bio" className="block text-lg font-medium mb-1">
          Short Bio
        </Label>
        <textarea
          id="bio"
          name="bio"
          value={hostDetails.bio}
          onChange={handleChange}
          placeholder="Enter a short bio"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </Button>
    </div>
  );
};

export default HostDetails;
