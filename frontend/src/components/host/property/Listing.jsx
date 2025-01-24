import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState, useRef } from "react";
import RichTextEditor from "./RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEditPropertyMutation, useGetPropetyDetailQuery, useListingPropertyMutation } from "@/features/api/listingApi";
import { toast } from "sonner";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Listing = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    address: "",
    cordinate: [],
    photos: [],
    mainImage: null,
  });

  const [previewThumbnails, setPreviewThumbnails] = useState([]);
  const [mainImg, setMainImg] = useState("");

  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const id = params.id;

  const [listingProperty, { isSuccess }] = useListingPropertyMutation();
  const { data: propertyData, isLoading } = useGetPropetyDetailQuery({ id });
  const [editProperty, { isSuccess: editPropertySuccess, data: editData }] = useEditPropertyMutation();

  useEffect(() => {
    if(editPropertySuccess){
      toast.success({
        position: "top-center",
      });
  }}, [editPropertySuccess]);
  

  // Persisted input state to avoid reset within render cycle
 

  // Debug: Log the propertyData to check if it is correct
  useEffect(() => {
    console.log("Fetched property data: ", propertyData);
  }, [propertyData]);

  // Toast on successful listing
  useEffect(() => {
    if (isSuccess) {
      toast.success("Listing successful");
    }
  }, [isSuccess]);

  // Effect to set input state when propertyData is fetched
  useEffect(() => {
    if (propertyData?.proprty) {
      // Check for initial values in `inputRef` before updating
      
      setInput((prev) => ({
        ...prev,
        title: propertyData.proprty.title,
       
        price: propertyData.proprty.price,
        category: propertyData.proprty.category,
        address: propertyData.proprty.address,
        cordinate: propertyData.proprty.cordinate,
      }));

      setMainImg(propertyData.proprty.mainImage);
      propertyData.proprty.images.forEach((img) => {
        setPreviewThumbnails((prev) => [...prev, img]); // Update previewThumbnails state         
      } );
      
      }},[propertyData]);

      console.log(input);
      // console.log(previewThumbnails)

    //  useEffect(() => {
    //   if(propertyData?.proprty){
    //     setInput((prev) => ({ 
    //       ...prev,
    //       description: propertyData.proprty.description,
    //     }));
    //  }}, [propertyData]);

      console.log(input);

  if (!user || user.role === "guest") {
    return <Navigate to="/application" />;
  }

  // Function to fetch lat-long based on address
  const getLatLong = async (address) => {
    try {
      const apiKey = '3dd986fcacd74855a62f879b9465d135'; // OpenCage API key
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setInput((prev) => ({ ...prev, cordinate: [lat, lng] }));
        console.log(lat, lng);
      } else {
        console.error("Invalid address");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Input change handler
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    if (name === "address" && value.trim() !== "") {
      getLatLong(value); // Fetch lat-long when address is valid
    }
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectThumbnails = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setInput({ ...input, photos: files });

      // Generate previews for selected photos
      const previews = files.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      // Resolve all promises and update previewThumbnails state
      Promise.all(previews).then((results) => setPreviewThumbnails(results));
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("address", input.address);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("category", input.category);
    formData.append("cordinate", input.cordinate);
    formData.append("mainImage", input.mainImage);

    // Attach images as files
    input.photos.forEach((photo) => {
      formData.append("images", photo);
    });

   if(id){
 await editProperty({formData, id});
   }else{
    await listingProperty({ formData });
   }
  };

  const mainImageHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, mainImage: file });

      const fileReader = new FileReader();
      fileReader.onloadend = () => setMainImg(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <h1 className="ml-3 md:ml-0 font-bold text-xl mb-4">Add Detail Information Regarding Property</h1>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div className="max-w-60">
            <CardTitle>Basic Property Information</CardTitle>
            <CardDescription>Make changes to your property here. Click save when you're done.</CardDescription>
          </div>
          <div>
            <Button onClick={updateCourseHandler}>List</Button>
          </div>
        </CardHeader>
        <CardContent className="my-2">
          <div className="my-5">
            <div className="my-5">
              <Label htmlFor="title">Title</Label>
              <Input
                className="border-gray-600"
                id="title"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div className="my-5">
              <Label htmlFor="richDescription">Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="my-5 flex max-w-xl space-x-5">
              <div>
                <Label htmlFor="">Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select onValueChange={selectCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="apartment">apartment</SelectItem>
                      <SelectItem value="house">house</SelectItem>
                      <SelectItem value="villa">villa</SelectItem>
                      <SelectItem value="cabin">cabin</SelectItem>
                      <SelectItem value="bungalow">bungalow</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Textarea
                placeholder="Type your property address here."
                name="address"
                value={input.address}
                onChange={changeEventHandler}
              />
            </div>

            <div className="my-5">
              <Label htmlFor="photos">Main Image</Label>
              <Input
                type="file"
                id="photos"
                onChange={mainImageHandler}
                accept="image/*"
                className="w-fit"
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {mainImg && <img src={mainImg} className="w-32 h-32 object-cover border rounded" />}
              </div>
            </div>

            <div className="my-5">
              <Label htmlFor="photos">Photos</Label>
              <Input
                type="file"
                id="photos"
                multiple
                onChange={selectThumbnails}
                accept="image/*"
                className="w-fit"
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {previewThumbnails.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-32 object-cover border rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Listing;